/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        'canvas': '#272F32',
        'background': '#9DBDC6',
        'background2': '#DAEAEF',
        'accent': '#FF3D2E',
      },
    },
    plugins: [],
  }