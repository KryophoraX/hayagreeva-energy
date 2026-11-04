"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const MIN_FORM_DELAY_MS = 3000;
const MAX_PDF_BYTES = 8 * 1024 * 1024;

const INTEREST_LABELS: Record<string, string> = {
  engineer: "Talk to a Cooling Expert",
  "form-factor": "Upload a Drawing",
  evaluation: "Request a Quote",
  pilot: "Start a Cooling Project",
  technical: "Get Technical Information",
  oem: "Partner With Us",
  caas: "GPU Cooling Service",
  career: "Jobs",
  media: "Press / Media",
};

const INTENT_MAP: Record<string, string> = {
  engineer: "engineer",
  "form-factor": "form-factor",
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
  const [drawingName, setDrawingName] = useState("");
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
    const drawingValue = data.get("drawing");
    const drawing =
      drawingValue instanceof File && drawingValue.size > 0 ? drawingValue : null;

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

    if (drawing) {
      if (
        drawing.type !== "application/pdf" ||
        !drawing.name.toLowerCase().endsWith(".pdf")
      ) {
        setStatus({ message: "Drawing attachment must be a PDF file.", error: true });
        return;
      }
      if (drawing.size > MAX_PDF_BYTES) {
        setStatus({ message: "PDF drawing exceeds the 8 MB limit.", error: true });
        return;
      }
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

    const payload = new FormData();
    payload.set("name", name);
    payload.set("email", email);
    payload.set("company", company || "—");
    payload.set("interest", interestValue);
    payload.set("message", message || "—");
    payload.set("website", honeypot);
    payload.set("csrfToken", token);
    payload.set("startedAt", String(startedAt.current));
    if (drawing) payload.set("drawing", drawing, drawing.name);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" },
        body: payload,
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Delivery failed");
      }

      setStatus({
        message: "Thanks. We received your request.",
        error: false,
      });
      setCsrfToken("");
      setDrawingName("");
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
    <form
      className="contact-form"
      onSubmit={onSubmit}
      autoComplete="on"
      encType="multipart/form-data"
      noValidate
    >
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
          <option value="engineer">Talk to a Cooling Expert</option>
          <option value="form-factor">Upload a Drawing</option>
          <option value="evaluation">Request a Quote</option>
          <option value="pilot">Start a Cooling Project</option>
          <option value="technical">Get Technical Information</option>
          <option value="oem">Partner With Us</option>
          <option value="caas">GPU Cooling Service</option>
          <option value="career">Jobs</option>
          <option value="media">Press / Media</option>
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={4000}
          placeholder={
            defaultInterest === "form-factor"
              ? "Tell us what the part needs to fit and how much heat it must cool."
              : "Tell us what you need help with."
          }
        />
      </div>
      <details
        className="form-drawing"
        open={defaultInterest === "form-factor"}
      >
        <summary>
          <span>Upload a PDF drawing</span>
          <small>Optional · Up to 8 MB</small>
        </summary>
        <label className="form-drawing__dropzone">
          <input
            name="drawing"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(event) =>
              setDrawingName(event.currentTarget.files?.[0]?.name || "")
            }
          />
          <strong>{drawingName || "Drop your PDF here or choose a file"}</strong>
          <span>
            {drawingName
              ? "File ready — choose again to replace it"
              : "Add a drawing that shows the size and shape"}
          </span>
        </label>
      </details>
      <button
        className="btn btn-primary btn-lg"
        type="submit"
        disabled={busy || !csrfToken}
        aria-busy={busy}
      >
        Send Request
      </button>
      <p className="form-privacy muted">
        Your information is sent securely. Do not include passwords or other
        private login details.
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
