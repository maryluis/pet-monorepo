import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'packages/backend/__tests__',
      'packages/backend/lib',
      'packages/frontend/__tests__',
      'packages/frontend/lib',
      'packages/frontend/src/**/*.test.js',
      'packages/frontend/src/**/*.spec.ts',
      'packages/frontend/dist/',
      '*.min.js',
    ],
  },

  {
    files: ['packages/backend/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },

  {
    files: ['packages/frontend/src/**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    settings: {
      react: {
        version: '^18.3.1',
      },
    },
  },

  {
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-no-target-blank': 0,
      'jsx-quotes': ['error', 'prefer-double'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'react/jsx-tag-spacing': [
        'warn',
        {
          beforeSelfClosing: 'always',
        },
      ],
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'function-paren-newline': ['error', 'never'],
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/no-namespace': 0,
      'arrow-parens': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      'space-before-blocks': ['error', 'always'],
      'no-multi-spaces': [
        'error',
        {
          ignoreEOLComments: false,
          exceptions: {
            Property: true,
          },
        },
      ],
      'space-infix-ops': 'error',
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'no-trailing-spaces': 'error',
      semi: ['error', 'always'],
    },
  },
  {
    files: [
      '*.config.js',
      '*.config.cjs',
      'packages/frontend/*.config.js',
      'packages/frontend/src/*.config.js',
      'packages/frontend/src/*.config.cjs',
    ],
    rules: {
      'no-undef': 'off',
    },
  },
];
