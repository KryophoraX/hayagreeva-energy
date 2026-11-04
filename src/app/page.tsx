import type { Metadata } from "next";
import HyperKoolPage from "@/components/HyperKoolPage";

export const metadata: Metadata = {
  title: "Hayagreeva",
  description:
    "Custom cold plate design and end-to-end GPU Cooling as a Service for high-density AI infrastructure.",
};

export default function Page() {
  return <HyperKoolPage />;
}
