"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderButtonMenu from "@/components/HeaderButtonMenu";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserSchemaType } from "@/zod-schemas/users";
import { getUserById } from "@/app/actions/users/getUserById";

export default function SiteHeader() {
  const pathname = usePathname();
  const headerName = pathname.split("/")[1];
  const [userData, setUserData] = useState<UserSchemaType | undefined>();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear justify-between px-4">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* TODO: dynamic headers */}
        <h1 className="text-base font-medium">
          {headerName.includes("notes")
            ? "Notes"
            : headerName.includes("archives")
            ? "Archived Notes"
            : headerName.includes("settings")
            ? "Settings"
            : "Pluma"}
        </h1>
      </div>
      {userData && <HeaderButtonMenu data={userData} />}
    </header>
  );
}
