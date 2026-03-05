/** @type {import('tailwindcss').Config} */
module.exports = {
  // Toggle dark mode via a class on <html>
  darkMode: 'class',

  // Scan all HTML and JS files so Tailwind only ships used classes
  content: [
    './*.html',
    './products/**/*.html',
    './js/**/*.js',
    './public/js/**/*.js',
  ],

  theme: {
    extend: {
      // ---- Colors mapped to CSS Custom Properties ----
      // The ({ opacityValue }) callback enables opacity modifiers like
      // bg-accent/10, text-accent/80, etc. at build time.
      colors: {
        accent: ({ opacityValue }) =>
          opacityValue !== undefined
            ? `rgba(var(--color-accent-rgb), ${opacityValue})`
            : 'var(--color-accent)',

        surface:           'var(--color-bg-primary)',
        'surface-secondary': 'var(--color-bg-secondary)',
        'surface-tertiary':  'var(--color-bg-tertiary)',

        content:           'var(--color-text-primary)',
        'content-secondary': 'var(--color-text-secondary)',
        muted:             'var(--color-text-muted)',

        border:            'var(--color-border)',
      },

      // ---- Typography ----
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },

      // ---- Keyframe Animations ----
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.65s ease-out forwards',
        'fade-in':    'fadeIn 0.45s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },

  plugins: [],
};
