/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 8s ease-out',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'translateY(-75%)' },
          '33%': { transform: 'translateY(-50%)' },
          '67%': { transform: 'translateY(-25%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
