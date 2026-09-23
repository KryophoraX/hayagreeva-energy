import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Hayagreeva AI GPU cold plates, CPU cold plates, cold plate loops and rack manifolds.",
};

const PRODUCTS = [
  {
    href: "/products/ai-gpu-cold-plates",
    title: "AI GPU Cold Plates",
    body: "Direct-to-chip cooling for high-power AI accelerators — NVIDIA, AMD and custom ASIC programs.",
  },
  {
    href: "/products/cpu-cold-plates",
    title: "CPU Cold Plates",
    body: "Package-specific CPU cooling integrated into server thermal architecture.",
  },
  {
    href: "/products/cold-plate-loops",
    title: "Cold Plate Loops",
    body: "GPU, CPU, memory and power-component cooling in optimized server-level loops.",
  },
  {
    href: "/products/rack-manifolds",
    title: "Rack Manifolds",
    body: "Roadmap building blocks for rack fluid distribution as deployments scale.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Products"
          title="Next-generation GPU cold plates and cooling building blocks"
          lead="Product progression from cold plate to loops — with a clear path toward manifolds and facility-level cooling components."
          image="/assets/stock/product-hardware.jpg"
        />
        <section className="section section-elevated">
          <div className="container">
            <div className="card-grid card-grid--2">
              {PRODUCTS.map((p) => (
                <article className="card" key={p.href}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <Link className="text-link" href={p.href}>
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
