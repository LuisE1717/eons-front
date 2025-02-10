/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  important: true,
  theme: {
    screens: {
      'phone': '320px',
      // => @media (min-width: 320px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
      
      'lg': {'min': '1024px'},
    },
    extend: {
      colors: {
        primary: "#d161b4",
        secundary:"#2563eb",
        secundary2:"#f0abfc",
      },
      backgroundImage: { triangle: "url('/triangle.webp')" },
    },
  },
  plugins: [],
};
