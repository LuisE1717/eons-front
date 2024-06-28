/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#d161b4",
      },
      backgroundImage: { triangle: "url('/triangle.webp')" },
    },
  },
  plugins: [],
};
