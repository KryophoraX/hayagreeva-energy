import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How HyperKool handles information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <main className="page-main">
        <section className="page-hero privacy-hero">
          <div className="container">
            <p className="kicker">Privacy</p>
            <h1 className="page-title">Your information stays focused on your inquiry.</h1>
            <p className="page-lead">
              This website collects only the information you choose to submit so
              Hayagreeva can respond to your HyperKool and cooling-service needs.
            </p>
          </div>
        </section>
        <section className="section section-elevated">
          <div className="container legal-content">
            <h2>Information we collect</h2>
            <p>
              The contact form may collect your name, email address, company,
              area of interest and message. Basic security logs may include an IP
              address and request metadata used to prevent abuse.
            </p>
            <h2>How we use it</h2>
            <p>
              We use submitted information to answer inquiries, evaluate service
              opportunities and protect the site from spam. We do not sell
              personal information.
            </p>
            <h2>Data sharing and retention</h2>
            <p>
              Form delivery is processed by our configured email-form provider.
              Information is retained only as long as reasonably needed to handle
              the inquiry, meet legal obligations and maintain service security.
            </p>
            <h2>Your choices</h2>
            <p>
              To request access, correction or deletion, email{" "}
              <a href="mailto:bsivanandame@hayagreevaenergy.com">
                bsivanandame@hayagreevaenergy.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
