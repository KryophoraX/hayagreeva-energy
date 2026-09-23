import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";
import { PRIMARY_CTA } from "@/lib/nav";

export const metadata: Metadata = {
  title: "AI GPU Cold Plates",
  description:
    "Hayagreeva AI GPU cold plates for NVIDIA GB200, GB300, B300, AMD Instinct and custom ASIC platforms.",
};

const PLATFORMS = [
  { title: "NVIDIA B300", href: "/products/ai-gpu-cold-plates#b300" },
  { title: "NVIDIA GB200", href: "/products/ai-gpu-cold-plates#gb200" },
  { title: "NVIDIA GB300", href: "/products/ai-gpu-cold-plates#gb300" },
  { title: "AMD Instinct", href: "/products/ai-gpu-cold-plates#amd" },
  { title: "Custom ASIC", href: "/products/ai-gpu-cold-plates#asic" },
];

export default function AiGpuColdPlatesPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="AI GPU Cold Plates"
          title="Precision direct-to-chip cooling for AI accelerators"
          lead="Cold plates engineered around processor, mechanical and coolant requirements — ready for evaluation, co-design and OEM integration."
          image="/assets/stock/product-hardware.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <h2 className="section-title">Platform programs</h2>
            <div className="card-grid card-grid--3">
              {PLATFORMS.map((p) => (
                <article className="card" key={p.title} id={p.href.split("#")[1]}>
                  <h3>{p.title}</h3>
                  <p>
                    Package-specific fitting, mounting, connectors and fluid
                    interfaces for {p.title} class platforms.
                  </p>
                  <Link className="text-link" href={PRIMARY_CTA.href}>
                    Request evaluation →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
