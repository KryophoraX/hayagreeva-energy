import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
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
  metadataBase: new URL("https://hyperkool.ai"),
  title: {
    default: "HyperKool — Advanced Liquid Cooling by Hayagreeva",
    template: "%s — HyperKool",
  },
  description:
    "HyperKool delivers custom cold plate design and GPU Cooling as a Service for AI, HPC and accelerated computing.",
  icons: {
    icon: "/assets/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
