module.exports = {
  // ... other config
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0',
          },
        },
      },
      animation: {
        ripple: 'ripple 4s ease-out infinite',
      },
    },
  },
}
