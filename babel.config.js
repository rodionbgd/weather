module.exports = (api) => ({
  presets: [
    [
      "@babel/preset-env",
      {
        targets: api.caller((caller) => caller && caller.target === "node")
          ? { node: "current" }
          : { chrome: "58", ie: "11" },
      },
    ],
  ],
  plugins: ["@babel/plugin-transform-runtime", "babel-plugin-rewire"],
});
