/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: "#0B0C10",
          blue: "#1F2833",
          neon: "#66FCF1",
          purple: "#C3073F",
        },
      },
    },
  },
  plugins: [],
};
