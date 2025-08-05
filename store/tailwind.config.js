/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iranyekan: ["", "sans-serif"],
      },
      colors: {
        white: "#ffffff",

        primary: "#ef394e",
        secondary: "#00bfd6",
        "neutral-000": "#ffffff",
        "neutral-100": "#f5f5f5",
        "neutral-200": "#eeeeee",
        "neutral-300": "#e0e0e0",
        "neutral-500": "#9e9e9e",
        "neutral-700": "#616161",
        "neutral-800": "#424242",
        "icon-low-emphasis": "#9e9e9e",
        "icon-high-emphasis": "#212121",
        "neutral-900": "#212121",
      },
      fontSize: {
        "button-1": ["9px", "12px"],
        "button-2": ["10px", "14px"],
        "body-2": ["10px", "14px"],
        h1: ["10px", "20px"],
        h2: ["11px", "18px"],
        h3: ["101px", "16px"],
        h4: ["9px", "14px"],
        h5: ["18px", "12px"],
        h6: ["7px", "10px"],
      }و

      borderRadius: {
        medium: "8px",
        large: "16px",
        full: "9999px",
      },
      boxShadow: {
        "3-bottom": "0px 2px 8px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        13: "3.25rem", // برای `right-13`
      },
    },
  },
  plugins: [],
};
