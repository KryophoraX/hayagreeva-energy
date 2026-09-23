import Image from "next/image";
import Link from "next/link";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/nav";

const SOCIAL = [
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a-2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 0 1 2.063-2.063 2.062 2.062 0 0 1 2.064 2.063 2.062 2.062 0 0 1-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: "https://x.com/",
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
] as const;

export function FinalCta() {
  return (
    <section className="final-cta">
      <h2>Building the Next Generation of AI Infrastructure?</h2>
      <p>
        Let&apos;s design the cooling architecture that makes it possible.
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
              src="/assets/logo-light.png"
              alt="Hayagreeva"
              width={200}
              height={30}
            />
          </Link>
          <p className="footer-tagline">
            Advanced AI thermal engineering · Direct-to-chip liquid cooling
          </p>
        </div>
        <div>
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-links">
            <li>
              <Link href="/technology">Technology</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/solutions">Solutions</Link>
            </li>
            <li>
              <Link href="/engineering">Engineering</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Programs</h3>
          <ul className="footer-links">
            <li>
              <Link href="/cooling-as-a-service">Cooling as a Service</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="/company/partners">Partners</Link>
            </li>
            <li>
              <Link href="/company/careers">Careers</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="footer-heading">Company</h3>
          <ul className="footer-links">
            <li>
              <Link href="/company">About</Link>
            </li>
            <li>
              <Link href="/company/leadership">Leadership</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bar">
        <div>
          <span>© 2026 Hayagreeva Energy</span>
          {" · "}
          <Link href="/contact">Privacy</Link>
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
