module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'unused-imports',
    'simple-import-sort',
    'react-hooks',
    'react-redux',
    'no-floating-promise',
    'void',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'max-len': ['error', 120],
        'unused-imports/no-unused-imports-ts': 'error',
        'unused-imports/no-unused-vars-ts': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'simple-import-sort/imports': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react-redux/connect-prefer-named-arguments': 2,
        'void/side-effect': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
