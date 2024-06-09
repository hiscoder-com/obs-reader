/** @type {import('tailwindcss').Config} */
import konstaConfig from 'konsta/config';
export default konstaConfig({
  konsta: {
    colors: {
      primary: '#506567',
      // custom colors used for Konsta UI components theming
      'brand-red': '#ff0000',
    },
  },
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'figma-bg-light': '#f0ecea',
        'figma-bg-card-light': '#f8f8f8',
        'figma-border-light': '#cccbca',
        'figma-text-light': '#1e1e1e',
        'figma-text-disabled-light': '#8b898e',
        'figma-bg-dark': '#191513',
        'figma-bg-card-dark': '#2b221c',
        'figma-border-dark': '#474442',
        'figma-text-dark': '#ffffff',
        'figma-text-disabled-dark': '#999999',
      },
    },
  },
  plugins: [],
});
