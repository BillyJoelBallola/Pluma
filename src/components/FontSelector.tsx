"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { fonts, FontKey } from "@/lib/fonts";

const fontOptions: Record<FontKey, string> = {
  inter: "Inter",
  roboto: "Roboto",
  openSans: "Open Sans",
  pattaya: "Pattaya",
  playball: "PlayBall",
};

export default function FontSelector({
  handleFontChange,
  font,
}: {
  handleFontChange: (newFont: FontKey) => void;
  font: FontKey;
}) {
  return (
    <div className="grid gap-2">
      <label className="font-semibold">Font</label>
      <Select
        value={font}
        onValueChange={(e) => handleFontChange(e as FontKey)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fontOptions).map(([key, name]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-gray-500">
        Set the font you want to use in the web application.
      </p>
    </div>
  );
}
