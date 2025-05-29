"use client";

import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="relative inline-flex h-4 w-6 focus:outline-none rounded-full"
      onClick={() => {
        theme === "light" ? setTheme("dark") : setTheme("light");
      }}
    >
      <div
        className={`${
          theme === "light"
            ? "translate-x-[-7px] bg-white"
            : "translate-x-[7px] bg-blue-800"
        } size-3 absolute rounded-full transition-all duration-150`}
      />
    </Button>
  );
}
