import globals from 'globals';
import pluginJs from "@eslint/js";

import prettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [

  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals:{
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'semi': ['warn', 'always'],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "quotes": [
        "error",
        "single"
      ],
    },
  },
];