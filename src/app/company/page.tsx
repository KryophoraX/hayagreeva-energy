import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Company",
  description:
    "About Hayagreeva Energy — removing the thermal barriers limiting the future of AI computing.",
};

export default function CompanyPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Company"
          title="About Hayagreeva"
          lead="Mission: remove the thermal barriers limiting the future of AI computing — delivered as an engineering service."
          image="/assets/stock/tech-copper.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <p className="section-lead">
              Hayagreeva Energy is an AI thermal-engineering service company. We
              design, validate, deploy and operate direct-to-chip liquid cooling
              for AI infrastructure — through co-engineering and Cooling as a
              Service, not as a catalog manufacturer.
            </p>
            <div className="card-grid card-grid--4" style={{ marginTop: "2.5rem" }}>
              {[
                { href: "/company/leadership", title: "Leadership" },
                { href: "/company/partners", title: "Partners" },
                { href: "/company/careers", title: "Careers" },
                { href: "/resources#insights", title: "News & Insights" },
              ].map((l) => (
                <article className="card" key={l.href}>
                  <h3>{l.title}</h3>
                  <Link className="text-link" href={l.href}>
                    View →
                  </Link>
                </article>
              ))}
            </div>
            <div className="inception" style={{ marginTop: "3rem" }}>
              <h2>NVIDIA Inception</h2>
              <p>
                Part of the NVIDIA Inception Program — subject to NVIDIA&apos;s
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
