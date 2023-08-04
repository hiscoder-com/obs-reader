/** @type {import('tailwindcss').Config} */
import konstaConfig from 'konsta/config';
export default konstaConfig({
  konsta: {
    colors: {
      // "primary" is the main app color, if not specified will be default to '#007aff'
      primary: '#007aff',
      // custom colors used for Konsta UI components theming
      'brand-red': '#ff0000',
      'brand-green': '#00ff00',
    },
  },
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
