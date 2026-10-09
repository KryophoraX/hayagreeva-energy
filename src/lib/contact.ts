export const INTEREST_LABELS = {
  engineer: "Talk to a Thermal Engineer",
  evaluation: "Request Service Evaluation",
  pilot: "Pilot engagement — Cooling as a Service",
  technical: "Technical information / fact sheet",
  oem: "OEM / co-development partnership",
  caas: "Cooling as a Service",
  career: "Career inquiry",
  media: "Media / press",
} as const;

export type InterestKey = keyof typeof INTEREST_LABELS;

export function stripMarkup(value: string) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[<>`]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/data:/gi, "")
    .trim();
}

export function isValidEmail(email: string) {
  if (email.length < 5 || email.length > 254) return false;
  // Practical RFC-inspired check; reject consecutive dots and leading/trailing dots
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !/\.\./.test(email);
}

export function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (!host) return false;
  if (fetchSite && !["same-origin", "none"].includes(fetchSite)) return false;

  const allowedHosts = new Set([
    host.toLowerCase(),
    "hyperkool.ai",
    "www.hyperkool.ai",
    "hayagreevaenergy.com",
    "www.hayagreevaenergy.com",
  ]);

  const configuredHost = process.env.SITE_HOST;
  if (configuredHost) {
    try {
      allowedHosts.add(
        (configuredHost.includes("://")
          ? new URL(configuredHost).host
          : configuredHost
        ).toLowerCase()
      );
    } catch {
      return false;
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowedHosts.add("127.0.0.1:3000");
    allowedHosts.add("localhost:3000");
  }

  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      const url = new URL(value);
      const validProtocol =
        url.protocol === "https:" ||
        (process.env.NODE_ENV !== "production" && url.protocol === "http:");
      return validProtocol && allowedHosts.has(url.host.toLowerCase());
    } catch {
      return false;
    }
  };

  if (origin) return matchesHost(origin);
  if (referer) return matchesHost(referer);
  return false;
}
