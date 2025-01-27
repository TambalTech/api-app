const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.config({
    parser: "@babel/eslint-parser", // Or another parser like '@typescript-eslint/parser'
    parserOptions: {
      requireConfigFile: false, // For Babel parser, if you're not using a Babel config file
    },
    extends: ["next/core-web-vitals"],
  }),
];
