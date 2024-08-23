/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors:{
        secondaryText:"#6b7280"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
