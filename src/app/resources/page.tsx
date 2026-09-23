import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Hayagreeva technical papers, application notes, case studies and AI thermal insights.",
};

const SECTIONS = [
  {
    id: "papers",
    title: "Technical Papers",
    items: [
      "Thermal-performance reports",
      "Cold-plate design papers",
      "TTV validation results",
    ],
  },
  {
    id: "notes",
    title: "Application Notes",
    items: ["GB200 cooling", "GB300 cooling", "B300 cooling"],
  },
  {
    id: "cases",
    title: "Case Studies",
    items: [
      "OEM collaboration",
      "Neo-cloud deployment",
      "AI data-center deployment",
    ],
  },
  {
    id: "insights",
    title: "Insights",
    items: [
      "AI thermal roadmap",
      "DLC vs immersion",
      "Cold plates & CDUs",
      "AI rack density",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Resources"
          title="Evidence and guidance for thermal buyers"
          lead="Technical authority grows as papers, notes and case studies publish — including future pieces such as cooling 10 kW AI accelerators."
          image="/assets/stock/manufacturing-lab.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--2">
              {SECTIONS.map((section) => (
                <article className="card" key={section.id} id={section.id}>
                  <h3>{section.title}</h3>
                  <ul className="checklist">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link className="text-link" href="/contact?intent=technical">
                    Request materials →
                  </Link>
                </article>
              ))}
            </div>
            <p className="section-lead" style={{ marginTop: "2.5rem" }}>
              Featured insight in development:{" "}
              <strong style={{ color: "var(--hg-text)" }}>
                Cooling 10 kW AI Accelerators: Where Cold Plate Technology Goes
                Next
              </strong>
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
