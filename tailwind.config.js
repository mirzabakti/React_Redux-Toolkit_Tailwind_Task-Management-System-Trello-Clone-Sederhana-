/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tentukan file yang akan di-scan Tailwind
  darkMode: false, // atau 'media' atau 'class'
  theme: {
    extend: {},
  },
  plugins: [],
}

