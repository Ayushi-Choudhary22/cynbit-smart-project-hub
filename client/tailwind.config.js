/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cynbit-teal': '#006067',
        'cynbit-cyan': '#0d9488',
        'cynbit-sky': '#0284c7',
        'cynbit-dark': '#070d0f',
        'cynbit-card': '#121e22',
        'cynbit-light': '#f8fafc',
        cynbit: {
          teal: '#006067',
          cyan: '#0d9488',
          sky: '#0284c7',
          dark: '#070d0f',
          card: '#121e22',
          light: '#f8fafc',
        },
        primary: {
          DEFAULT: '#006067',
          hover: '#004c52',
          container: '#004348',
          light: '#007a83',
          dim: '#80d5dd',
          fixed: '#a0eff8',
        },
        secondary: {
          DEFAULT: '#0284c7',
          hover: '#0369a1',
          container: '#075985',
          light: '#38bdf8',
          fixed: '#bae6fd',
        },
        tertiary: {
          DEFAULT: '#0d9488',
          hover: '#0f766e',
          container: '#115e59',
          fixed: '#99f6e4',
          'on-fixed': '#003734',
        },
        accent: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          light: '#a78bfa',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#070d0f',
          container: '#f8fafc',
          'container-low': '#fbfcfd',
          'container-high': '#eef2f6',
          'container-highest': '#e2e8f0',
          'dark-container': '#0e171a',
          'dark-card': '#121e22',
        },
        'on-surface': {
          DEFAULT: '#0f172a',
          dark: '#f1f5f9',
          variant: '#475569',
          'dark-variant': '#94a3b8',
        },
      },
      fontFamily: {
        headline: ['Outfit', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        sunlight: '0 20px 50px rgba(0, 96, 103, 0.12)',
        glow: '0 0 40px rgba(0, 96, 103, 0.25)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
