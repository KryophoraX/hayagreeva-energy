import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cold Plate Technology",
  description:
    "Hayagreeva AI cold plate technology — microchannel architecture, flow distribution and hotspot targeting.",
};

export default function ColdPlateTechPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Cold Plate Technology"
          title="Engineered where every degree matters"
          lead="Our cold plates are designed through coupled thermal, fluid and mechanical optimization for next-generation AI accelerators."
          image="/assets/stock/tech-copper.jpg"
        />
        <section className="section section-elevated">
          <div className="container split">
            <div>
              <h2 className="section-title">Architecture callouts</h2>
              <ul className="callout-list">
                <li>Microchannel architecture</li>
                <li>Flow distribution</li>
                <li>Hotspot targeting</li>
                <li>Copper thermal interface</li>
                <li>Precision manufacturing</li>
                <li>Inlet / outlet architecture</li>
                <li>Mounting mechanism</li>
              </ul>
              <div className="metric-row">
                <div>Low Thermal Resistance</div>
                <div>Low Pressure Drop</div>
                <div>Uniform Temperature</div>
                <div>High Heat-Flux Capability</div>
              </div>
            </div>
            <div>
              <p className="section-lead">
                Capability labels above will be replaced with validated TTV
                numbers — thermal load, heat flux, resistance, flow and pressure
                drop — once controlled test programs publish results.
              </p>
              <Link className="text-link" href="/cooling-as-a-service">
                Explore Cooling as a Service →
              </Link>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
