import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
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
    default: "Hayagreeva Energy — Advanced AI Thermal Engineering",
    template: "%s — Hayagreeva Energy",
  },
  description:
    "Advanced direct-to-chip liquid cooling engineered for the extreme thermal demands of AI, HPC and accelerated computing.",
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
      </body>
    </html>
  );
}
