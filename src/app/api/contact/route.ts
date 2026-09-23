import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  INTEREST_LABELS,
  InterestKey,
  isAllowedOrigin,
  isValidEmail,
  stripMarkup,
} from "@/lib/contact";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CSRF_COOKIE = "hg_csrf";
const MAX_BODY_BYTES = 12_000;

type ContactBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  interest?: unknown;
  message?: unknown;
  website?: unknown;
  csrfToken?: unknown;
  startedAt?: unknown;
};

function jsonError(message: string, status: number, extra?: HeadersInit) {
  return NextResponse.json({ ok: false, error: message }, { status, headers: extra });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return jsonError("Unsupported media type.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonError("Payload too large.", 413);
  }

  const ip = clientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
  if (!limited.ok) {
    return jsonError("Too many submissions. Try again later.", 429, {
      "Retry-After": String(limited.retryAfterSec),
    });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }

  const honeypot = stripMarkup(String(body.website || ""));
  if (honeypot) {
    // Silent success for bots
    return NextResponse.json({ ok: true });
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value || "";
  const csrfToken = String(body.csrfToken || "");
  if (!csrfCookie || !csrfToken || csrfCookie !== csrfToken) {
    return jsonError("Security token invalid. Refresh and try again.", 403);
  }

  const startedAt = Number(body.startedAt || 0);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return jsonError("Please wait a moment before submitting.", 400);
  }
  if (Date.now() - startedAt > 1000 * 60 * 60 * 6) {
    return jsonError("Form session expired. Refresh and try again.", 400);
  }

  const name = stripMarkup(String(body.name || ""));
  const email = stripMarkup(String(body.email || "")).toLowerCase();
  const company = stripMarkup(String(body.company || ""));
  const interestValue = stripMarkup(String(body.interest || "")) as InterestKey;
  const message = stripMarkup(String(body.message || ""));

  if (!name || name.length < 2 || name.length > 120) {
    return jsonError("Enter a valid name (2–120 characters).", 400);
  }
  if (!isValidEmail(email)) {
    return jsonError("Enter a valid email address.", 400);
  }
  if (company.length > 160) {
    return jsonError("Company name is too long.", 400);
  }
  if (!interestValue || !(interestValue in INTEREST_LABELS)) {
    return jsonError("Select a valid interest.", 400);
  }
  if (message.length > 4000) {
    return jsonError("Message exceeds the 4,000 character limit.", 400);
  }

  const interestLabel = INTEREST_LABELS[interestValue];
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "bsivanandame@hayagreevaenergy.com";
  const endpoint =
    process.env.FORMSUBMIT_ENDPOINT ||
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`;

  const payload = {
    name,
    email,
    company: company || "—",
    interest: interestLabel,
    message: message || "—",
    _subject: `Hayagreeva inquiry — ${interestLabel}`,
    _template: "table",
    _replyto: email,
    _honey: "",
    _blacklist: "spam,viagra,crypto",
  };

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = (await upstream.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };

    if (
      !upstream.ok ||
      result.success === "false" ||
      result.success === false
    ) {
      return jsonError("Delivery failed. Please try again shortly.", 502);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return jsonError("Delivery unavailable. Please try again shortly.", 502);
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405 });
}
