// babel.config.js
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {runtime: 'automatic'}]
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs'
  ]
};