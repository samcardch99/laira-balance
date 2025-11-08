/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#efeceb',
        pinkCustom: '#c4ab9e',
        darkPink: '#a78270',
      },
      screens: {
        'thin-screen': { raw: '(max-width: 370px)' },
        'md-vertical': { raw: '(min-width: 768px) and (max-aspect-ratio: 1/1)' },
        'md-custom': '637px',
        'md-custom-lg': { raw: '(min-width: 768px) and (max-width: 1023px)' },
        'md-860px': '860px',
        '2xl-prev': '1440px', // Define un nuevo breakpoint para un ancho mínimo de 2000px
        '2xl-custom': '2000px', // Define un nuevo breakpoint para un ancho mínimo de 2000px
        '3xl-custom': '3200px', // Define un nuevo breakpoint para un ancho mínimo de 3200px
      }
    },

  },
  plugins: [
    require('@tailwindcss/typography'),

  ],

}

