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
    href: "/products",
    label: "Products",
    children: [
      { href: "/products/ai-gpu-cold-plates", label: "AI GPU Cold Plates" },
      { href: "/products/cpu-cold-plates", label: "CPU Cold Plates" },
      { href: "/products/cold-plate-loops", label: "Cold Plate Loops" },
      { href: "/products/rack-manifolds", label: "Rack Manifolds" },
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
    label: "Cooling as a Service",
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
  href: "/contact?intent=evaluation",
  label: "Request Cold Plate Evaluation",
} as const;
