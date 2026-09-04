(() => {
  "use strict";

  const RATE_LIMIT_KEY = "hg_form_submissions";
  const RATE_LIMIT_MAX = 3;
  const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
  const MIN_FORM_DELAY_MS = 3000;
  const FORM_ENDPOINT =
    "https://formsubmit.co/ajax/bsivanandame@hayagreevaenergy.com";

  const INTEREST_LABELS = {
    pilot: "Pilot evaluation — Hayagreeva HEx",
    technical: "Technical information / fact sheet",
    oem: "OEM / manufacturing partnership",
    career: "Career inquiry",
    media: "Media / press",
  };

  document.addEventListener("securitypolicyviolation", (event) => {
    console.warn("[CSP violation]", event.violatedDirective, event.blockedURI);
  });

  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.rel.includes("noopener")) {
      link.rel = "noopener noreferrer";
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function stripMarkup(value) {
    return String(value || "")
      .replace(/[<>`]/g, "")
      .replace(/javascript:/gi, "")
      .trim();
  }

  function isRateLimited() {
    try {
      const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
      const entries = raw ? JSON.parse(raw) : [];
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
      const entries = raw ? JSON.parse(raw) : [];
      entries.push(Date.now());
      sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(entries));
    } catch {
      /* storage unavailable */
    }
  }

  function showFormStatus(form, message, isError) {
    let status = form.querySelector(".form-status");
    if (!status) {
      status = document.createElement("p");
      status.className = "form-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.appendChild(status);
    }
    status.textContent = message;
    status.classList.toggle("form-status--error", Boolean(isError));
  }

  const form = document.querySelector(".contact-form");
  if (!form) return;

  const startedAt = Date.now();
  form.setAttribute("autocomplete", "on");
  form.setAttribute("novalidate", "novalidate");

  let csrfToken = "";
  try {
    csrfToken = crypto.randomUUID();
    sessionStorage.setItem("hg_csrf", csrfToken);
  } catch {
    csrfToken = String(Date.now());
  }

  let csrfField = form.querySelector('input[name="csrf_token"]');
  if (!csrfField) {
    csrfField = document.createElement("input");
    csrfField.type = "hidden";
    csrfField.name = "csrf_token";
    form.appendChild(csrfField);
  }
  csrfField.value = csrfToken;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const honeypot = form.querySelector('input[name="website"]');
    if (honeypot && honeypot.value.trim()) {
      showFormStatus(form, "Submission blocked.", true);
      return;
    }

    if (Date.now() - startedAt < MIN_FORM_DELAY_MS) {
      showFormStatus(form, "Please wait a moment before submitting.", true);
      return;
    }

    if (isRateLimited()) {
      showFormStatus(form, "Too many submissions. Try again later.", true);
      return;
    }

    const name = stripMarkup(form.querySelector("#name")?.value);
    const email = stripMarkup(form.querySelector("#email")?.value);
    const company = stripMarkup(form.querySelector("#company")?.value);
    const interestValue = stripMarkup(form.querySelector("#interest")?.value);
    const message = stripMarkup(form.querySelector("#message")?.value);
    const token = form.querySelector('input[name="csrf_token"]')?.value || "";
    const interestLabel = INTEREST_LABELS[interestValue] || interestValue;

    if (!name || name.length < 2 || name.length > 120) {
      showFormStatus(form, "Enter a valid name (2–120 characters).", true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || email.length > 254) {
      showFormStatus(form, "Enter a valid email address.", true);
      return;
    }

    if (company.length > 160) {
      showFormStatus(form, "Company name is too long.", true);
      return;
    }

    if (!interestValue || !INTEREST_LABELS[interestValue]) {
      showFormStatus(form, "Select a valid interest.", true);
      return;
    }

    if (message.length > 4000) {
      showFormStatus(form, "Message exceeds the 4,000 character limit.", true);
      return;
    }

    let storedToken = "";
    try {
      storedToken = sessionStorage.getItem("hg_csrf") || "";
    } catch {
      storedToken = "";
    }

    if (!token || token !== storedToken) {
      showFormStatus(form, "Security token expired. Refresh and try again.", true);
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
    }

    showFormStatus(form, "Sending your inquiry…", false);

    const payload = {
      name,
      email,
      company: company || "—",
      interest: interestLabel,
      message: message || "—",
      _subject: `Hayagreeva inquiry — ${interestLabel}`,
      _template: "table",
      _replyto: email,
      _honey: honeypot ? honeypot.value : "",
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

      if (!response.ok || result.success === "false" || result.success === false) {
        throw new Error(result.message || "Delivery failed");
      }

      recordSubmission();
      showFormStatus(
        form,
        "Thank you. Your inquiry was sent to Hayagreeva Energy.",
        false
      );
      form.reset();
      csrfField.value = csrfToken;
    } catch {
      showFormStatus(
        form,
        "We could not send your inquiry right now. Email bsivanandame@hayagreevaenergy.com directly, or try again shortly.",
        true
      );
    } finally {
      if (submitBtn) {
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-busy");
        }, 4000);
      }
    }
  });
})();
