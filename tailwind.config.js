/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'neo': '4px 4px 0px #000',
        'neo-sm': '1px 1px 0px #000',
        'neo-lg': '8px 8px 0px #000',
      },
      keyframes: {
        // ... (keep the other keyframes: shine, shake, etc.)
        'slide-in': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-grow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        sway: {
          '0%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(-1deg)' },
        },
        // NEW KEYFRAMES ADDED HERE
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-out': {
          'from': {
            opacity: '1',
          },
          'to': {
            opacity: '0',
          },
        }
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out forwards',
        'pulse-grow': 'pulse-grow 3s infinite',
        sway: 'sway 8s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}