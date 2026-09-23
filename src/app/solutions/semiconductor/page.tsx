import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "Semiconductor Solutions",
  description: "Thermal co-design with semiconductor companies for next-generation AI silicon.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="Semiconductor"
      title="Advanced thermal co-design for next-generation silicon"
      lead="Work with processor developers early — from heat maps and IHS constraints to validated cold-plate architectures."
      body={[
        "Semiconductor partners benefit from early thermal co-design before package decisions lock in cooling limits.",
        "Hayagreeva engages on requirements, simulation and TTV validation to prove cooling capability alongside silicon roadmaps.",
      ]}
      image="/assets/stock/tech-chip.jpg"
    />
  );
}
