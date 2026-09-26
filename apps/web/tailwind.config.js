/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === PALETTE AFRIBIZ ARCHITECT ===
        // Fonds
        ivory:    '#FFFBF5',
        surface:  '#FFFFFF',
        // Forêt sombre (hero, sidebar)
        forest: {
          DEFAULT: '#102D26',
          light:   '#183D33',
          deep:    '#0A1E1A',
        },
        // Vert de marque
        brand: {
          DEFAULT: '#059669',
          dark:    '#047857',
          light:   '#10B981',
          muted:   '#D1FAE5',
        },
        // Or (accent)
        gold: {
          DEFAULT: '#C79A45',
          light:   '#E8C880',
          muted:   '#FEF3C7',
        },
        // Texte
        slate: {
          900: '#0F172A',
          600: '#5B6472',
          400: '#94A3B8',
          200: '#E2E8F0',
        },
        // Bordures
        border: {
          DEFAULT: '#E8E2D8',
          dark:    '#D4CFC8',
        },
        // États
        error:   '#B91C1C',
        success: '#059669',
        warning: '#D97706',
        // Rétrocompatibilité Tailwind neutral
        neutral: {
          50:  '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'hero':  ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '66': '16.5rem',
        '72': '18rem',
        'sidebar': '264px',
      },
      maxWidth: {
        'content': '1320px',
      },
      borderRadius: {
        'card':   '16px',
        'input':  '12px',
        'badge':  '9999px',
        'dialog': '16px',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)',
        'card-hover': '0 4px 12px rgba(15,23,42,0.08), 0 8px 32px rgba(15,23,42,0.06)',
        'brand':      '0 0 32px rgba(5,150,105,0.25)',
        'brand-lg':   '0 0 80px rgba(5,150,105,0.35)',
        'input':      '0 0 0 3px rgba(5,150,105,0.15)',
        'dialog':     '0 24px 80px rgba(15,23,42,0.18)',
      },
      backgroundImage: {
        // Orbe lumineux du hero — style NextGen Foundry avec couleurs AfriBiz
        'hero-glow': 'radial-gradient(ellipse 70% 55% at 50% 70%, rgba(5,150,105,0.35) 0%, rgba(16,45,38,0.6) 40%, transparent 70%)',
        'hero-mesh': 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(5,150,105,0.2) 0%, transparent 60%)',
        'brand-gradient': 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        'gold-gradient':  'linear-gradient(135deg, #C79A45 0%, #E8C880 100%)',
        'forest-gradient':'linear-gradient(180deg, #0A1E1A 0%, #102D26 50%, #183D33 100%)',
      },
      animation: {
        'fade-in':      'fadeIn 0.3s ease-out',
        'fade-in-up':   'fadeInUp 0.4s ease-out',
        'slide-in-right':'slideInRight 0.3s ease-out',
        'glow-pulse':   'glowPulse 4s ease-in-out infinite',
        'skeleton':     'skeleton 1.5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.05)' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
}
