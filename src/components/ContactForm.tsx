"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const RATE_LIMIT_KEY = "hg_form_submissions";
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MIN_FORM_DELAY_MS = 3000;
const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/bsivanandame@hayagreevaenergy.com";

const INTEREST_LABELS: Record<string, string> = {
  engineer: "Talk to a Thermal Engineer",
  evaluation: "Request Cold Plate Evaluation",
  pilot: "Pilot evaluation — AI GPU cold plate",
  technical: "Technical information / fact sheet",
  oem: "OEM / co-development partnership",
  caas: "Cooling as a Service",
  career: "Career inquiry",
  media: "Media / press",
};

const INTENT_MAP: Record<string, string> = {
  engineer: "engineer",
  evaluation: "evaluation",
  technical: "technical",
  caas: "caas",
  career: "career",
  oem: "oem",
};

function stripMarkup(value: string) {
  return String(value || "")
    .replace(/[<>`]/g, "")
    .replace(/javascript:/gi, "")
    .trim();
}

function isRateLimited() {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const entries: number[] = raw ? JSON.parse(raw) : [];
    const recent = entries.filter((ts) => Date.now() - ts < RATE_LIMIT_WINDOW_MS);
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
    return recent.length >= RATE_LIMIT_MAX;
  } catch {
    return false;
  }
}

function recordSubmission() {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const entries: number[] = raw ? JSON.parse(raw) : [];
    entries.push(Date.now());
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(entries));
  } catch {
    /* storage unavailable */
  }
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const startedAt = useRef(Date.now());
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(
    null
  );
  const [busy, setBusy] = useState(false);
  const intent = searchParams.get("intent") || "";
  const defaultInterest = INTENT_MAP[intent] || "engineer";

  useEffect(() => {
    let token = "";
    try {
      token = crypto.randomUUID();
      sessionStorage.setItem("hg_csrf", token);
    } catch {
      token = String(Date.now());
    }
    setCsrfToken(token);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const honeypot = String(data.get("website") || "");
    if (honeypot.trim()) {
      setStatus({ message: "Submission blocked.", error: true });
      return;
    }

    if (Date.now() - startedAt.current < MIN_FORM_DELAY_MS) {
      setStatus({
        message: "Please wait a moment before submitting.",
        error: true,
      });
      return;
    }

    if (isRateLimited()) {
      setStatus({
        message: "Too many submissions. Try again later.",
        error: true,
      });
      return;
    }

    const name = stripMarkup(String(data.get("name") || ""));
    const email = stripMarkup(String(data.get("email") || ""));
    const company = stripMarkup(String(data.get("company") || ""));
    const interestValue = stripMarkup(String(data.get("interest") || ""));
    const message = stripMarkup(String(data.get("message") || ""));
    const token = String(data.get("csrf_token") || "");
    const interestLabel = INTEREST_LABELS[interestValue] || interestValue;

    if (!name || name.length < 2 || name.length > 120) {
      setStatus({
        message: "Enter a valid name (2–120 characters).",
        error: true,
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || email.length > 254) {
      setStatus({ message: "Enter a valid email address.", error: true });
      return;
    }

    if (company.length > 160) {
      setStatus({ message: "Company name is too long.", error: true });
      return;
    }

    if (!interestValue || !INTEREST_LABELS[interestValue]) {
      setStatus({ message: "Select a valid interest.", error: true });
      return;
    }

    if (message.length > 4000) {
      setStatus({
        message: "Message exceeds the 4,000 character limit.",
        error: true,
      });
      return;
    }

    let storedToken = "";
    try {
      storedToken = sessionStorage.getItem("hg_csrf") || "";
    } catch {
      storedToken = "";
    }

    if (!token || token !== storedToken) {
      setStatus({
        message: "Security token expired. Refresh and try again.",
        error: true,
      });
      return;
    }

    setBusy(true);
    setStatus({ message: "Sending your inquiry…", error: false });

    const payload = {
      name,
      email,
      company: company || "—",
      interest: interestLabel,
      message: message || "—",
      _subject: `Hayagreeva inquiry — ${interestLabel}`,
      _template: "table",
      _replyto: email,
      _honey: honeypot,
      _blacklist: "spam,viagra,crypto",
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (
        !response.ok ||
        result.success === "false" ||
        result.success === false
      ) {
        throw new Error(result.message || "Delivery failed");
      }

      recordSubmission();
      setStatus({
        message: "Thank you. Your inquiry was sent to Hayagreeva Energy.",
        error: false,
      });
      form.reset();
    } catch {
      setStatus({
        message:
          "We could not send your inquiry right now. Email bsivanandame@hayagreevaenergy.com directly, or try again shortly.",
        error: true,
      });
    } finally {
      window.setTimeout(() => setBusy(false), 4000);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} autoComplete="on" noValidate>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="form-row">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
          spellCheck={false}
          inputMode="text"
        />
      </div>
      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          inputMode="email"
        />
      </div>
      <div className="form-row">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={160}
        />
      </div>
      <div className="form-row">
        <label htmlFor="interest">Interest</label>
        <select
          id="interest"
          name="interest"
          required
          defaultValue={defaultInterest}
          key={defaultInterest}
        >
          <option value="engineer">Talk to a Thermal Engineer</option>
          <option value="evaluation">Request Cold Plate Evaluation</option>
          <option value="pilot">Pilot evaluation — AI GPU cold plate</option>
          <option value="technical">Technical information / fact sheet</option>
          <option value="oem">OEM / co-development partnership</option>
          <option value="caas">Cooling as a Service</option>
          <option value="career">Career inquiry</option>
          <option value="media">Media / press</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={4000}
          placeholder="Describe your platform, facility constraints, or question."
        />
      </div>
      <button
        className="btn btn-primary btn-lg"
        type="submit"
        disabled={busy}
        aria-busy={busy}
      >
        Submit inquiry
      </button>
      <p className="form-privacy muted">
        Protected with honeypot, timing checks, rate limiting, input
        sanitization, and encrypted delivery to Hayagreeva Energy. Do not
        include passwords or confidential credentials in this form.
      </p>
      {status && (
        <p
          className={`form-status${status.error ? " form-status--error" : ""}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      )}
    </form>
  );
}
