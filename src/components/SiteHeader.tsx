"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/nav";

function pathIsActive(pathname: string, hash: string, href: string) {
  const [targetPath, targetHash] = href.split("#");

  if (targetHash) {
    return pathname === targetPath && hash === `#${targetHash}`;
  }

  if (targetPath === "/") {
    return pathname === "/" && !hash;
  }

  return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const [hash, setHash] = useState("");
  const open = openOnPath === pathname;

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenOnPath(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="site-logo"
          href="/"
          aria-label="Hayagreeva HyperKool home"
          onClick={() => setOpenOnPath(null)}
        >
          <Image
            src="/assets/hyperkool/logo.png"
            alt="Hayagreeva HyperKool — Advanced Liquid Cooling"
            width={280}
            height={67}
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
              pathIsActive(pathname, hash, item.href) ||
              item.children?.some((child) =>
                pathIsActive(pathname, hash, child.href)
              );
            return (
              <div className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link${active ? " is-active" : ""}`}
                  aria-current={
                    pathIsActive(pathname, hash, item.href)
                      ? item.href.includes("#")
                        ? "location"
                        : "page"
                      : undefined
                  }
                  onClick={() => setOpenOnPath(null)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="nav-dropdown">
                    {item.children.map((child) => {
                      const childActive = pathIsActive(
                        pathname,
                        hash,
                        child.href
                      );
                      const linkProps = {
                        className: childActive ? "is-active" : undefined,
                        "aria-current": childActive
                          ? (child.href.includes("#") ? "location" : "page")
                          : undefined,
                        onClick: () => setOpenOnPath(null),
                      } as const;

                      return child.href.includes("#") ? (
                        <a key={child.href} href={child.href} {...linkProps}>
                          {child.label}
                        </a>
                      ) : (
                        <Link key={child.href} href={child.href} {...linkProps}>
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
          <Link
            className="btn btn-primary btn-header header-cta-mobile"
            href={PRIMARY_CTA.href}
            onClick={() => setOpenOnPath(null)}
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
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOnPath(open ? null : pathname)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="visually-hidden">
              {open ? "Close menu" : "Open menu"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
