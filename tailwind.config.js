import defaultTheme from 'daisyui/src/theming/themes/light.js';

/** @type {import('tailwindcss').Config} */ 
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   
   daisyui: {
     themes: [
       {
         light: {
           ...defaultTheme,
           primary: "#27AAE1",
           secondary: "#091242",
         },
       },
     ],
   },
   
   theme: {
     extend: {
       container: {
         center: true,
       },
     },
   },
   
   plugins: [import('daisyui')],
};