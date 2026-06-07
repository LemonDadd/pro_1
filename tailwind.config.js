/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
    extend: {
      colors: {
        wood: {
          50: '#FAF7F2',
          100: '#F5EFE6',
          200: '#E8DFD0',
          300: '#D4C4A8',
          400: '#C4A77D',
          500: '#B08968',
          600: '#8B5A2B',
          700: '#6B4423',
          800: '#4A2E17',
          900: '#2D2420',
        },
        wine: {
          50: '#FDF2F3',
          100: '#FBE6E8',
          200: '#F5C7CC',
          300: '#E89AA2',
          400: '#D96B75',
          500: '#C94855',
          600: '#A83240',
          700: '#722F37',
          800: '#5A262C',
          900: '#3D1A1E',
        },
        cream: {
          50: '#FFFEFC',
          100: '#FFFDF8',
          200: '#FFF9EE',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(45, 36, 32, 0.1)',
        'softer': '0 2px 10px -1px rgba(45, 36, 32, 0.08)',
        'warm': '0 8px 30px -4px rgba(139, 90, 43, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
