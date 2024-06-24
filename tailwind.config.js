/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orgColor: "#38BDF8",
        orgBlack: "#374151",
        orgDark: "#0f172a",
      },
    },
  },
  plugins: [],
};
