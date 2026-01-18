/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mid_blue: "#1e3a8a", // Medical Blue
        light_blue: "#dbeafe",
      },
    },
  },
  plugins: [],
}
