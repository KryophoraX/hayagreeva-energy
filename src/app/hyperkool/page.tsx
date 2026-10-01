import type { Metadata } from "next";
import HyperKoolPage from "@/components/HyperKoolPage";

export const metadata: Metadata = {
  title: "HyperKool",
  description:
    "Hayagreeva HyperKool — custom cold plate design and GPU Cooling as a Service for advanced liquid cooling.",
};

export default function Page() {
  return <HyperKoolPage />;
}
