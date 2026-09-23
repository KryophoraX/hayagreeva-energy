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

  if (!host) return false;

  const allowedHosts = new Set(
    [
      host,
      process.env.NEXT_PUBLIC_SITE_HOST,
      "hayagreeva-energy.vercel.app",
      "hayagreevaenergy.com",
      "www.hayagreevaenergy.com",
      "127.0.0.1:3000",
      "127.0.0.1:3001",
      "localhost:3000",
      "localhost:3001",
    ].filter(Boolean) as string[]
  );

  const matchesHost = (value: string | null) => {
    if (!value) return false;
    try {
      const url = new URL(value);
      return allowedHosts.has(url.host);
    } catch {
      return false;
    }
  };

  // Browsers send Origin on cross-origin and often on same-origin POST via fetch
  if (origin) return matchesHost(origin);
  if (referer) return matchesHost(referer);

  // Same-origin fetch without Origin in some environments — require at least Host
  return true;
}
