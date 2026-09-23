import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Cold plate technology, thermal architecture, advanced cooling R&D, and testing & validation from Hayagreeva Energy.",
};

const LINKS = [
  {
    href: "/technology/cold-plate",
    title: "Cold Plate Technology",
    body: "Direct-to-chip architectures engineered for AI heat flux, hotspot targeting and package-level interfaces.",
  },
  {
    href: "/technology/thermal-architecture",
    title: "Thermal Architecture",
    body: "Coupled thermal, fluid and mechanical design from silicon interface through loop-level constraints.",
  },
  {
    href: "/technology/advanced-rd",
    title: "Advanced Cooling R&D",
    body: "Next-generation approaches for rising AI thermal density — including roadmap toward deeper silicon cooling.",
  },
  {
    href: "/technology/testing-validation",
    title: "Testing & Validation",
    body: "TTV programs, controlled test conditions and measurable thermal / hydraulic performance.",
  },
];

export default function TechnologyPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Technology"
          title="Thermal engineering for extreme AI heat flux"
          lead="Hayagreeva develops direct-to-chip liquid cooling architectures designed to remove heat at the silicon interface while managing thermal resistance, pressure drop and facility integration."
          image="/assets/stock/tech-chip.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--2">
              {LINKS.map((item) => (
                <article className="card" key={item.href}>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className="text-link" href={item.href}>
                    Learn more →
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
