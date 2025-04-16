// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,vue,html}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './app/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      colors: {
        whale: {
          100: '#DCE3E7',
          200: '#BCC9D0',
          300: '#99AEB9',
          400: '#7492A2',
          500: '#54778A',
          600: '#3C5C6E',
          700: '#2A4454',
          800: '#1B2E3B',
          900: '#101C25',
          950: '#0A1217',
        }
      }
    }
  },
  plugins: []
}
