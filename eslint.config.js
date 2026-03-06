export default [
  {
    files: ['js/**/*.js', 'test/**/*.js'],
    ignores: ['js/yaml/**', 'js/vendor/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off', // Disable since some functions are used externally
      'no-undef': 'off', // Disable since code uses many globals
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2]
    }
  }
];