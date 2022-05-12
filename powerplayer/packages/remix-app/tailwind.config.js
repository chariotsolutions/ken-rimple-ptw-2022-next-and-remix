const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    // fontFamily: {
    //   serif: ['Cardo', 'serif'],
    //   sans: ['Oswald', 'sans-serif']
    // },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tw-elements/dist/plugin'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': {fontSize: theme('fontSize.4xl')},
        'h2': {fontSize: theme('fontSize.xl')},
        'h3': {fontSize: theme('fontSize.lg')},
        'h4': {fontSize: theme('fontSize.md')},
      })
    })
  ],
}
