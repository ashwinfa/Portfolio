/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#06040f",
        secondary: "#7b7599",
        tertiary: "#0c0820",
        "black-100": "#0a0818",
        "black-200": "#06040f",
        "white-100": "#f0eeff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(124,58,237,0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
      fontFamily: {
        clash: ["Clash Grotesk", "sans-serif"],
        display: ["Clash Display", "Clash Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
