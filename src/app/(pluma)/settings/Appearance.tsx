"use client";

import { useEffect, useState } from "react";
import SettingHeader from "@/app/(pluma)/settings/SettingHeader";
import FontSelector from "@/components/FontSelector";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FontKey } from "@/lib/fonts";
import { saveFontPreference, applyFont } from "@/lib/preferences";
import { toast } from "sonner";

export default function Appearance() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [preferences, setPreferences] = useState<{
    selectedTheme?: string;
    font: FontKey;
  }>({
    selectedTheme: "",
    font: "inter",
  });

  const handleSelectingTheme = (t: string) => {
    setPreferences((current) => ({
      selectedTheme: t,
      font: current.font,
    }));
  };

  const handleFontChange = (newFont: FontKey) => {
    setPreferences((current) => ({
      selectedTheme: current.selectedTheme,
      font: newFont,
    }));
    localStorage.setItem("font", newFont);
  };

  const handleUpdatePreferences = () => {
    setTheme(preferences.selectedTheme!);
    applyFont(preferences.font);
    saveFontPreference(preferences.font);
    toast.success("Preferences saved successfully");
  };

  useEffect(() => {
    setMounted(true);

    const userPrefFont = localStorage.getItem("font");

    if (userPrefFont) {
      try {
        setPreferences({
          selectedTheme: theme,
          font: (userPrefFont as FontKey) || "inter",
        });
      } catch (e) {
        console.error("Failed to parse user preferences", e);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <SettingHeader
        title="Appearance"
        description="Customize the appearance of the app. Automatically switch between day and night themes."
      />
      <div className="grid gap-4 mt-4">
        <FontSelector
          handleFontChange={handleFontChange}
          font={preferences.font}
        />
        <div>
          <div>
            <h2 className="font-semibold">Theme</h2>
            <p className="text-gray-500">
              Select the theme of the web application.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            {/* light */}
            <button
              className="text-center grid gap-2 cursor-pointer"
              onClick={() => handleSelectingTheme("light")}
            >
              <div
                className={`${
                  preferences.selectedTheme === "light" && "outline-blue-700"
                } outline-2 bg-transparent p-1 rounded-sm w-48`}
              >
                <div className="bg-gray-200 grid gap-2 rounded-sm p-2">
                  <div className="bg-white grid gap-1 p-2 rounded-sm">
                    <div className="bg-gray-200 w-20 py-1 rounded-sm" />
                    <div className="bg-gray-200 w-28 py-1 rounded-sm" />
                  </div>
                  <div className="bg-white flex items-center gap-2 p-2 rounded-sm">
                    <div className="bg-gray-200 size-4 rounded-full" />
                    <div className="bg-gray-200 w-24 h-2 rounded-sm" />
                  </div>
                  <div className="bg-white flex items-center gap-2 p-2 rounded-sm">
                    <div className="bg-gray-200 size-4 rounded-full" />
                    <div className="bg-gray-200 w-24 h-2 rounded-sm" />
                  </div>
                </div>
              </div>
              <span
                className={`${
                  preferences.selectedTheme === "light" && "text-blue-700"
                } font-semibold text-sm`}
              >
                Light
              </span>
            </button>

            {/* dark */}
            <button
              className="text-center grid gap-2 cursor-pointer"
              onClick={() => handleSelectingTheme("dark")}
            >
              <div
                className={`${
                  preferences.selectedTheme === "dark" && "outline-blue-700"
                } outline-2 bg-transparent p-1 rounded-sm w-48`}
              >
                <div className="bg-gray-900 grid gap-2 rounded-sm p-2">
                  <div className="bg-gray-800 grid gap-1 p-2 rounded-sm">
                    <div className="bg-gray-500 w-20 py-1 rounded-sm" />
                    <div className="bg-gray-500 w-28 py-1 rounded-sm" />
                  </div>
                  <div className="bg-gray-800 flex items-center gap-2 p-2 rounded-sm">
                    <div className="bg-gray-500 size-4 rounded-full" />
                    <div className="bg-gray-500 w-24 h-2 rounded-sm" />
                  </div>
                  <div className="bg-gray-800 flex items-center gap-2 p-2 rounded-sm">
                    <div className="bg-gray-500 size-4 rounded-full" />
                    <div className="bg-gray-500 w-24 h-2 rounded-sm" />
                  </div>
                </div>
              </div>
              <span
                className={`${
                  preferences.selectedTheme === "dark" && "text-blue-700"
                } font-semibold text-sm`}
              >
                Dark
              </span>
            </button>
          </div>
        </div>
        <Button
          className="mt-4 max-w-fit cursor-pointer"
          onClick={() => handleUpdatePreferences()}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
