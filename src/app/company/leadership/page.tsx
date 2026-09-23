import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Hayagreeva Energy leadership team.",
};

const LEADERS = [
  {
    name: "Leadership name",
    role: "Chief Executive Officer",
    body: "Leads company strategy, partner relationships and public technical positioning.",
    image: "/assets/stock/team-ceo.jpg",
  },
  {
    name: "Engineering lead",
    role: "Chief Technology Officer",
    body: "Oversees thermal design, validation methodology and engineering contact for pilots.",
    image: "/assets/stock/team-cto.jpg",
  },
  {
    name: "Operations lead",
    role: "Head of Manufacturing",
    body: "Directs production processes, quality systems and scale-up programs.",
    image: "/assets/stock/team-ops.jpg",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Leadership"
          title="Who builds and stands behind the technology"
          lead="Leadership and advisors who can speak credibly about thermal engineering and AI infrastructure."
          image="/assets/stock/career-engineering.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {LEADERS.map((person) => (
                <article className="card" key={person.role}>
                  <Image
                    src={person.image}
                    alt={person.role}
                    width={64}
                    height={64}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      marginBottom: "1rem",
                      border: "1px solid var(--hg-border)",
                    }}
                  />
                  <h3>{person.name}</h3>
                  <p style={{ color: "var(--hg-accent)", marginBottom: "0.75rem" }}>
                    {person.role}
                  </p>
                  <p>{person.body}</p>
                </article>
              ))}
            </div>
            <p className="chart-note">
              Stock portraits shown for layout only — replace with approved
              leadership photos before external publication.
            </p>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
