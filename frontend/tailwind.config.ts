import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'white': '#EFEFEF',
      'yellow': '#CBA51D',
      'gray-100': '#929292',
      'gray-600': '#686868',
      'green': '#489347',
      'red': '#C14242',
      'background': '#1C1E21'
    },
    extend: {},
  },
  plugins: [],
}
export default config
