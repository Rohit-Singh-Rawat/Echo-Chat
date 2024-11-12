const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
    'turbo', // Adding turbo as per your original config
  ],
  plugins: [
    'only-warn',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'tailwindcss',
    'prettier',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    project: [project], // Points to tsconfig.json
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
  ignorePatterns: [
    '.*.js',
    'node_modules/',
    'dist/',
    '.next/',
    'coverage/',
    'build/',
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
    {
      files: ['src/**/*.tsx'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.[jt]s', '**/?(*.)+(spec|test).[jt]s'],
      extends: ['plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': [
          'off',
          { devDependencies: ['**/?(*.)+(spec|test).[jt]s'] },
        ],
      },
    },
  ],
}
