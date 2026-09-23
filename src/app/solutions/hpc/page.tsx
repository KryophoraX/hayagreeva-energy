import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "HPC Solutions",
  description: "Hayagreeva liquid cooling for HPC and accelerated scientific computing.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="HPC"
      title="Sustained performance for scientific computing"
      lead="Direct-to-chip cooling for HPC systems where thermal throttling erodes research throughput."
      body={[
        "HPC workloads demand sustained accelerator performance under continuous load.",
        "Hayagreeva cold plates and loops are engineered for package-level heat removal with system hydraulic realism.",
      ]}
      image="/assets/stock/app-hpc.jpg"
    />
  );
}
