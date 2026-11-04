import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Hayagreeva Energy about your cooling project.",
};

export default function ContactPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Contact"
          title="Tell us what you need to cool"
          lead="Send us your drawing or describe your project. We will help you choose the next step."
          image="/assets/stock/hero-servers.jpg"
        />
        <section className="section section-elevated">
          <div className="container split">
            <div>
              <h2 className="section-title">How we can help</h2>
              <div
                className="card-grid card-grid--2"
                style={{ marginTop: "1.5rem" }}
              >
                <article className="card">
                  <h3>Plan Your Cooling</h3>
                  <p>
                    Tell us about your hardware, heat, space, and coolant needs.
                  </p>
                </article>
                <article className="card">
                  <h3>Build and Install It</h3>
                  <p>
                    We can design, test, install, and support your cooling
                    system.
                  </p>
                </article>
              </div>
              <p className="section-lead" style={{ marginTop: "2rem" }}>
                Prefer email? Reach engineering at{" "}
                <a
                  href="mailto:bsivanandame@hayagreevaenergy.com"
                  style={{ color: "var(--hg-accent)" }}
                >
                  bsivanandame@hayagreevaenergy.com
                </a>
              </p>
            </div>
            <div>
              <Suspense fallback={<div className="contact-form">Loading form…</div>}>
                <ContactForm />
              </Suspense>
              <div className="media-frame" style={{ marginTop: "1rem" }}>
                <Image
                  src="/assets/stock/hero-datacenter.jpg"
                  alt="AI data center infrastructure"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
