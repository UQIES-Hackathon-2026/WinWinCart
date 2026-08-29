/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        forest: '#084E46',
        lime: '#91EF5B',
        rule: '#E5E5E5',
        mute: '#6B6B6B',
        sunk: '#FAFAFA',
        cream: '#F5EFE1',
        mint: '#EAF6EC',
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        display: ['Sirage', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
