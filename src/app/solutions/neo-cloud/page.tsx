import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "Neo-Cloud Solutions",
  description: "Hayagreeva cooling for neo-cloud GPU deployment.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="Neo-Cloud"
      title="Rapid GPU deployment without thermal bottlenecks"
      lead="Help neo-cloud providers bring dense GPU capacity online with direct-to-chip cooling that matches platform realities."
      body={[
        "Neo-cloud growth depends on predictable thermal headroom as new GPU generations land.",
        "Hayagreeva supports evaluation programs and custom cold-plate loops so cooling is not the blocker to capacity.",
      ]}
      image="/assets/stock/hero-servers.jpg"
    />
  );
}
