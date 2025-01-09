/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container:{
        maxHeight: {
          'chat': 'calc(100vh - 8rem)',
        },
        center:true,
        padding:{
          DEFAULT: "1rem",
          sm:"2rem"
        }
      }
    },
  },
  plugins: [],
}
