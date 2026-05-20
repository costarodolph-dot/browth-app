import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E8181A",
          "red-hover": "#C41214",
        },
        surface: {
          DEFAULT: "#FFF8F7",
          white: "#FFFFFF",
          low: "#FFF0EF",
          container: "#FFE9E6",
        },
        text: {
          primary: "#0A0A0A",
          secondary: "#6B6B6B",
          tertiary: "#ABABAB",
        },
        status: {
          success: "#16A34A",
          warning: "#CA8A04",
          info: "#2563EB",
          error: "#BA1A1A",
        },
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        arimo: ["Arimo", "sans-serif"],
        archivo: ["'Archivo Narrow'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(0,0,0,0.06)",
        "red-glow": "0 0 8px rgba(232,24,26,0.25)",
        card: "0 1px 4px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
