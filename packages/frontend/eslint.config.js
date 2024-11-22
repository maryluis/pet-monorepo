import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}']
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'no-console': ['warn'],
      'react/react-in-jsx-scope': 0,
      'react/jsx-no-target-blank': 0,
      'jsx-quotes': ['error', 'prefer-double'],
      'quotes': ['error', 'single'],
      'space-before-function-paren': ['error', 'never'],
      'function-paren-newline': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'no-multi-spaces': ['error', {
        'ignoreEOLComments': false,
        'exceptions': {
          'Property': true,
        }
      }],
      'space-infix-ops': 'error',
      'keyword-spacing': ['error', {
        'before': true,
        'after': true,
      }],
      'no-trailing-spaces': 'error',
      'semi': ['error', 'always']
    }
  }
];
