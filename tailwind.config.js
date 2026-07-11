/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        samurai: {
          red: '#E10600',
          accent: '#FF3B30',
          black: '#080808',
          ink: '#111111',
          card: '#151515',
          border: '#2A2A2A',
          muted: '#A7A7A7',
        },
      },
      fontFamily: {
        display: ['Anton', 'Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        red: '0 0 42px rgba(225, 6, 0, 0.28)',
        panel: '0 28px 90px rgba(0, 0, 0, 0.38)',
      },
    },
  },
  plugins: [],
}
