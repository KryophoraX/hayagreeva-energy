export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/cooling-as-a-service",
    label: "Services",
    children: [{ href: "/#custom-design", label: "Custom Cold Plates" }],
  },
  {
    href: "/technology",
    label: "Technology",
    children: [
      { href: "/technology/cold-plate", label: "Cold Plate Technology" },
      {
        href: "/technology/thermal-architecture",
        label: "Thermal Architecture",
      },
      { href: "/technology/advanced-rd", label: "Advanced R&D" },
      {
        href: "/technology/testing-validation",
        label: "Testing & Validation",
      },
    ],
  },
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      { href: "/solutions/hyperscale", label: "Hyperscale" },
      { href: "/solutions/neo-cloud", label: "Neo Cloud" },
      { href: "/solutions/ai-data-centers", label: "AI Data Centers" },
      { href: "/solutions/server-oem", label: "Server OEM" },
      { href: "/solutions/hpc", label: "HPC" },
      { href: "/solutions/semiconductor", label: "Semiconductor" },
    ],
  },
  {
    href: "/company",
    label: "Company",
    children: [
      { href: "/company/leadership", label: "Leadership" },
      { href: "/company/partners", label: "Partners" },
      { href: "/company/careers", label: "Careers" },
    ],
  },
  {
    href: "/resources",
    label: "Resources",
    children: [{ href: "/engineering", label: "Engineering" }],
  },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_SECTIONS = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/#custom-design", label: "Custom Cold Plates" },
      { href: "/cooling-as-a-service", label: "GPU Cooling Service" },
      { href: "/technology", label: "Technology" },
      { href: "/solutions", label: "Solutions" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/engineering", label: "Engineering" },
      { href: "/resources", label: "Resources" },
      { href: "/company/partners", label: "Partners" },
      { href: "/company/careers", label: "Careers" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/company", label: "About" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
] as const;

export const PRIMARY_CTA = {
  href: "/contact?intent=evaluation",
  label: "Request a Demo →",
} as const;

export const SECONDARY_CTA = {
  href: "/contact?intent=caas",
  label: "Engage Cooling as a Service",
} as const;
