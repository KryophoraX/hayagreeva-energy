import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a Hayagreeva thermal engineer or request a cold plate evaluation.",
};

export default function ContactPage() {
  return (
    <>
      <main className="page-main">
        <PageHero
          kicker="Contact"
          title="Talk to a thermal engineer"
          lead="Request a cold plate evaluation, technical data, OEM partnership discussion or Cooling-as-a-Service conversation."
          image="/assets/stock/hero-servers.jpg"
        />
        <section className="section section-elevated">
          <div className="container split">
            <div>
              <h2 className="section-title">How we engage</h2>
              <div
                className="card-grid card-grid--2"
                style={{ marginTop: "1.5rem" }}
              >
                <article className="card">
                  <h3>Talk to a Thermal Engineer</h3>
                  <p>
                    Platform requirements, heat maps, flow constraints and
                    co-design discussions.
                  </p>
                </article>
                <article className="card">
                  <h3>Request Cold Plate Evaluation</h3>
                  <p>
                    Pilot evaluation for qualified operators, OEMs and
                    integration partners.
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
                  src="/assets/stock/product-hardware.jpg"
                  alt="Accelerator hardware"
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
