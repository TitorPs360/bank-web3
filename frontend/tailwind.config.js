/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logo_orange: '#ff6600',
        background_color: '#181d23',
      },
    },
  },
  plugins: [],
};
