/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkRed: "#401b1b",
        mutedRed: "#72383d",
        warmBrown: "#ab644b",
        mutedTeal: "#9cabb4",
        lightGray: "#d2dce6",
        offWhite: "#f2f2eb",
      },
    },
  },
  plugins: [],
};
