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
      'indent': ['error', 2],
      // Enforce consistent spacing around keywords
      'keyword-spacing': ['error', { before: true, after: true }],
      // Enforce no spaces inside parentheses
      'space-in-parens': ['error', 'never'],
      // Enforce space before blocks
      'space-before-blocks': ['error', 'always'],
      // Enforce spacing around operators
      'space-infix-ops': 'error',
      // Enforce spacing after commas
      'comma-spacing': ['error', { before: false, after: true }],
      // Enforce space around binary operators
      'space-around-operator': 'off',
      // Enforce no space before function call parentheses
      'func-call-spacing': ['error', 'never']
    }
  }
];