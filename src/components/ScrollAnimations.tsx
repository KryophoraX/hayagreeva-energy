"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = [
  "[data-reveal]",
  ".section > .container",
  ".hero-content",
  ".audience-bar",
  ".page-hero .container",
  ".final-cta",
  ".card",
  ".metric-cell",
  ".process-step",
  ".evolution-step",
  ".platform-card",
  ".chart-card",
  ".featured > *",
  ".split > *",
].join(", ");

function prepareElements() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

  elements.forEach((el) => {
    el.classList.add("reveal");

    const parent = el.parentElement;
    if (
      parent &&
      (parent.classList.contains("card-grid") ||
        parent.classList.contains("metrics-strip") ||
        parent.classList.contains("process") ||
        parent.classList.contains("evolution") ||
        parent.classList.contains("platform-grid") ||
        parent.classList.contains("chart-grid") ||
        parent.classList.contains("featured") ||
        parent.classList.contains("split"))
    ) {
      const i = Array.from(parent.children).indexOf(el);
      if (i >= 0) {
        el.style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
      }
    }

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView || el.closest(".hero")) {
      el.classList.add("is-visible");
    }
  });

  return elements.filter((el) => !el.classList.contains("is-visible"));
}

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.classList.add("motion-reduce");
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        el.classList.add("reveal", "is-visible");
      });
      return;
    }

    const pending = prepareElements();
    document.documentElement.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      }
    );

    pending.forEach((el) => observer.observe(el));

    const mo = new MutationObserver(() => {
      prepareElements().forEach((el) => observer.observe(el));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
