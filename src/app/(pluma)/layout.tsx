"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import SiteHeader from "@/components/SiteHeader";
import { useTheme } from "next-themes";
import { getFontPreference, applyFont } from "@/lib/preferences";
import { useEffect } from "react";

export default function PlumaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    const font = getFontPreference();
    applyFont(font);
  }, [setTheme]);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="w-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
