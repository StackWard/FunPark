/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      fontFamily: {
        dana: ['dana', 'sans-serif'],
      },
      colors: {
        primary: "#111827",
        secondary: "#18212f"
      }
    },
  },
  plugins: [],
}