import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cooling as a Service",
  description:
    "Hayagreeva Cooling-as-a-Service — design, equipment, installation, monitoring and lifecycle support without traditional CapEx barriers.",
};

export default function CaasPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Cooling as a Service"
          title="Cooling infrastructure without the traditional CapEx barrier"
          lead="Cooling capacity delivered as a scalable service aligned with your AI infrastructure deployment."
          image="/assets/stock/hero-servers.jpg"
        />
        <section className="section section-elevated">
          <div className="container split">
            <div>
              <h2 className="section-title">Deployment model</h2>
              <div className="caas-flow" aria-label="CaaS flow">
                <span className="caas-node">Customer AI Compute</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node caas-node--accent">
                  Hayagreeva Cold Plates
                </span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Manifold / CDU</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Monitoring</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Cooling Infrastructure</span>
              </div>
              <h2 className="section-title" style={{ marginTop: "2.5rem" }}>
                What Hayagreeva provides
              </h2>
              <ul className="checklist">
                <li>Design</li>
                <li>Equipment</li>
                <li>Installation</li>
                <li>Monitoring</li>
                <li>Maintenance</li>
                <li>Lifecycle support</li>
              </ul>
              <Link className="text-link" href="/contact?intent=caas">
                Partner on CaaS →
              </Link>
            </div>
            <div>
              <div className="media-frame">
                <Image
                  src="/assets/stock/app-datacenter.jpg"
                  alt="Data center infrastructure"
                  width={700}
                  height={520}
                />
              </div>
              <p className="section-lead" style={{ marginTop: "1.5rem" }}>
                CaaS is a differentiator versus conventional component vendors —
                aligning cooling delivery with how AI capacity is actually rolled
                out.
              </p>
            </div>
          </div>
        </section>
        <section className="section section-graphite">
          <div className="container">
            <h2 className="section-title">Operations &amp; partners</h2>
            <div className="card-grid card-grid--3">
              {[
                {
                  title: "CaaS overview",
                  body: "Service-aligned cooling capacity for AI deployments.",
                },
                {
                  title: "Operations",
                  body: "Monitoring, maintenance and lifecycle support models.",
                },
                {
                  title: "Partner with us",
                  body: "Operators, OEMs and neo-cloud providers exploring service-based cooling.",
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
