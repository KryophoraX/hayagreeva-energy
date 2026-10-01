import Image from "next/image";
import Link from "next/link";

export default function HyperKoolHero() {
  return (
    <section className="hk-hero" aria-label="HyperKool hero">
      <div className="hk-hero__stage">
        <div className="hk-hero__bg" aria-hidden>
          <Image
            src="/assets/hyperkool/hero-bg.jpg"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="hk-hero__bg-img"
          />
          <div className="hk-hero__wash" />
        </div>

        <div className="hk-container hk-hero__row">
          <div className="hk-hero__text">
            <p className="hk-hero__eyebrow">
              <span className="hk-hero__eyebrow-line" aria-hidden />
              Liquid cooling for a higher world
            </p>

            <h1 className="hk-hero__heading">
              Custom Cold Plate Design &amp; GPU Cooling as a Service
            </h1>

            <p className="hk-hero__body">
              Submit your form factor, and HyperKool will design and deliver a
              high-performance cold plate. Get end-to-end GPU cooling support
              from design to deployment.
            </p>

            <div className="hk-hero__ctas">
              <Link
                className="hk-btn hk-btn--primary"
                href="/contact?intent=form-factor"
              >
                Submit Your Form Factor →
              </Link>
              <Link
                className="hk-btn hk-btn--ghost"
                href="/cooling-as-a-service"
              >
                Explore GPU Cooling as a Service →
              </Link>
            </div>
          </div>

          <div className="hk-hero__visual">
            <div className="hk-hero__glow" aria-hidden />
            <div className="hk-hero__frame">
              <Image
                src="/assets/hyperkool/hero-product.jpg"
                alt="Hayagreeva HyperKool 5 cold plate with liquid cooling lines"
                width={1280}
                height={720}
                priority
                unoptimized
                className="hk-hero__product-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
