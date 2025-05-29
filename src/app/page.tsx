"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
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
    <div className="grid place-items-center h-dvh w-wvh">
      <main className="grid gap-8">
        <Image src={logoSrc} alt="Logo" width={200} height={200} />
        <Button variant="default" asChild>
          <Link href="/login" className="flex gap-2 items-center">
            Get Started
            <ArrowRight />
          </Link>
        </Button>
      </main>
    </div>
  );
}
