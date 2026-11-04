import Image from "next/image";
import Link from "next/link";
import { FOOTER_SECTIONS, PRIMARY_CTA, SECONDARY_CTA } from "@/lib/nav";

const SOCIAL = [
  {
    href: "https://www.linkedin.com/company/hayagreeva-inc",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a-2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 0 1 2.063-2.063 2.062 2.062 0 0 1 2.064 2.063 2.062 2.062 0 0 1-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
] as const;

export function FinalCta() {
  return (
    <section className="final-cta">
      <h2>Building the Next Generation of AI Infrastructure?</h2>
      <p>
        Engage Hayagreeva to design, deploy and operate the cooling service that
        makes it possible.
      </p>
      <div className="final-cta__actions">
        <Link className="btn btn-primary" href={PRIMARY_CTA.href}>
          {PRIMARY_CTA.label}
        </Link>
        <Link className="btn btn-secondary" href={SECONDARY_CTA.href}>
          {SECONDARY_CTA.label}
        </Link>
      </div>
    </section>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <Link href="/" aria-label="Hayagreeva home">
            <Image
              className="footer-logo"
              src="/assets/hyperkool/logo.png"
              alt="Hayagreeva HyperKool"
              width={280}
              height={67}
            />
          </Link>
          <p className="footer-tagline">
            Custom cold plate design · GPU Cooling as a Service
          </p>
        </div>
        {FOOTER_SECTIONS.map((section) => (
          <div key={section.heading}>
            <h3 className="footer-heading">{section.heading}</h3>
            <ul className="footer-links">
              {section.links.map((link) => (
                <li key={link.href}>
                  {link.href.includes("#") ? (
                    <a href={link.href}>{link.label}</a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bar">
        <div>
          <span>© 2026 Hayagreeva Energy</span>
          {" · "}
          <Link href="/privacy">Privacy</Link>
        </div>
        <div className="footer-social">
          {SOCIAL.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d={item.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
