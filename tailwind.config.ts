import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
        },
        ink: {
          950: 'var(--ink-950)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
        },
        mist: {
          50: 'var(--mist-050)',
          100: 'var(--mist-100)',
          200: 'var(--mist-200)',
          300: 'var(--mist-300)',
        },
        line: 'var(--line)',
        success: 'var(--success)',
        gold: 'var(--gold)',
        white: 'var(--white)',
        black: 'var(--black)',
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        'h1': ['clamp(40px,6vw,64px)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['clamp(28px,4.5vw,40px)', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        'lead': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-l': ['18px', { lineHeight: '1.6', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '500' }],
        'caption': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '64': '64px',
        '80': '80px',
        '96': '96px',
      },
      borderRadius: {
        '12': '12px',
        'pill': '9999px',
      },
      boxShadow: {
        'e1': 'var(--e1)',
        'e2': 'var(--e2)',
        'e3': 'var(--e3)',
      },
      transitionDuration: {
        '160': '160ms',
        '280': '280ms',
      },
      maxWidth: {
        'content': '1200px',
        'grid': '1440px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '16px',
          lg: '24px',
        },
        screens: {
          lg: '1200px',
        },
      },
    },
  },
  plugins: [],
}

export default config
