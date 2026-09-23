import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Hayagreeva design engineering, CFD, prototyping, validation and manufacturing for AI liquid cooling.",
};

const STEPS = [
  {
    id: "design",
    num: "01",
    title: "Design Engineering",
    items: ["Requirements capture", "Channel architecture", "Materials", "Fittings & mounting"],
  },
  {
    id: "simulation",
    num: "02",
    title: "CFD & Simulation",
    items: ["CFD", "Thermal modeling", "Flow optimization", "Mechanical analysis"],
  },
  {
    id: "prototyping",
    num: "03",
    title: "Prototyping",
    items: ["Rapid manufacturing", "Inspection", "Assembly"],
  },
  {
    id: "validation",
    num: "04",
    title: "Testing & Validation",
    items: ["TTV testing", "Thermal resistance", "Pressure drop", "Leak testing"],
  },
  {
    id: "manufacturing",
    num: "05",
    title: "Manufacturing",
    items: ["DFM", "Quality control", "Production qualification", "OEM integration"],
  },
];

export default function EngineeringPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Engineering"
          title="From silicon requirements to production-ready cooling"
          lead="Engineering depth is a commercial differentiator — design, simulation, prototype, validate and manufacture as one continuum."
          image="/assets/stock/career-engineering.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="process">
              {STEPS.map((step) => (
                <div className="process-step" key={step.id} id={step.id}>
                  <div className="process-step__num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <ul>
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/technology/testing-validation">
              See validation approach →
            </Link>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
