const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "var(--background)",
        rose: colors.rose,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
