import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import ConditionalSiteHeader from "@/components/ConditionalSiteHeader";
import ScrollAnimations from "@/components/ScrollAnimations";
import "./globals.css";
import "@/styles/site.scss";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hayagreevaenergy.com"),
  title: {
    default: "Hayagreeva HyperKool — Advanced Liquid Cooling",
    template: "%s — Hayagreeva HyperKool",
  },
  description:
    "Custom cold plate design and GPU Cooling as a Service from Hayagreeva HyperKool — advanced liquid cooling for AI and high-performance compute.",
  icons: {
    icon: "/assets/hyperkool/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a2540",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${ibmPlex.variable}`}>
      <body>
        <ConditionalSiteHeader />
        {children}
        <ScrollAnimations />
      </body>
    </html>
  );
}
