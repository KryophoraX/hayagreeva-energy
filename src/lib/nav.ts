export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const NAV_LINKS: NavItem[] = [
  {
    href: "/technology",
    label: "Technology",
    children: [
      { href: "/technology/cold-plate", label: "Cold Plate Technology" },
      { href: "/technology/thermal-architecture", label: "Thermal Architecture" },
      { href: "/technology/advanced-rd", label: "Advanced Cooling R&D" },
      { href: "/technology/testing-validation", label: "Testing & Validation" },
    ],
  },
  {
    href: "/solutions",
    label: "Solutions",
    children: [
      { href: "/solutions/hyperscale", label: "Hyperscale" },
      { href: "/solutions/neo-cloud", label: "Neo-Cloud" },
      { href: "/solutions/ai-data-centers", label: "AI Data Centers" },
      { href: "/solutions/server-oem", label: "Server OEM / ODM" },
      { href: "/solutions/hpc", label: "HPC" },
      { href: "/solutions/semiconductor", label: "Semiconductor" },
    ],
  },
  {
    href: "/engineering",
    label: "Engineering",
    children: [
      { href: "/engineering#design", label: "Design Engineering" },
      { href: "/engineering#simulation", label: "CFD & Simulation" },
      { href: "/engineering#prototyping", label: "Prototyping" },
      { href: "/engineering#validation", label: "Testing & Validation" },
      { href: "/engineering#manufacturing", label: "Manufacturing" },
    ],
  },
  {
    href: "/cooling-as-a-service",
    label: "CaaS",
  },
  {
    href: "/resources",
    label: "Resources",
  },
  {
    href: "/company",
    label: "Company",
    children: [
      { href: "/company", label: "About" },
      { href: "/company/leadership", label: "Leadership" },
      { href: "/company/partners", label: "Partners" },
      { href: "/company/careers", label: "Careers" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const PRIMARY_CTA = {
  href: "/contact?intent=engineer",
  label: "Talk to a Thermal Engineer",
} as const;

export const SECONDARY_CTA = {
  href: "/contact?intent=caas",
  label: "Engage Cooling as a Service",
} as const;
