/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
    colors: {
      'white': '#EFEFEF',
      'yellow': '#CBA51D',
      'gray-100': '#929292',
      'gray-600': '#686868',
      'green': '#489347',
      'red': '#C14242',
      'background': '#1C1E21'
    },
  },
  plugins: [],
}

