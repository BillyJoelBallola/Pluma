import { Bolt, CircleUserRound, LogOut } from "lucide-react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModeToggle from "./ModeToggle";
import { logout } from "@/app/actions/auth/logout";
import { useRouter } from "next/navigation";

export default function HeaderButtonMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <CircleUserRound className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuItem className="border-b rounded-none px-4" asChild>
          <Link href={"/notes"} className="grid">
            <p className="font-semibold font-lg">Username</p>
            <p className="text-sm -mt-3 text-gray-500">bjayballola@pluma.com</p>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem className="rounded-none px-4" asChild> */}
        <div className="flex items-center justify-between text-sm px-4 py-2">
          <p>Dark</p>
          <ModeToggle />
        </div>
        {/* </DropdownMenuItem> */}
        <DropdownMenuItem className="border-b rounded-none px-4" asChild>
          <Link
            href={"/settings"}
            className="w-full flex items-center justify-between"
          >
            <p>Settings</p>
            <Bolt />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-none px-4" asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-full flex items-center justify-between font-normal"
            onClick={() => logout(router)}
          >
            <p>Logout</p>
            <LogOut />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
