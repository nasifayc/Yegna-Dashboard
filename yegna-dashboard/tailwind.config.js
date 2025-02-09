import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

export const darkMode = "class";
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        light: "#49a850",
        dark: "#1d4ed8",
      },
      secondary: {
        light: "#fbbf24",
        dark: "#f59e0b",
      },
      background: {
        light: "#ffffff",
        dark: "#0E0817",
      },
      text: {
        light: "#111827",
        dark: "#f9fafb",
      },
    },
    fontFamily: {
      sans: ["Marcellus", "Roboto", ..._fontFamily.sans],
    },
  },
};
export const plugins = [
  require("@tailwindcss/typography"),
  require("tailwind-scrollbar-hide"),
];
