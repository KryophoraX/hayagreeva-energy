import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Thermal Architecture",
  description:
    "Hayagreeva thermal architecture — silicon-to-coolant paths optimized for AI heat-flux profiles.",
};

export default function ThermalArchitecturePage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Thermal Architecture"
          title="Optimized coolant paths for demanding heat-flux profiles"
          lead="Architecture decisions balance package interface, channel geometry, pressure drop and rack-level pumping reality."
          image="/assets/stock/hero-cooling-loop.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {[
                {
                  title: "Silicon interface",
                  body: "Heat removal concentrated at the package where AI accelerators generate peak flux.",
                },
                {
                  title: "Fluid path",
                  body: "Channel and manifold geometry tuned for uniform temperature and controlled hydraulics.",
                },
                {
                  title: "System constraints",
                  body: "Designs respect CDU capability, rack plumbing and facility rejection limits.",
                },
              ].map((c) => (
                <article className="card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
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
