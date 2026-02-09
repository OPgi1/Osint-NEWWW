/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        osint: {
          bg: '#0f172a',
          panel: '#111827',
          border: '#1f2937',
          text: '#e5e7eb',
          muted: '#9ca3af',
          accent: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
          primary: '#3b82f6',
          secondary: '#64748b',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan-line 2s linear infinite',
        'glitch': 'glitch 0.5s linear infinite',
      },
      keyframes: {
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '2%': { transform: 'translate(-2px, 2px)' },
          '4%': { transform: 'translate(2px, -2px)' },
        }
      }
    },
  },
  plugins: [],
}