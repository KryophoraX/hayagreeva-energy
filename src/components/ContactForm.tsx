"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const MIN_FORM_DELAY_MS = 3000;

const INTEREST_LABELS: Record<string, string> = {
  engineer: "Talk to a Thermal Engineer",
  evaluation: "Request Service Evaluation",
  pilot: "Pilot engagement — Cooling as a Service",
  technical: "Technical information / fact sheet",
  oem: "OEM / co-development partnership",
  caas: "Cooling as a Service",
  career: "Career inquiry",
  media: "Media / press",
};

const INTENT_MAP: Record<string, string> = {
  engineer: "engineer",
  "form-factor": "engineer",
  demo: "evaluation",
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

export default function ContactForm() {
  const searchParams = useSearchParams();
  const startedAt = useRef(0);
  const [csrfToken, setCsrfToken] = useState("");
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(
    null
  );
  const [busy, setBusy] = useState(false);
  const intent = searchParams.get("intent") || "";
  const defaultInterest = INTENT_MAP[intent] || "engineer";

  useEffect(() => {
    const controller = new AbortController();
    startedAt.current = Date.now();

    async function loadCsrfToken() {
      try {
        const response = await fetch("/api/contact", {
          credentials: "same-origin",
          cache: "no-store",
          signal: controller.signal,
        });
        const result = (await response.json()) as {
          ok?: boolean;
          csrfToken?: string;
        };
        if (!response.ok || !result.ok || !result.csrfToken) {
          throw new Error("Token unavailable");
        }
        setCsrfToken(result.csrfToken);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus({
          message: "The secure form could not be initialized. Refresh and try again.",
          error: true,
        });
      }
    }

    loadCsrfToken();
    return () => controller.abort();
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

    const name = stripMarkup(String(data.get("name") || ""));
    const email = stripMarkup(String(data.get("email") || ""));
    const company = stripMarkup(String(data.get("company") || ""));
    const interestValue = stripMarkup(String(data.get("interest") || ""));
    const message = stripMarkup(String(data.get("message") || ""));
    const token = String(data.get("csrf_token") || "");

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

    if (!token || token !== csrfToken) {
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
      interest: interestValue,
      message: message || "—",
      website: honeypot,
      csrfToken: token,
      startedAt: startedAt.current,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Delivery failed");
      }

      setStatus({
        message: "Thank you. Your inquiry was sent to Hayagreeva Energy.",
        error: false,
      });
      setCsrfToken("");
      form.reset();
    } catch (error) {
      setStatus({
        message:
          error instanceof Error && error.message
            ? error.message
            : "We could not send your inquiry right now. Email bsivanandame@hayagreevaenergy.com directly, or try again shortly.",
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
          <option value="evaluation">Request Service Evaluation</option>
          <option value="pilot">Pilot engagement — Cooling as a Service</option>
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
        disabled={busy || !csrfToken}
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
