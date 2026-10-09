export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV_LINKS: NavItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/#custom-design",
    label: "Custom Design",
  },
  {
    href: "/cooling-as-a-service",
    label: "GPU Cooling as a Service",
  },
  {
    href: "/technology",
    label: "Technology",
  },
  {
    href: "/company",
    label: "About",
  },
  { href: "/contact", label: "Contact" },
];

export const PRIMARY_CTA = {
  href: "/contact?intent=evaluation",
  label: "Request a Demo →",
} as const;

export const SECONDARY_CTA = {
  href: "/contact?intent=caas",
  label: "Engage Cooling as a Service",
} as const;
