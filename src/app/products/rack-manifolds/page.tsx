import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Rack Manifolds",
  description: "Hayagreeva rack manifold roadmap for AI liquid cooling deployments.",
};

export default function RackManifoldsPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Rack Manifolds"
          title="Fluid distribution for high-density AI racks"
          lead="Manifold programs extend Hayagreeva's cold-plate expertise into rack-level distribution as customer deployments scale."
          image="/assets/stock/app-datacenter.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <p className="section-lead">
              This product line is on the roadmap. Engage engineering early if
              your platform requires matched cold plates and rack distribution.
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
