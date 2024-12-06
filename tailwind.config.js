/** @type {import('tailwindcss').Config} */ 
export default {
  // Specify which files should be processed by Tailwind
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  // DaisyUI theme configuration
  daisyui: {
    themes: [
      {
        light: {
          // Extend the default light theme
          ...require("daisyui/src/theming/themes")["light"],
          // Custom primary color
          primary: "#27AAE1",
          // Custom secondary color
          secondary: "#091242",
        },
      },
    ],
  },
  
  // Extended Tailwind theme configuration
  theme: {
    extend: {
      // Center the container by default
      container: {
        center: true,
      },
    },
  },
  
  // Include DaisyUI plugin
  plugins: [require("daisyui")],
};