// // jest.config.js
// module.exports = {
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   transformIgnorePatterns: [
//     // Transform ES modules that need to be transformed
//     '/node_modules/(?!lucide-react|react-icons).+\\.js$'
//   ],
//   moduleNameMapper: {
//     // Handle CSS imports (if you're using CSS in your component)
//     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
//   },
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
// };
// jest.config.js - Simplified version
module.exports = {
  preset: 'react-scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {},
  transformIgnorePatterns: []
};