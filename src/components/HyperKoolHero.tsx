import Image from "next/image";
import Link from "next/link";

export default function HyperKoolHero() {
  return (
    <section className="hk-hero" aria-label="HyperKool hero">
      <div className="hk-hero__media" aria-hidden>
        <Image
          src="/assets/hyperkool/hero-fullbleed.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="hk-hero__media-img"
        />
        <div className="hk-hero__scrim" />
      </div>

      <div className="hk-container hk-hero__content">
        <div className="hk-hero__copy">
          <p className="hk-hero__eyebrow">
            Liquid cooling for a higher world
            <span className="hk-hero__eyebrow-line" aria-hidden />
          </p>

          <h1 className="hk-hero__heading">
            Custom Cold Plate Design &amp; GPU Cooling as a Service
          </h1>

          <p className="hk-hero__body">
            Submit your form factor, and HyperKool will design and deliver a
            high-performance cold plate. Get end-to-end GPU cooling support from
            design to deployment.
          </p>

          <div className="hk-hero__ctas">
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
      </div>
    </section>
  );
}
