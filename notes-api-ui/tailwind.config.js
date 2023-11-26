/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    screens:{
      sm: "468px",
      md: "768px",
      lg: "992px",
      xl: "1024px",
      xxl: "1440px"
    },
    extend: {},
  },
  plugins: [],
}

