import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Hayagreeva Energy — build the thermal layer for AI infrastructure.",
};

export default function CareersPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Careers"
          title="Build the thermal layer for AI infrastructure"
          lead="We look for people who want to solve hard heat problems with clear evidence and precise work."
          image="/assets/stock/career-engineering.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {[
                {
                  title: "Thermal engineer",
                  body: "Package-level thermal modeling, test design and validation.",
                },
                {
                  title: "Mechanical design engineer",
                  body: "Cold-plate geometry, mounting interfaces and package integration.",
                },
                {
                  title: "Applications engineer",
                  body: "Support operators and OEM partners evaluating Hayagreeva solutions.",
                },
              ].map((role) => (
                <article className="card" key={role.title}>
                  <h3>{role.title}</h3>
                  <p>{role.body}</p>
                </article>
              ))}
            </div>
            <Link className="text-link" href="/contact?intent=career">
              Get in touch →
            </Link>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
