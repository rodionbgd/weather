module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
  },
  "transformIgnorePatterns": [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
  ]
};
