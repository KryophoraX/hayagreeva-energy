import Image from "next/image";

type PageHeroProps = {
  kicker: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
};

export default function PageHero({
  kicker,
  title,
  lead,
  image = "/assets/stock/hero-datacenter.jpg",
  imageAlt = "",
}: PageHeroProps) {
  return (
    <section className="page-hero page-hero--photo">
      <div className="page-hero__bg" aria-hidden="true">
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" />
      </div>
      <div className="page-hero__overlay" aria-hidden="true" />
      <div className="container">
        <p className="kicker">{kicker}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-lead">{lead}</p>
      </div>
    </section>
  );
}
