import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";
import { PRIMARY_CTA } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Hayagreeva co-development with silicon companies, server OEMs, ODMs and AI infrastructure providers.",
};

export default function PartnersPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Partners"
          title="Let's engineer your next AI platform together"
          lead="NDA → Thermal Requirements → Concept → CFD → Prototype → TTV Validation → Qualification → Production"
          image="/assets/stock/manufacturing-precision.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="codev">
              <div className="codev-partners">
                <span>Silicon Company</span>
                <span>Server OEM</span>
                <span>Hayagreeva</span>
                <span>Optimized Thermal Solution</span>
              </div>
              <div>
                <p className="section-lead">
                  Particularly suited to OEM design-in strategies and processor
                  co-development programs where thermal limits define platform
                  success.
                </p>
                <div className="pipeline">
                  {[
                    "NDA",
                    "Requirements",
                    "Concept",
                    "CFD",
                    "Prototype",
                    "TTV",
                    "Qualify",
                    "Production",
                  ].map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <Link className="text-link" href={PRIMARY_CTA.href}>
                  Start a partnership conversation →
                </Link>
              </div>
            </div>
            <div className="inception" style={{ marginTop: "3rem" }}>
              <h2>NVIDIA Inception</h2>
              <p>
                Hayagreeva participates in the NVIDIA Inception Program subject to
                applicable program and logo usage requirements.
              </p>
            </div>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
