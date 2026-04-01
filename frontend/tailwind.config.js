/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],

  // Dark mode řízený CSS třídou na <html> elementu.
  // ThemeContext.jsx přidává/odebírá class `dark` na document.documentElement.
  // Anti-FOUC script v index.html aplikuje třídu synchronně před hydratací.
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ── Pozadí ──────────────────────────────────────────────────────────
        // Definováno jako CSS proměnné s alpha-value pro podporu modifikátorů
        // jako bg-bg-surface/90, bg-bg-base/50 atd.
        // Hodnoty RGB viz index.css (.dark a :root sekce).
        bg: {
          base:        'rgb(var(--rgb-bg-base)      / <alpha-value>)',
          surface:     'rgb(var(--rgb-bg-surface)   / <alpha-value>)',
          'surface-2': 'rgb(var(--rgb-bg-surface-2) / <alpha-value>)',
        },

        // ── Ohraničení ───────────────────────────────────────────────────────
        // Jako rgba CSS proměnné (nemají alpha-value modifier, jsou již rgba)
        border: {
          subtle:  'var(--color-border-subtle)',
          DEFAULT: 'var(--color-border)',
        },

        // ── Texty ────────────────────────────────────────────────────────────
        // Přepínají se mezi dark/light přes CSS proměnné
        text: {
          primary:   'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted:     'var(--color-text-muted)',
        },

        // ── Accent paleta ────────────────────────────────────────────────────
        // Zůstává stejná v obou módech (brand barvy)
        accent: {
          DEFAULT: '#560BAD',
          violet:  '#5110D3',
          purple:  '#7B2FBE',
          pink:    '#F72585',
          glow:    'rgba(86,11,173,0.15)',
        },
      },

      fontFamily: {
        sans:      ['Inter', 'system-ui', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
        signature: ['Quetine', 'cursive'],
        autograph: ['"Dancing Script"', 'cursive'],
      },

      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #560BAD 0%, #5110D3 100%)',
        'gradient-hero':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.18) 0%, transparent 70%)',
      },

      animation: {
        'fade-in':  'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },

  plugins: [],
}
