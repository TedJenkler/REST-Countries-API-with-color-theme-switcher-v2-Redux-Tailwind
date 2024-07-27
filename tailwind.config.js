/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'black': '#111517',
        'lightgrey': '#2B3844',
        'lightbg': '#FAFAFA',
        'darkbg': '#202C36',
        'lightergrey': '#2B3844'
      }
    },
  },
  plugins: [],
}