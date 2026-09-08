/**
 * Design tokens mirror — Tailwind v4 reads from CSS `@theme` in styles/tokens.css.
 * This file documents the token contract for the design system and tooling.
 */
export const designTokens = {
  colors: {
    primary: {
      deep: '#0B3D91',
      DEFAULT: '#1656C9',
      soft: '#E8F0FE',
    },
    accent: {
      DEFAULT: '#FF7A30',
      warm: '#F5821F',
    },
    surface: {
      DEFAULT: '#FFFFFF',
      muted: '#FAFAFA',
    },
    ink: {
      DEFAULT: '#1A1A1A',
      soft: '#2E2E2E',
      muted: '#6B7280',
    },
    border: '#E5E7EB',
  },
  fontFamily: {
    display: ['Fraunces', 'Georgia', 'serif'],
    sans: ['Outfit', 'system-ui', 'sans-serif'],
  },
  spacing: {
    section: '6rem',
    sectionLg: '8rem',
    gutter: '1.5rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    lg: '1.25rem',
  },
} as const

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: designTokens.colors,
      fontFamily: designTokens.fontFamily,
      spacing: designTokens.spacing,
      borderRadius: designTokens.radius,
    },
  },
}
