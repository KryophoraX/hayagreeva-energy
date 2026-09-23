import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Advanced Cooling R&D",
  description:
    "Hayagreeva advanced cooling R&D for rising AI heat flux and thermal density.",
};

export default function AdvancedRdPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Advanced Cooling R&D"
          title="Architectures for the next wave of AI heat"
          lead="Research programs explore thermal density beyond today's cold-plate envelope — including pathways toward deeper silicon-level cooling."
          image="/assets/stock/tech-chip.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <p className="section-lead">
              Roadmap areas include higher heat-flux cold plates, tighter
              package co-design, and future direct-to-die / embedded approaches
              as platform requirements demand them.
            </p>
            <div className="card-grid card-grid--3" style={{ marginTop: "2rem" }}>
              {[
                "Higher heat-flux cold plates",
                "Package co-design with silicon partners",
                "Pathways to direct-to-die cooling",
              ].map((t) => (
                <article className="card" key={t}>
                  <h3>{t}</h3>
                  <p>
                    Exploratory and partner-driven programs aligned to real
                    accelerator roadmaps — not speculative marketing claims.
                  </p>
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
