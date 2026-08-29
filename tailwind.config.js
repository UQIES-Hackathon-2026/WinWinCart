/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        forest: 'var(--forest)',
        lime: 'var(--lime)',
        rule: 'var(--rule)',
        mute: 'var(--mute)',
        sunk: 'var(--sunk)',
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        display: ['Sirage', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
