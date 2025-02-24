const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.tsx', flowbite.content()],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          sans: ['Lato', 'sans-serif']
        }
      }
    }
  },
  plugins: [flowbite.plugin()]
};
