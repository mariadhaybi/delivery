/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F26522", // orange
        primarySoft: "#FFE3D3",
        dark: "#2D2D2D",
      },
    },
  },
  plugins: [],
};

