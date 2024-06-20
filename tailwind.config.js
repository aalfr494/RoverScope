/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Change the default text color to your desired color
        'text-default': '#000', // Replace '#333333' with your preferred color code
      },
    },
  },
  plugins: [],
};
