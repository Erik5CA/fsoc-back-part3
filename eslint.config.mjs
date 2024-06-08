import stylisticJs from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  { ignores: ["dist", "eslint.config.mjs"] },
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
    },
  },
  {
    rules: {
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": 0,
    },
  },
];
