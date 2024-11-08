/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // Si estás usando Next.js 13+ con la carpeta "app"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
