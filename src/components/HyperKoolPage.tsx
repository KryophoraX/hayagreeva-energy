"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "@/styles/hyperkool-home.scss";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/hyperkool", label: "HyperKool", active: true },
  { href: "/hyperkool#custom-design", label: "Custom Design" },
  { href: "/cooling-as-a-service", label: "GPU Cooling as a Service" },
  { href: "/technology", label: "Technology" },
  { href: "/company", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function IconCube() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M12 12 20 7.5M12 12v9M12 12 4 7.5" />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 18h10a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.5-1.5A3.5 3.5 0 0 0 7 18Z" />
      <path d="M9 14h6M9 16.5h4" strokeLinecap="round" />
    </svg>
  );
}

function IconHeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M8 20c0-4 2-5 2-9" strokeLinecap="round" />
      <path d="M12 20c0-5 2.5-6 2.5-11" strokeLinecap="round" />
      <path d="M16 20c0-3.5 2-4.5 2-8" strokeLinecap="round" />
    </svg>
  );
}

function IconDrop() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3c3.5 4.5 6 8 6 11a6 6 0 1 1-12 0c0-3 2.5-6.5 6-11Z" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HyperKoolPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hk-home">
      <header className="hk-header">
        <div className="hk-container hk-header__inner">
          <Link
            className="hk-logo"
            href="/hyperkool"
            aria-label="Hayagreeva HyperKool"
          >
            <Image
              src="/assets/hyperkool/logo.png"
              alt="Hayagreeva HyperKool — Advanced Liquid Cooling"
              width={280}
              height={70}
              priority
            />
          </Link>

          <nav className="hk-nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={"active" in item && item.active ? "is-active" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            className="hk-btn hk-btn--primary hk-btn--sm hk-header__cta"
            href="/contact?intent=demo"
          >
            Request a Demo →
          </Link>

          <button
            className="hk-nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="hk-nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
            <span className="visually-hidden">Menu</span>
          </button>
        </div>

        <nav
          id="hk-nav-mobile"
          className={`hk-nav-mobile${open ? " is-open" : ""}`}
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            className="hk-btn hk-btn--primary"
            href="/contact?intent=demo"
            style={{ marginTop: "1rem" }}
            onClick={() => setOpen(false)}
          >
            Request a Demo →
          </Link>
        </nav>
      </header>

      <main>
        <section className="hk-hero" aria-label="HyperKool hero">
          <div className="hk-hero__atmosphere" aria-hidden>
            <Image
              className="hk-hero__atmosphere-img"
              src="/assets/hyperkool/hero-atmosphere.jpg"
              alt=""
              fill
              unoptimized
              sizes="100vw"
              priority
            />
            <div className="hk-hero__veil" />
          </div>

          <div className="hk-container hk-hero__layout">
            <div className="hk-hero__copy">
              <p className="hk-kicker">Liquid cooling for a higher world</p>
              <h1 className="hk-hero__title">
                Custom Cold Plate Design &amp; GPU Cooling as a Service
              </h1>
              <p className="hk-hero__lead">
                Submit your form factor, and HyperKool will design and deliver a
                high-performance cold plate. Get end-to-end GPU cooling support
                from design to deployment.
              </p>
              <div className="hk-hero__actions">
                <Link
                  className="hk-btn hk-btn--primary"
                  href="/contact?intent=form-factor"
                >
                  Submit Your Form Factor →
                </Link>
                <Link className="hk-btn hk-btn--ghost" href="/cooling-as-a-service">
                  Explore GPU Cooling as a Service →
                </Link>
              </div>
            </div>

            <div className="hk-hero__product">
              <Image
                src="/assets/hyperkool/hero-cold-plate.jpg"
                alt="Hayagreeva HyperKool 5 cold plate with liquid cooling lines"
                width={1280}
                height={720}
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        <section className="hk-services" id="custom-design">
          <div className="hk-container hk-services__grid">
            <article className="hk-service">
              <div>
                <div className="hk-service__icon" aria-hidden>
                  <IconCube />
                </div>
                <h2 className="hk-service__title">Custom Cold Plate Design</h2>
                <p className="hk-service__body">
                  Submit your form factor and requirements. We design and deliver
                  a high-performance cold plate tailored to your application.
                </p>
                <ul className="hk-check">
                  {[
                    "Upload CAD / STEP / DXF",
                    "Share thermal & flow requirements",
                    "Prototype to production",
                  ].map((item) => (
                    <li key={item}>
                      <span className="hk-check__mark" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hk-service__media">
                <Image
                  src="/assets/hyperkool/service-custom-design.jpg"
                  alt="HyperKool cold plate with engineering dimension overlays"
                  width={1152}
                  height={864}
                  unoptimized
                />
              </div>
            </article>

            <article className="hk-service">
              <div>
                <div className="hk-service__icon" aria-hidden>
                  <IconCloud />
                </div>
                <h2 className="hk-service__title">GPU Cooling as a Service</h2>
                <p className="hk-service__body">
                  End-to-end GPU cooling support to deploy and operate
                  high-performance AI infrastructure.
                </p>
                <ul className="hk-check">
                  {[
                    "Design support",
                    "Validation & qualification",
                    "Deployment support",
                    "Lifecycle optimization",
                  ].map((item) => (
                    <li key={item}>
                      <span className="hk-check__mark" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hk-service__media">
                <Image
                  src="/assets/hyperkool/service-gpu-caas.jpg"
                  alt="Liquid-cooled GPU server racks with blue coolant lines"
                  width={1152}
                  height={864}
                  unoptimized
                />
              </div>
            </article>
          </div>
        </section>

        <section className="hk-benefits" aria-label="Capabilities">
          <div className="hk-container hk-benefits__grid">
            {[
              {
                icon: <IconHeat />,
                title: "High Heat Flux",
                body: "Engineered for next-gen chips and ultra-high power densities.",
              },
              {
                icon: <IconDrop />,
                title: "Low Pressure Drop",
                body: "Optimized flow paths for efficient system design.",
              },
              {
                icon: <IconLayers />,
                title: "Scalable Design",
                body: "From racks to multi-megawatt deployments.",
              },
              {
                icon: <IconShield />,
                title: "Validation Ready",
                body: "Proven performance, reliability and qualification support.",
              },
            ].map((item) => (
              <div className="hk-benefit" key={item.title}>
                <div className="hk-benefit__icon" aria-hidden>
                  {item.icon}
                </div>
                <div>
                  <h3 className="hk-benefit__title">{item.title}</h3>
                  <p className="hk-benefit__body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
