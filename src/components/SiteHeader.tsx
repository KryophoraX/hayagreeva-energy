"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="site-logo" href="/" aria-label="Hayagreeva Energy home">
          <Image
            src="/assets/logo-light.png"
            alt="Hayagreeva Energy"
            width={200}
            height={30}
            priority
          />
        </Link>

        <nav
          className={`site-nav${open ? " is-open" : ""}`}
          id="site-nav"
          aria-label="Primary"
        >
          {NAV_LINKS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <div className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="nav-dropdown">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            className="btn btn-primary btn-header header-cta-mobile"
            href={PRIMARY_CTA.href}
          >
            {PRIMARY_CTA.label}
          </Link>
        </nav>

        <div className="header-actions">
          <Link
            className="btn btn-primary btn-header header-cta-desktop"
            href={PRIMARY_CTA.href}
          >
            {PRIMARY_CTA.label}
          </Link>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="visually-hidden">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
