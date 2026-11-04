import Link from "next/link";

export default function HyperKoolHero() {
  return (
    <section className="hk-hero" aria-label="HyperKool hero">
      <div className="hk-hero__media" aria-hidden>
        <div className="hk-hero__scrim" />
      </div>

      <div className="hk-container hk-hero__content">
        <div className="hk-hero__copy">
          <p className="hk-hero__eyebrow">
            Liquid cooling made simple
            <span className="hk-hero__eyebrow-line" aria-hidden />
          </p>

          <h1 className="hk-hero__heading">
            Custom Cooling for AI GPUs
          </h1>

          <p className="hk-hero__body">
            Send us your drawing and cooling needs. We design the cold plate and
            help you install and run the cooling system.
          </p>

          <div className="hk-hero__ctas">
            <Link
              className="hk-btn hk-btn--primary"
              href="/contact?intent=form-factor"
            >
              Upload Your Drawing →
            </Link>
            <Link className="hk-btn hk-btn--ghost" href="/cooling-as-a-service">
              See Our GPU Cooling Service →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
