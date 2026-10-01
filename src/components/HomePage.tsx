import Image from "next/image";
import Link from "next/link";
import SiteFooter, { FinalCta } from "@/components/SiteFooter";
import { PRIMARY_CTA } from "@/lib/nav";

const METRICS = [
  { title: "Next-Gen GPU Ready", note: "Platform-aligned thermal service" },
  { title: "Low Thermal Resistance", note: "Silicon-to-coolant path" },
  { title: "Optimized Pressure Drop", note: "Rack-level pump realism" },
  { title: "High Heat Flux", note: "Hotspot-capable architecture" },
  { title: "Single-Phase DLC", note: "Direct liquid cooling" },
];

const SERVICES = [
  {
    href: "/cooling-as-a-service",
    title: "Cooling as a Service",
    body: "End-to-end thermal capacity for AI infrastructure — design, deployment, monitoring and lifecycle support without CapEx lock-in.",
    cta: "Explore CaaS →",
    image: "/assets/stock/hero-servers.jpg",
  },
  {
    href: "/engineering",
    title: "Thermal Co-Engineering",
    body: "Rapid co-design with OEMs, ODMs and operators around real TDP, heat maps, mounting and coolant constraints.",
    cta: "Explore Engineering →",
    image: "/assets/stock/career-engineering.jpg",
  },
  {
    href: "/technology",
    title: "Direct-to-Chip Architecture",
    body: "Service-delivered liquid cooling engineered at the silicon interface for next-generation AI accelerators.",
    cta: "Explore Technology →",
    image: "/assets/stock/tech-copper.jpg",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Service-First Delivery",
    body: "Cooling capacity delivered as an operable service — not a catalog of parts to assemble yourself.",
  },
  {
    title: "Advanced Thermal Architecture",
    body: "Optimized coolant paths engineered for demanding heat-flux profiles.",
  },
  {
    title: "Low Thermal Resistance",
    body: "Efficient heat transfer from silicon to coolant.",
  },
  {
    title: "Optimized Pressure Drop",
    body: "Performance designed around real rack-level pumping constraints.",
  },
  {
    title: "Rapid Co-Engineering",
    body: "Thermal solutions engineered around your processor, server and facility requirements.",
  },
  {
    title: "US + India Engineering Ecosystem",
    body: "Flexible engineering and deployment support for global AI infrastructure customers.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Requirements",
    items: ["TDP", "Heat map", "IHS dimensions", "Mounting", "Coolant & flow"],
  },
  {
    num: "02",
    title: "Simulation",
    items: ["CFD", "Thermal modeling", "Flow optimization", "Mechanical analysis"],
  },
  {
    num: "03",
    title: "Design",
    items: ["Channel architecture", "Materials", "Fittings", "Mounting"],
  },
  {
    num: "04",
    title: "Prototype",
    items: ["Rapid manufacturing", "Inspection", "Assembly"],
  },
  {
    num: "05",
    title: "Validation",
    items: ["TTV testing", "Thermal resistance", "Pressure drop", "Leak testing"],
  },
  {
    num: "06",
    title: "Deploy & Operate",
    items: ["Integration", "Monitoring", "Lifecycle support", "Scale-out"],
  },
];

const CHARTS = [
  "Thermal Resistance vs Flow Rate",
  "Pressure Drop vs Flow Rate",
  "GPU Temperature vs Heat Load",
  "Coolant Inlet Temperature vs Junction Temperature",
];

const SOLUTIONS = [
  { href: "/solutions/hyperscale", title: "Hyperscalers", body: "Thermal services for ultra-high-density AI infrastructure." },
  { href: "/solutions/neo-cloud", title: "Neo-Cloud Providers", body: "Rapid GPU deployment without thermal bottlenecks." },
  { href: "/solutions/server-oem", title: "Server OEM / ODM", body: "Co-engineered cooling integrated into server architecture." },
  { href: "/solutions/ai-data-centers", title: "AI Data Centers", body: "High-density direct liquid cooling as a managed service." },
  { href: "/solutions/hpc", title: "HPC", body: "Sustained cooling for scientific and technical computing." },
  { href: "/solutions/semiconductor", title: "Semiconductor Companies", body: "Thermal co-design services for next-generation silicon." },
];

