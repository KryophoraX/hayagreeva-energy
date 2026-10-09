import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <main className="page-main not-found-page">
        <section className="not-found-card" aria-labelledby="not-found-title">
          <p className="kicker">404 · Page not found</p>
          <h1 id="not-found-title">This page has left the cooling loop.</h1>
          <p>
            The address may have changed, or the page may no longer exist.
            Return to HyperKool or explore our cooling service.
          </p>
          <div className="not-found-actions">
            <Link className="btn btn-primary" href="/">
              Return Home
            </Link>
            <Link className="btn btn-secondary" href="/cooling-as-a-service">
              Explore GPU Cooling
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
