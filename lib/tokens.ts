export const tokens = {
  colors: {
    // Background palette
    'bg-page': '#0A0A0A',
    'surface': '#1A1A1A',
    'line': '#2A2A2A',
    'ink': '#FFFFFF',
    'ink-dim': '#A0A0A0',
    
    // Accent colors
    'blue': '#3B82F6',
    'teal': '#17B6A5',
    'gold': '#F59E0B',
    'purple': '#8B5CF6',
  },
  
  gradients: {
    'primary': 'linear-gradient(135deg, #3B82F6 0%, #17B6A5 50%, #8B5CF6 100%)',
    'royal': 'linear-gradient(135deg, #1B2FFF 0%, #6D32FF 48%, #B86BFF 100%)',
    'gold': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    'ink': 'linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,0))',
  },
  
  shadows: {
    's1': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    's2': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    's3': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  spacing: {
    'section': '6rem',
    'container-bk': '1.5rem',
  },
  
  radius: {
    'card': '0.75rem',
    'pill': '9999px',
  },
  
  motion: {
    'ui': '220ms',
    'overlay': '360ms',
  },
  
  layout: {
    'content-max': '1200px',
    'grid-max': '1440px',
    'gutter-mobile': '16px',
    'gutter-desktop': '24px',
  }
} as const;

export type TokenKey = keyof typeof tokens;
