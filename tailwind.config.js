/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutralSilver: "#F5F7FA",
        neutralDGrey: "#FFC232",
        brandPrimary: "#FF6B5B",
        neutralGrey: "#1B1B1B",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
