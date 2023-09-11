/** @type {import('tailwindcss').Config} */
import konstaConfig from 'konsta/config';
export default konstaConfig({
  konsta: {
    colors: {
      primary: '#007aff',
      // custom colors used for Konsta UI components theming
      'brand-red': '#ff0000',
    },
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
