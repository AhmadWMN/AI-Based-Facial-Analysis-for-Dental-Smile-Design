import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f8ff",
          100: "#e6f1ff",
          200: "#c9e2ff",
          300: "#99c8ff",
          400: "#64a8ff",
          500: "#3b87f2",
          600: "#216cd8",
          700: "#1e56b5",
          800: "#1f4893",
          900: "#1f3f79"
        }
      },
      boxShadow: {
        soft: "0 10px 30px -18px rgba(30, 86, 181, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
