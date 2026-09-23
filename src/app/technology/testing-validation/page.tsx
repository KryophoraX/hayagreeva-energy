import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Testing & Validation",
  description:
    "Hayagreeva TTV testing, thermal resistance, pressure drop and leak validation.",
};

const CHARTS = [
  "Thermal Resistance vs Flow Rate",
  "Pressure Drop vs Flow Rate",
  "GPU Temperature vs Heat Load",
  "Coolant Inlet Temperature vs Junction Temperature",
];

export default function TestingValidationPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Testing & Validation"
          title="Performance you can measure"
          lead="Validation separates rated metrics from design targets. Charts and datasheets publish as TTV programs complete under controlled conditions."
          image="/assets/stock/manufacturing-lab.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="chart-grid">
              {CHARTS.map((title, i) => (
                <article className="chart-card" key={title}>
                  <h3>{title}</h3>
                  <div className="chart-placeholder" aria-hidden="true">
                    {[35, 50, 68, 45, 80, 58, 72].map((h, idx) => (
                      <span key={idx} style={{ height: `${(h + i * 4) % 88}%` }} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="chart-note">
              Tested using a calibrated Thermal Test Vehicle (TTV) under controlled
              coolant flow and inlet-temperature conditions.
            </p>
            <Link className="text-link" href="/contact?intent=technical">
              Request Technical Data →
            </Link>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
