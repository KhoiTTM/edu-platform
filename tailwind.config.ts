import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        surface: {
          DEFAULT: "var(--background)",
          raised: "var(--card)",
        },
        ink: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },
        line: "var(--border)",
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          coral: "#fb7185",
          mint: "#34d399",
          amber: "#fbbf24",
        },
      },
      boxShadow: {
        card: "0 4px 24px -4px rgb(15 23 42 / 0.08)",
        "card-lg": "0 12px 40px -8px rgb(15 23 42 / 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
