// Design tokens for BokarioV2
export const tokens = {
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
  spacing: {
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
    24: '24px',
    32: '32px',
    40: '40px',
    48: '48px',
    64: '64px',
    80: '80px',
    96: '96px',
  },
  shadows: {
    e1: 'var(--e1)',
    e2: 'var(--e2)',
    e3: 'var(--e3)',
  },
  radius: {
    12: '12px',
    999: '999px',
  },
  typography: {
    h1: 'clamp(40px,6vw,64px)',
    h2: 'clamp(28px,4.5vw,40px)',
    h3: '24px',
    lead: '20px',
    bodyL: '18px',
    body: '16px',
    caption: '14px',
  },
  layout: {
    maxContent: '1200px',
    maxGrid: '1440px',
    gutters: {
      mobile: '16px',
      desktop: '24px',
    },
  },
  motion: {
    ui: '160ms',
    overlay: '280ms',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  },
} as const

export type Tokens = typeof tokens
