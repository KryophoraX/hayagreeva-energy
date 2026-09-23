import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "Hyperscale Solutions",
  description: "Hayagreeva thermal solutions for hyperscale AI infrastructure.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="Hyperscale"
      title="Ultra-high-density AI infrastructure"
      lead="Cold plates and co-engineering programs sized for hyperscale rack power density and deployment velocity."
      body={[
        "Hyperscale operators need thermal solutions that keep pace with accelerator roadmaps without introducing unmanageable hydraulics or facility risk.",
        "Hayagreeva engages on package-level requirements, validation conditions and manufacturable designs that can scale with cluster growth.",
      ]}
      image="/assets/stock/app-datacenter.jpg"
    />
  );
}
