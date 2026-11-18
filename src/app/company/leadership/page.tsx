import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the founders leading Hayagreeva Energy.",
};

const LEADERS = [
  {
    name: "Sridhar Rao Julapally",
    initials: "SRJ",
    role: "CEO & Founder",
    body: "Leads Hayagreeva's company strategy, production readiness, and partner programs for its direct-to-chip cold plate platform.",
  },
  {
    name: "Praveen Kumar Gorakavi",
    initials: "PKG",
    role: "Co-Founder",
    body: "An inventor and chemical engineer who helps lead Hayagreeva's technical vision. His public work spans thermal management, materials science, and commercially deployed technologies.",
  },
  {
    name: "Srini Vangimalla",
    initials: "SV",
    role: "Business Development",
    body: "Builds strategic partnerships, customer relationships, and commercial opportunities across AI infrastructure and liquid cooling.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Leadership"
          title="Meet the people building Hayagreeva"
          lead="The founders guiding our technology, partner programs, and path to production."
          image="/assets/stock/career-engineering.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {LEADERS.map((person) => (
                <article className="card team-card" key={person.name}>
                  <div className="team-card__avatar" aria-hidden="true">
                    {person.initials}
                  </div>
                  <h3>{person.name}</h3>
                  <p className="team-card__role">
                    {person.role}
                  </p>
                  <p>{person.body}</p>
                </article>
              ))}
            </div>
            <p className="chart-note">
              Team information reflects Hayagreeva-provided roles and public
              company materials.
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
