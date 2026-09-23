import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Hayagreeva solutions for hyperscale, neo-cloud, AI data centers, OEM/ODM, HPC and semiconductor partners.",
};

const SOLUTIONS = [
  { href: "/solutions/hyperscale", title: "Hyperscalers", body: "Ultra-high-density AI infrastructure." },
  { href: "/solutions/neo-cloud", title: "Neo-Cloud Providers", body: "Rapid GPU deployment without thermal bottlenecks." },
  { href: "/solutions/ai-data-centers", title: "AI Data Centers", body: "High-density direct liquid cooling." },
  { href: "/solutions/server-oem", title: "Server OEM / ODM", body: "Custom cold plates and loops for server architecture." },
  { href: "/solutions/hpc", title: "HPC", body: "Scientific and technical accelerated computing." },
  { href: "/solutions/semiconductor", title: "Semiconductor", body: "Thermal co-design for next-generation silicon." },
];

export default function SolutionsPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Solutions"
          title="Customer pathways for thermal services"
          lead="Separate engagement paths for hyperscalers, neo-cloud providers, OEMs, data centers, HPC and semiconductor partners."
          image="/assets/stock/app-hpc.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--3">
              {SOLUTIONS.map((s) => (
                <article className="card" key={s.href}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Link className="text-link" href={s.href}>
                    Explore →
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
