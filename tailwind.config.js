/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        riforma: ["Riforma"],
        sans: ["Riforma", "sans-serif"],
      },
      fontSize: {
        "8xl": "4.5rem",
        mainSize: "6.052rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
