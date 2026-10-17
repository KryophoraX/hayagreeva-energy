import { timingSafeEqual } from "node:crypto";
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
const MAX_PDF_BYTES = 8 * 1024 * 1024;
const MAX_BODY_BYTES = MAX_PDF_BYTES + 256 * 1024;

function jsonError(
  message: string,
  status: number,
  extra?: Record<string, string>
) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status,
      headers: { "Cache-Control": "no-store", ...extra },
    }
  );
}

function tokensMatch(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

async function readBoundedBody(request: Request) {
  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("PAYLOAD_TOO_LARGE");
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return body;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonError("Invalid request origin.", 403);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
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

  let body: FormData;
  try {
    const rawBody = await readBoundedBody(request);
    const parseRequest = new Request(request.url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body: rawBody,
    });
    body = await parseRequest.formData();
  } catch (error) {
    if (error instanceof Error && error.message === "PAYLOAD_TOO_LARGE") {
      return jsonError("Payload too large.", 413);
    }
    return jsonError("Invalid form body.", 400);
  }

  const field = (name: string) => {
    const value = body.get(name);
    return typeof value === "string" ? value : "";
  };

  const honeypot = stripMarkup(field("website"));
  if (honeypot) {
    // Silent success for bots
    return NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get(CSRF_COOKIE)?.value || "";
  const csrfToken = field("csrfToken");
  if (!csrfCookie || !csrfToken || !tokensMatch(csrfCookie, csrfToken)) {
    return jsonError("Security token invalid. Refresh and try again.", 403);
  }

  const startedAt = Number(field("startedAt") || 0);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 2500) {
    return jsonError("Please wait a moment before submitting.", 400);
  }
  if (Date.now() - startedAt > 1000 * 60 * 60 * 6) {
    return jsonError("Form session expired. Refresh and try again.", 400);
  }

  const name = stripMarkup(field("name"));
  const email = stripMarkup(field("email")).toLowerCase();
  const company = stripMarkup(field("company"));
  const interestValue = stripMarkup(field("interest")) as InterestKey;
  const message = stripMarkup(field("message"));
  const drawingValue = body.get("drawing");
  const drawing =
    drawingValue instanceof File && drawingValue.size > 0 ? drawingValue : null;

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
  if (drawing) {
    const validName = drawing.name.toLowerCase().endsWith(".pdf");
    const validType = drawing.type === "application/pdf";
    if (!validName || !validType) {
      return jsonError("Drawing attachment must be a PDF file.", 400);
    }
    if (drawing.size > MAX_PDF_BYTES) {
      return jsonError("PDF drawing exceeds the 8 MB limit.", 413);
    }
    const signature = new TextDecoder().decode(
      await drawing.slice(0, 5).arrayBuffer()
    );
    if (signature !== "%PDF-") {
      return jsonError("Drawing attachment is not a valid PDF.", 400);
    }
  }

  const interestLabel = INTEREST_LABELS[interestValue];
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "bsivanandame@hayagreevaenergy.com";
  const endpoint =
    process.env.FORMSUBMIT_ENDPOINT ||
    `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`;

  const payload = new FormData();
  payload.set("name", name);
  payload.set("email", email);
  payload.set("company", company || "—");
  payload.set("interest", interestLabel);
  payload.set("message", message || "—");
  payload.set("_subject", `Hayagreeva inquiry — ${interestLabel}`);
  payload.set("_template", "table");
  payload.set("_replyto", email);
  payload.set("_honey", "");
  payload.set("_blacklist", "spam,viagra,crypto");
  if (drawing) {
    const safeName = drawing.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    payload.set("attachment", drawing, safeName);
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
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

    const response = NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } }
    );
    response.cookies.set(CSRF_COOKIE, "", {
      httpOnly: true,
      sameSite: "strict",
      secure: new URL(request.url).protocol === "https:",
      path: "/",
      maxAge: 0,
    });
    return response;
  } catch {
    return jsonError("Delivery unavailable. Please try again shortly.", 502);
  }
}

export async function GET(request: Request) {
  const csrfToken = crypto.randomUUID();
  const response = NextResponse.json(
    { ok: true, csrfToken },
    { headers: { "Cache-Control": "no-store" } }
  );
  response.cookies.set(CSRF_COOKIE, csrfToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: new URL(request.url).protocol === "https:",
    path: "/",
    maxAge: 30 * 60,
  });
  return response;
}
