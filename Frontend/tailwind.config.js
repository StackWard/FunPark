/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dana: ['dana', 'sans-serif'],
      },
      colors: {
        // primary: "#0e0e2c",
        // secondary: "#1e1e32"
        primary: "#111827",
        secondary: "#18212f"
      }
    },
  },
  plugins: [],
}