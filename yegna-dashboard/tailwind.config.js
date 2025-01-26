import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

export const darkMode = "class";
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        light: "#4f46e5", // Example light mode primary color
        dark: "#1d4ed8", // Example dark mode primary color
      },
      secondary: {
        light: "#fbbf24", // Example light mode secondary color
        dark: "#f59e0b", // Example dark mode secondary color
      },
      background: {
        light: "#ffffff", // Light mode background
        dark: "#0E0817", // Dark mode background
      },
      text: {
        light: "#111827", // Light mode text
        dark: "#f9fafb", // Dark mode text
      },
    },
    fontFamily: {
      sans: ["Roboto", ..._fontFamily.sans], // Set Roboto as the default sans font
    },
  },
};
export const plugins = [require("@tailwindcss/typography")];
