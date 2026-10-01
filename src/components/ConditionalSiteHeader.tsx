"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";

export default function ConditionalSiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <SiteHeader />;
}
