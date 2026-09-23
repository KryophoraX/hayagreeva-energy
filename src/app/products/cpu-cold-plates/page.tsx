import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "CPU Cold Plates",
  description: "Hayagreeva CPU cold plates for AI and HPC server platforms.",
};

export default function CpuColdPlatesPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="CPU Cold Plates"
          title="CPU cooling integrated into AI server architecture"
          lead="Package-specific CPU cold plates designed alongside accelerator cooling for balanced server-level thermal loops."
          image="/assets/stock/tech-chip.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <p className="section-lead">
              CPU programs are co-engineered with GPU loops so pressure drop,
              flow split and mounting constraints remain consistent at the
              server level.
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
