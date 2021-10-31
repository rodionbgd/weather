module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["**/dist/**", "**/node_modules/**"],
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 120,
      },
    ],
  },
  plugins: ["jest"],
};
