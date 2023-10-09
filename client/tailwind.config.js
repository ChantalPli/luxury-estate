/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'font-one': 'Allura',
        'font-two': 'Cinzel',
        'font-three': '"Cinzel Decorative"',
        'font-four': 'Italiana',
        'font-five': '"Poiret One',
        'font-six': '"Pragati Narrow"',
        'font-seven': 'Sacramento'
      }
    }
  },
  plugins: []
}
