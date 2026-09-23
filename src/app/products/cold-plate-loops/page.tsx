import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cold Plate Loops",
  description:
    "Custom Hayagreeva cold plate loops for GPU, CPU, memory and power components.",
};

export default function ColdPlateLoopsPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Cold Plate Loops"
          title="Server-level loops optimized as one thermal system"
          lead="GPU, CPU, memory and power-component cooling integrated into optimized server-level loops."
          image="/assets/stock/hero-cooling-loop.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {[
                "Flow balancing across components",
                "Connector and manifold interfaces",
                "OEM mechanical integration",
              ].map((t) => (
                <article className="card" key={t}>
                  <h3>{t}</h3>
                  <p>
                    Loop design treats the server as a single hydraulic and
                    thermal problem — not isolated cold plates.
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
