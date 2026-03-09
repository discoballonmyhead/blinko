/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#030814',
        'brand-deep': '#020710',
        'brand-cyan': '#00C2FF',
        'brand-blue': '#0066FF',
        'brand-green': '#00FFB2',
        'brand-panel': '#080f1f',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0,194,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0,194,255,0.7)' },
        },
      },
    },
  },
  plugins: [],
}
