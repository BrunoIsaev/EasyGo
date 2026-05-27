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
        emerald: {
          DEFAULT: "#004D2C",
          light: "#006B3D",
          dark: "#003D22",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2A2A2A",
          muted: "#3D3D3D",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        card: "24px",
        pill: "9999px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
        card: "0 8px 32px rgba(0, 0, 0, 0.08)",
        float: "0 12px 40px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
