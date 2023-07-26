/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      1: "#27374D",
      2: "#526D82",
      3: "#9DB2BF",
      4: "#DDE6ED",
      5: "#FFF",
    },
    extend: {
      backgroundImage: {
        my_background_image: "url('../public/bg-image.png')",
      },
    },
  },
  plugins: [],
};
