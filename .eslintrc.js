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
  plugins: ["jest"],
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "import/prefer-default-export": "off",
    "no-useless-catch": "off",
    "no-control-regex": "off",
  },
};

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
  ignorePatterns: ["**/dist/**"],
  rules: {
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-param-reassign": ["error", { props: false }],
  },
  plugins: ["jest"],
};