const RESOURCES = [
  { href: "/resources#papers", title: "Technical Papers", body: "Thermal-performance reports, architecture papers, TTV validation results." },
  { href: "/resources#notes", title: "Application Notes", body: "GB200, GB300, B300 and platform-specific cooling guidance." },
  { href: "/resources#cases", title: "Case Studies", body: "OEM collaboration, neo-cloud and AI data-center deployments." },
  { href: "/resources#insights", title: "Insights", body: "AI thermal roadmap, DLC vs immersion, rack density and CDUs." },
];

export default function HomePage() {
  return (
    <>
      <main className="page-main">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <Image
              src="/assets/stock/hero-datacenter.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="container hero-content">
            <span className="hero-brand">Hayagreeva Energy</span>
            <h1 className="hero-title">Cooling the Next Generation of AI</h1>
            <p className="hero-lead">
              AI thermal engineering as a service — direct-to-chip liquid cooling
              designed, deployed and operated for the extreme demands of AI, HPC
              and accelerated computing.
            </p>
            <p className="hero-support">
              Platform-aligned cooling for NVIDIA, AMD and next-generation
              accelerator environments — delivered as an engineering service.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/cooling-as-a-service">
                Explore Our Service
              </Link>
              <Link className="btn btn-secondary" href={PRIMARY_CTA.href}>
                {PRIMARY_CTA.label}
              </Link>
            </div>
          </div>
          <div className="audience-bar">
            <div className="container audience-bar__inner">
              <span>AI Infrastructure</span>
              <span>Hyperscale</span>
              <span>Neo-Cloud</span>
              <span>HPC</span>
              <span>OEM / ODM</span>
            </div>
          </div>
        </section>

        <section className="section section-elevated section-accent-edge">
          <div className="container">
            <p className="kicker">Performance focus</p>
            <h2 className="section-title section-title--wide">
              Technical capability at a glance
            </h2>
            <p className="section-lead">
              Quantified TTV metrics will replace these capability labels once
              validation programs publish controlled results.
            </p>
            <div className="metrics-strip" style={{ marginTop: "2rem" }}>
              {METRICS.map((m) => (
                <div className="metric-cell" key={m.title}>
                  <strong>{m.title}</strong>
                  <span>{m.note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container split">
            <div>
              <p className="kicker">Built for AI</p>
              <h2 className="section-title section-title--wide">
                AI Compute Is Getting Hotter. Cooling Has to Evolve Faster.
              </h2>
              <p className="section-lead">
                GPU power density is increasing at unprecedented rates. Hayagreeva
                delivers high-performance liquid-cooling architectures as a
                service — removing heat at the silicon interface while managing
                thermal resistance, pressure drop and cooling-energy requirements.
              </p>
              <Link className="text-link" href="/technology">
                See Our Technology →
              </Link>
            </div>
            <div className="evolution" aria-label="Cooling evolution">
              <div className="evolution-step">
                <span className="evolution-step__index">01</span>
                <div>
                  <strong>GPU power density</strong>
                  <span>Rising package TDP and heat flux</span>
                </div>
              </div>
              <div className="evolution-step">
                <span className="evolution-step__index">02</span>
                <div>
                  <strong>Traditional air cooling</strong>
                  <span>Limited at high-density racks</span>
                </div>
              </div>
              <div className="evolution-step">
                <span className="evolution-step__index">03</span>
                <div>
                  <strong>Conventional cold plates</strong>
                  <span>Not always matched to AI hotspots</span>
                </div>
              </div>
              <div className="evolution-step">
                <span className="evolution-step__index">04</span>
                <div>
                  <strong>Hayagreeva cooling service</strong>
                  <span>Engineered, validated and operated</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-graphite">
          <div className="container">
            <p className="kicker">Our services</p>
            <h2 className="section-title">How we deliver AI cooling</h2>
            <p className="section-lead">
              Hayagreeva is a thermal-engineering service company — from
              architecture and co-design through validation, deployment and
              ongoing Cooling as a Service.
            </p>
            <div className="card-grid card-grid--3">
              {SERVICES.map((s) => (
                <article className="card card--media" key={s.href}>
                  <Image src={s.image} alt="" width={640} height={400} />
                  <div className="card__body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <Link className="text-link" href={s.href}>
                      {s.cta}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-elevated">
          <div className="container featured">
            <div className="media-frame">
              <Image
                src="/assets/stock/tech-copper.jpg"
                alt="Copper thermal exchange surface"
                width={800}
                height={600}
              />
            </div>
            <div>
              <p className="kicker">Service capability</p>
              <h2 className="section-title">Engineered Where Every Degree Matters</h2>
              <p className="section-lead">
                Our cooling service is built on coupled thermal, fluid and
                mechanical optimization — so next-generation AI accelerators stay
                within operating limits under real rack and facility constraints.
              </p>
              <ul className="callout-list">
                <li>Requirements capture &amp; heat-map analysis</li>
                <li>Direct-to-chip architecture design</li>
                <li>Hotspot targeting &amp; flow distribution</li>
                <li>CFD and thermal validation</li>
                <li>Prototype through qualification</li>
                <li>Deployment, monitoring &amp; lifecycle support</li>
              </ul>
              <div className="metric-row">
                <div>Low Thermal Resistance</div>
                <div>Low Pressure Drop</div>
                <div>Uniform Temperature</div>
                <div>High Heat-Flux Capability</div>
              </div>
              <Link className="text-link" href="/cooling-as-a-service">
                View Cooling as a Service →
              </Link>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <p className="kicker">Platform support</p>
            <h2 className="section-title section-title--wide">
              Engineered for the AI Platforms Driving the Future
            </h2>
            <div className="platform-grid">
              <div className="platform-card">
                <h3>NVIDIA</h3>
                <ul>
                  <li>GB200</li>
                  <li>GB300</li>
                  <li>B300</li>
                  <li>Next-generation architectures</li>
                </ul>
              </div>
              <div className="platform-card">
                <h3>AMD</h3>
                <ul>
                  <li>Instinct accelerators</li>
                </ul>
              </div>
              <div className="platform-card">
                <h3>Intel</h3>
                <ul>
                  <li>AI / HPC processors</li>
                </ul>
              </div>
              <div className="platform-card">
                <h3>Custom ASIC</h3>
                <ul>
                  <li>Hyperscaler AI accelerators</li>
                  <li>Custom silicon</li>
                </ul>
              </div>
            </div>
            <p className="section-lead" style={{ marginTop: "2rem" }}>
              Don&apos;t see your processor?
            </p>
            <Link className="text-link" href={PRIMARY_CTA.href}>
              Talk to Our Engineering Team →
            </Link>
          </div>
        </section>

        <section className="section section-graphite">
          <div className="container">
            <p className="kicker">Why Hayagreeva</p>
            <h2 className="section-title">Service differentiators</h2>
            <div className="card-grid card-grid--3">
              {DIFFERENTIATORS.map((d) => (
                <article className="card" key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-elevated" id="engineering-process">
          <div className="container">
            <p className="kicker">How we engage</p>
            <h2 className="section-title section-title--wide">
              From Silicon Requirements to Operated Cooling
            </h2>
            <p className="section-lead">
              Engineering, validation and operations are the service — not
              afterthoughts attached to a parts sale.
            </p>
            <div className="process">
              {PROCESS.map((step) => (
                <div className="process-step" key={step.num}>
                  <div className="process-step__num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <ul>
                    {step.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link className="text-link" href="/engineering">
              Explore Engineering →
            </Link>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <p className="kicker">Performance &amp; validation</p>
            <h2 className="section-title">Performance You Can Measure</h2>
            <p className="section-lead">
              Interactive charts and published TTV results will land here as
              validation programs complete. Chart frameworks are ready for data.
            </p>
            <div className="chart-grid">
              {CHARTS.map((title, i) => (
                <article className="chart-card" key={title}>
                  <h3>{title}</h3>
                  <div className="chart-placeholder" aria-hidden="true">
                    {[40, 55, 70, 48, 82, 60, 75].map((h, idx) => (
                      <span key={idx} style={{ height: `${(h + i * 3) % 90}%` }} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="chart-note">
              Tested using a calibrated Thermal Test Vehicle (TTV) under controlled
              coolant flow and inlet-temperature conditions — results published upon
              program completion.
            </p>
            <Link className="text-link" href="/technology/testing-validation">
              Request Technical Data →
            </Link>
          </div>
        </section>

        <section className="section section-graphite">
          <div className="container">
            <p className="kicker">Solutions</p>
            <h2 className="section-title">Services built around your role in AI</h2>
            <div className="card-grid card-grid--3">
              {SOLUTIONS.map((s) => (
                <article className="card" key={s.href}>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <Link className="text-link" href={s.href}>
                    Explore →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-elevated">
          <div className="container split">
            <div>
              <p className="kicker">Cooling as a Service</p>
              <h2 className="section-title section-title--wide">
                Cooling Infrastructure Without the Traditional CapEx Barrier
              </h2>
              <p className="section-lead">
                Cooling capacity delivered as a scalable service aligned with your
                AI infrastructure deployment.
              </p>
              <ul className="checklist">
                <li>Design</li>
                <li>Equipment</li>
                <li>Installation</li>
                <li>Monitoring</li>
                <li>Maintenance</li>
                <li>Lifecycle support</li>
              </ul>
              <Link className="text-link" href="/cooling-as-a-service">
                Explore Cooling as a Service →
              </Link>
            </div>
            <div>
              <div className="caas-flow" aria-label="CaaS flow">
                <span className="caas-node">Customer AI Compute</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node caas-node--accent">
                  Hayagreeva Service
                </span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Manifold / CDU</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Monitoring</span>
                <span className="caas-arrow">↓</span>
                <span className="caas-node">Cooling Infrastructure</span>
              </div>
              <div className="media-frame">
                <Image
                  src="/assets/stock/hero-servers.jpg"
                  alt="Server infrastructure"
                  width={700}
                  height={420}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="container">
            <p className="kicker">Co-development</p>
            <h2 className="section-title section-title--wide">
              Let&apos;s Engineer Your Next AI Platform Together
            </h2>
            <p className="section-lead">
              Hayagreeva partners with processor developers, server OEMs, ODMs, AI
              infrastructure providers and data-center operators to deliver thermal
              services around real platform requirements.
            </p>
            <div className="codev">
              <div className="codev-partners">
                <span>Silicon Company</span>
                <span>Server OEM</span>
                <span>Hayagreeva</span>
                <span>Operated Thermal Service</span>
              </div>
              <div>
                <div className="pipeline" aria-label="Engagement pipeline">
                  {[
                    "NDA",
                    "Thermal Requirements",
                    "Concept",
                    "CFD",
                    "Prototype",
                    "TTV Validation",
                    "Qualification",
                    "Operate",
                  ].map((step) => (
                    <span key={step}>{step}</span>
                  ))}
                </div>
                <Link className="text-link" href="/company/partners">
                  Partner With Engineering →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-elevated">
          <div className="container">
            <div className="inception">
              <h2>Part of the NVIDIA Inception Program</h2>
              <p>
                Supporting text around Hayagreeva&apos;s work in AI infrastructure
                and next-generation GPU thermal management, subject to NVIDIA&apos;s
                applicable program and logo usage requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="section section-graphite">
          <div className="container">
            <p className="kicker">Resources</p>
            <h2 className="section-title">Technical depth for operators and partners</h2>
            <div className="card-grid card-grid--4">
              {RESOURCES.map((r) => (
                <article className="card" key={r.href}>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                  <Link className="text-link" href={r.href}>
                    Browse →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
