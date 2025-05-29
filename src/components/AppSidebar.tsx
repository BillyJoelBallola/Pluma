"use client";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { ChevronRight, House, Archive, Tag, Bolt } from "lucide-react";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "All Notes",
    href: "/notes",
    icon: House,
  },
  {
    title: "Archived Notes",
    href: "/archives",
    icon: Archive,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Bolt,
  },
];

const tags = [
  {
    title: "Frontend",
    href: "/notes",
  },
  {
    title: "Backend",
    href: "/notes",
  },
  {
    title: "Nextjs",
    href: "/notes",
  },
  {
    title: "Typescript",
    href: "/notes",
  },
];

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoSrc = !mounted
    ? "/logo_dark.png"
    : theme === "light"
    ? "/logo_dark.png"
    : "/logo_light.png";

  return (
    <Sidebar
      className="hidden md:block px-4 py-4 sm:py-2"
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Image src={logoSrc} width={110} height={110} alt="Logo" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarGroupContent className="mt-4">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className="flex justify-between items-center"
                  >
                    <div
                      className={`flex gap-2 items-center ${
                        isActive && "font-semibold"
                      }`}
                    >
                      <item.icon
                        className={`size-5 ${isActive && "text-blue-700"}`}
                      />
                      <span>{item.title}</span>
                    </div>
                    {isActive && <ChevronRight />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <Separator
          orientation="horizontal"
          className="my-4 data-[orientation=horizontal]:h-[.1rem]"
        />
        <SidebarMenu>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          {tags.map((tag) => {
            return (
              <SidebarMenuItem key={tag.title}>
                <SidebarMenuButton asChild>
                  <Link href={tag.href} className="flex items-center">
                    <Tag className="size-8" />
                    <span>{tag.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
      {/* <SidebarFooter></SidebarFooter> */}
    </Sidebar>
  );
}
