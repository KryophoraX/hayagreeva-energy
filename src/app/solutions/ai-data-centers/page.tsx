import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "AI Data Center Solutions",
  description: "High-density direct liquid cooling for AI data centers.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="AI Data Centers"
      title="High-density direct liquid cooling"
      lead="From cold plate to facility rejection path — thermal architecture for AI-dense halls."
      body={[
        "AI data centers need cooling that works at the package and remains integrable with CDUs, manifolds and building rejection.",
        "Hayagreeva focuses on measurable package performance and clear engineering interfaces for operators and integrators.",
      ]}
    />
  );
}
