import type { Metadata } from "next";
import { SolutionShell } from "@/components/SolutionShell";

export const metadata: Metadata = {
  title: "Server OEM / ODM Solutions",
  description: "Custom cold plates and loops for server OEMs and ODMs.",
};

export default function Page() {
  return (
    <SolutionShell
      kicker="Server OEM / ODM"
      title="Design-in thermal partners for AI server platforms"
      lead="Custom cold plates and loops integrated into server architecture with DFM and qualification in mind."
      body={[
        "OEM and ODM programs need thermal partners who can move from NDA requirements through CFD, prototype, TTV and production qualification.",
        "Hayagreeva's co-development process is built for Netweb-style and other OEM design-in engagements.",
      ]}
      image="/assets/stock/manufacturing-precision.jpg"
    />
  );
}
