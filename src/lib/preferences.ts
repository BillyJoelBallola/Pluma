import { fonts, FontKey } from "@/lib/fonts";

export type PreferenceType = {
  font: FontKey;
};

export const applyFont = (font: FontKey) => {
  Object.values(fonts).forEach(({ className }) =>
    document.body.classList.remove(className)
  );
  document.body.classList.add(fonts[font].className);
};

export const saveFontPreference = (font: FontKey) => {
  localStorage.setItem("font", font);
};

export const getFontPreference = (): FontKey => {
  if (typeof window === "undefined") return "inter";
  const font = localStorage.getItem("font");
  return (font as FontKey) || "inter";
};
