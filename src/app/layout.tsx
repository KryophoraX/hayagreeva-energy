import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import ScrollAnimations from "@/components/ScrollAnimations";
import SiteHeader from "@/components/SiteHeader";
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
    default: "Hayagreeva Energy — AI Thermal Engineering as a Service",
    template: "%s — Hayagreeva Energy",
  },
  description:
    "Hayagreeva delivers direct-to-chip liquid cooling as a service for AI, HPC and accelerated computing — design, validation, deployment and operations.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sora.variable} ${ibmPlex.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <ScrollAnimations />
      </body>
    </html>
  );
}
