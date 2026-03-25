import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input:  "oklch(var(--input))",
        ring:   "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground:  "oklch(var(--foreground))",
        primary: {
          DEFAULT:    "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT:    "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT:             "oklch(var(--sidebar))",
          foreground:          "oklch(var(--sidebar-foreground))",
          primary:             "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent:              "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border:              "oklch(var(--sidebar-border))",
          ring:                "oklch(var(--sidebar-ring))",
        },
        // Aqua / teal scale for direct utility use
        aqua: {
          50:  "oklch(0.97 0.025 200)",
          100: "oklch(0.93 0.055 195)",
          200: "oklch(0.86 0.095 193)",
          300: "oklch(0.78 0.130 191)",
          400: "oklch(0.68 0.155 190)",
          500: "oklch(0.56 0.160 195)",
          600: "oklch(0.48 0.145 196)",
          700: "oklch(0.40 0.120 198)",
          800: "oklch(0.30 0.090 200)",
          900: "oklch(0.20 0.055 202)",
        },
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif:   ['Georgia', 'serif'],
      },
      borderRadius: {
        lg:  "var(--radius)",
        md:  "calc(var(--radius) - 2px)",
        sm:  "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card:        "0 2px 8px -2px rgba(0,0,0,0.07), 0 4px 16px -4px rgba(0,0,0,0.05)",
        "card-hover": "0 8px 24px -4px rgba(0,0,0,0.14), 0 16px 40px -8px rgba(0,0,0,0.10)",
        "glow-sm":   "0 0 16px oklch(0.56 0.16 195 / 0.28)",
        "glow-md":   "0 0 32px oklch(0.56 0.16 195 / 0.40)",
        "glow-lg":   "0 0 48px oklch(0.56 0.16 195 / 0.50)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
