/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Pozadí stránky
        bg: {
          base: '#0a0a0f',
          surface: '#111118',
          'surface-2': '#1a1a24',
        },
        // Jemné ohraničení
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.10)',
        },
        // Akcentová paleta (dark purple → neon pink)
        accent: {
          DEFAULT: '#560BAD',
          violet: '#5110D3',
          purple: '#7B2FBE',
          pink: '#F72585',
          glow: 'rgba(86,11,173,0.15)',
        },
        // Textová hierarchie
        text: {
          primary: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#475569',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        signature: ['Quetine', 'cursive'],             // Quetine jako hlavní signature font
        autograph: ['"Dancing Script"', 'cursive'], // fallback / alternativní handwriting
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #560BAD 0%, #5110D3 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.18) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
