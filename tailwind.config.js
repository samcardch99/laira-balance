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
        'md-vertical': { raw: '(min-width: 768px) and (max-aspect-ratio: 1/1)' },
        'md-custom': '637px',
        'md-custom-lg': { raw: '(min-width: 768px) and (max-width: 1023px)' },
        'thin-screen': { raw: '(max-width: 370px)' },
      }
    },

  },
  plugins: [
    require('@tailwindcss/typography'),

  ],

}

