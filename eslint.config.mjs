import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["**/node_modules/", "dist/"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-var": "error",
      "no-console": "warn",
      ...tsEslintPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    },
    plugins: {
      "@typescript-eslint": tsEslintPlugin,
    },
  },
];
