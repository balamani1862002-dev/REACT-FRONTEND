/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Core Brand Colors
        'royal-purple': '#5B21B6',
        'deep-purple': '#4C1D95',
        'soft-lavender': '#8B5CF6',
        'rich-gold': '#EAB308',
        'warm-amber': '#FACC15',
        
        // Background System
        'soft-lilac': '#F8F7FF',
        'dark-royal': '#3B0764',
        'muted-purple': '#581C87',
        'light-lavender': '#E9D5FF',
        
        // Typography
        'deep-indigo': '#1E1B4B',
        'slate-purple': '#6D28D9',
        'cool-gray': '#64748B',
        
        // Finance Colors
        'finance-income': '#16A34A',
        'finance-expense': '#DC2626',
        'finance-balance': '#4338CA',
        
        // Todo Status
        'todo-completed': '#22C55E',
        'todo-pending': '#3B82F6',
        'todo-important': '#F59E0B',
        'todo-overdue': '#EF4444',
      },
      keyframes: {
        loaderPulse: {
          '0%, 80%, 100%': {
            opacity: '0.75',
            boxShadow: '0 0 #076fe5',
            height: '32px',
          },
          '40%': {
            opacity: '1',
            boxShadow: '0 -8px #076fe5',
            height: '40px',
          },
        },
        wobble1: {
          '0%, 100%': {
            transform: 'translateY(0%) scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(-66%) scale(0.65)',
            opacity: '0.8',
          },
        },
        wobble2: {
          '0%, 100%': {
            transform: 'translateY(0%) scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(66%) scale(0.65)',
            opacity: '0.8',
          },
        },
      },
      animation: {
        loaderPulse: 'loaderPulse 0.8s infinite ease-in-out',
        'spin-slow': 'spin 2s linear infinite',
        wobble1: 'wobble1 0.8s infinite ease-in-out',
        wobble2: 'wobble2 0.8s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
