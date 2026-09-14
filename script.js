(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const q = (sel, root) => (root || document).querySelector(sel);
  const qa = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* —— Mobile nav —— */
  const header = q(".site-header");
  const toggle = q(".nav-toggle");
  const nav = q("#site-nav") || q(".site-nav");

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) {
      const first = qa("a, button", nav)[0];
      if (first) first.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => setNavOpen(!nav.classList.contains("is-open")));
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => setNavOpen(false))
    );

    document.addEventListener("keydown", (e) => {
      if (!nav.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setNavOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = qa("a[href], button:not([disabled])", nav);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* —— Header scroll —— */
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* —— Matrix stage tabs + layer visibility —— */
  const STAGE_LAYERS = {
    full: ["full", "plate", "matrix", "product"],
    plate: ["plate", "product"],
    matrix: ["plate", "matrix"],
    flow: ["plate", "matrix", "flow"],
    thermal: ["plate", "matrix", "thermal"],
    product: ["full", "plate", "matrix", "product"],
  };

  const matrix = q(".matrix-stage");
  if (matrix) {
    const tabs = qa('[role="tablist"] [role="tab"]', matrix);
    const panels = qa(".matrix-stage__panel, .matrix-panel", matrix);
    const layers = qa(".matrix-layer", matrix);
    const visual = q(".matrix-visual, #matrix-svg", matrix);

    function activateTab(tab) {
      if (!tab) return;
      const stage = tab.getAttribute("data-stage") || String(tabs.indexOf(tab));
      const panelId = tab.getAttribute("aria-controls");

      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.classList.toggle("is-active", on);
        t.tabIndex = on ? 0 : -1;
      });

      panels.forEach((panel) => {
        const match = panelId
          ? panel.id === panelId
          : panel.getAttribute("data-stage") === stage;
        panel.hidden = !match;
        panel.classList.toggle("is-active", match);
      });

      if (visual) visual.setAttribute("data-stage", stage);

      const visible = STAGE_LAYERS[stage] || ["full", "plate", "matrix"];
      layers.forEach((layer) => {
        const name = layer.getAttribute("data-layer") || "";
        layer.classList.toggle("is-visible", visible.includes(name));
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));
      tab.addEventListener("keydown", (e) => {
        const i = tabs.indexOf(tab);
        let next = -1;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = tabs.length - 1;
        if (next < 0) return;
        e.preventDefault();
        tabs[next].focus();
        activateTab(tabs[next]);
      });
    });

    activateTab(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  }

  /* —— Architecture flow —— */
  const archSteps = qa(".arch-flow__step, .arch-step");

  if (archSteps.length) {
    function showArch(step) {
      archSteps.forEach((s) => {
        const on = s === step;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-expanded", String(on));
      });
    }

    archSteps.forEach((step) => {
      step.addEventListener("click", () => showArch(step));
      step.addEventListener("focus", () => showArch(step));
    });

    showArch(archSteps.find((s) => s.classList.contains("is-active")) || archSteps[0]);
  }

  /* —— Hero: watts reveal + coolant flow (Anime.js) —— */
  const hero = q(".hero");
  const wattsEl = q("[data-watts]");

  function revealWatts() {
    if (!wattsEl) return;
    const target = parseInt(wattsEl.getAttribute("data-watts-target") || "5000", 10);
    if (reduceMotion || typeof anime === "undefined") {
      wattsEl.textContent = target.toLocaleString("en-US");
      return;
    }
    const obj = { v: 0 };
    anime({
      targets: obj,
      v: target,
      round: 1,
      duration: 1600,
      easing: "easeOutExpo",
      update() {
        wattsEl.textContent = Math.round(obj.v).toLocaleString("en-US");
      },
      complete() {
        wattsEl.textContent = target.toLocaleString("en-US");
      },
    });
  }

  function animateFlow() {
    if (reduceMotion || typeof anime === "undefined") return;
    qa(".hv-dot").forEach((dot, i) => {
      const path = document.getElementById(dot.getAttribute("data-path"));
      if (!path) return;
      const len = path.getTotalLength();
      anime({
        targets: dot,
        opacity: [0, 1, 1, 0],
        duration: 2600,
        delay: i * 320,
        loop: true,
        easing: "linear",
        update(anim) {
          const p = path.getPointAtLength((anim.progress / 100) * len);
          dot.setAttribute("cx", p.x);
          dot.setAttribute("cy", p.y);
        },
      });
    });
    qa(".hv-heat-path").forEach((p, i) => {
      anime({
        targets: p,
        strokeDashoffset: [0, -40],
        duration: 1400,
        delay: i * 120,
        loop: true,
        easing: "linear",
      });
    });
  }

  if (hero) {
    if ("IntersectionObserver" in window) {
      const heroObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            revealWatts();
            animateFlow();
            heroObs.disconnect();
          });
        },
        { threshold: 0.3 }
      );
      heroObs.observe(hero);
    } else {
      revealWatts();
      animateFlow();
    }
  }

  /* —— Reveal —— */
  const revealEls = qa("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if (revealEls.length) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  }
})();
