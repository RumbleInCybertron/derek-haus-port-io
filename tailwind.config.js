/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js, ts, jsx, tsx}",
    "./pages/**/*.{js, ts, jsx, tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ad20c9",
        secondary: "#e60e84"
      }
    },
  },
  plugins: [],
};
