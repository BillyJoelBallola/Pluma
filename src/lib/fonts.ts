import { Inter, Roboto, Open_Sans, Pattaya, Playball } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const playball = Playball({
  subsets: ["latin"],
  variable: "--font-playball",
  weight: ["400"],
});

export const pattaya = Pattaya({
  subsets: ["latin"],
  variable: "--font-pattaya",
  weight: "400",
});

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
});

export const fonts = {
  inter,
  roboto,
  openSans,
  pattaya,
  playball,
} as const;

export type FontKey = keyof typeof fonts;
