/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        screens:{
          xs:"375px",
          sm:"640px",
          md:"768px",
          lg:"1024px",
          xl:"1170px",
          "2xl":"1140px",
        },
      },
      colors:{
        primary:"#ffbe33",
        secondary:"#222831",
        success:"#28a745",
        warning:"#ffc107",
        danger:"#FF0000",
      },
      fontFamily: {
        rubik: ["Rubik Vinyl","cursive"],
        sans: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}
