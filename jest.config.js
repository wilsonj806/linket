module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  // transform: {
  // '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  // },
  transformIgnorePatterns: [
    "/node_modules/",
    // "^.+\\.module\\.(css|sass|scss)$",
  ],
};
