import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import globals from "globals";

const typescriptRules = {
  ...tsPlugin.configs.recommended.rules,
};

typescriptRules["@typescript-eslint/no-unused-vars"] = [
  "warn",
  { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
];

typescriptRules["no-unused-vars"] = "off";

typescriptRules["@typescript-eslint/no-explicit-any"] = "off";

typescriptRules["@typescript-eslint/no-empty-function"] = "off";

typescriptRules["@typescript-eslint/no-unused-expressions"] = "off";

typescriptRules["@typescript-eslint/no-non-null-assertion"] = "off";

const reactRules = {
  ...react.configs.recommended.rules,
  "react/react-in-jsx-scope": "off",
  "react/no-unknown-property": "off",
};

const reactHooksRules = {
  ...reactHooks.configs.recommended.rules,
  "react-hooks/unsupported-syntax": "off",
};

const a11yRules = {
  ...jsxA11y.configs.recommended.rules,
};

a11yRules["jsx-a11y/anchor-is-valid"] = "off";

a11yRules["jsx-a11y/no-static-element-interactions"] = "off";

a11yRules["jsx-a11y/click-events-have-key-events"] = "off";

a11yRules["jsx-a11y/label-has-associated-control"] = "off";

a11yRules["jsx-a11y/no-noninteractive-element-interactions"] = "off";

a11yRules["jsx-a11y/iframe-has-title"] = "off";

a11yRules["jsx-a11y/anchor-has-content"] = "off";

a11yRules["jsx-a11y/mouse-events-have-key-events"] = "off";

a11yRules["jsx-a11y/no-autofocus"] = "off";

export default [
  { ignores: [".next/**", "node_modules/**", "dist/**", "out/**"] },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"] ,
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "readonly",
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...typescriptRules,
      ...reactRules,
      ...reactHooksRules,
      ...a11yRules,
      "no-constant-condition": "off",
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
