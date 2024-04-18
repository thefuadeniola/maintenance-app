/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#0B5ED7',
        'primary-green' : '#32E12E',
        'primary-text': '#010B01',
        'secondary-text' : '#6F736E',
        'secondary-bg': '#F5FAF4',
        'primary-red': '#FF3023'

      }
    },
  },
  plugins: [],
}
