module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        pulseFast: 'pulse 0.8s infinite',
        pulseSlow: 'pulse 2s infinite',
      },
    },
  },
  plugins: [],
}