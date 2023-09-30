/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: {
        xl: "1350px",
      },
      colors: {
        "light-blue": "#DEE6ED",
        "dark-blue": "#394D60",
        "very-dark-blue": "#263140",
        "middle-blue": "#849AAD",
        "orange-btn": "#D8973C",
      },
      margin: {
        "desktop-margin": "10vw",
      },
    },
  },
  plugins: [],
};
