export default [
  {
    files: ['js/**/*.js'],
    ignores: ['js/yaml/**', 'js/vendor/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        jQuery: 'readonly',
        $: 'readonly',
        jsyaml: 'readonly',
        Highcharts: 'readonly',
        $WowheadPower: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
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
  },
  {
    files: ['js/**/*.module.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        describe: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        $: 'readonly',
        AppState: 'readonly'
      }
    }
  }
];