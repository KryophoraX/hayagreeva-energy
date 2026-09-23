import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

type SolutionShellProps = {
  kicker: string;
  title: string;
  lead: string;
  body: string[];
  image?: string;
};

export function SolutionShell({
  kicker,
  title,
  lead,
  body,
  image = "/assets/stock/app-datacenter.jpg",
}: SolutionShellProps) {
  return (
    <>
      <main className="page-main">
        <PageHero kicker={kicker} title={title} lead={lead} image={image} />
        <section className="section section-elevated">
          <div className="container">
            {body.map((p) => (
              <p className="section-lead" key={p} style={{ marginBottom: "1rem" }}>
                {p}
              </p>
            ))}
            <Link className="text-link" href="/contact?intent=caas">
              Engage Cooling as a Service →
            </Link>
          </div>
        </section>
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
