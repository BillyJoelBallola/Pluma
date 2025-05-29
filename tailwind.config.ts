import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
        roboto: ["var(--font-roboto)"],
        opensans: ["var(--font-opensans)"],
        pattaya: ["var(--font-pattaya)"],
        playball: ["var(--font-playball)"],
      },
    },
  },
  plugins: [],
};

export default config;
