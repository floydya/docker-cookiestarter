// http://eslint.org/docs/user-guide/configuring
// Date of last rules check: 2017-03-01

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  env: {
    browser: true,
  },
  // required to lint *.vue files
  settings: {
    'html/html-extensions': ['.html', '.vue'],  // consider .html and .vue files as HTML
  },
  plugins: [
    'html',
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'arrow-spacing': 'error',
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // do not use semicolons
    'semi': ['error', 'never'],

    'func-call-spacing': ['error', 'never'],

    'indent': [
      'error', 2,
      {
        'MemberExpression': 1,
        'FunctionDeclaration': {'body': 1, 'parameters': 2},
        'FunctionExpression': {'body': 1, 'parameters': 2},
        'ArrayExpression': 1,
        'ObjectExpression': 1,
      }
    ],

    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
    }],

    'max-len': ['error', 79, {
      'comments': 72,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],

    'no-constant-condition': 'error',
    'no-useless-constructor': 'error',
    'no-useless-computed-key': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-unreachable': 'error',
    'no-unsafe-negation': 'error',
    'no-unsafe-finally': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'no-alert': 'error',
    'no-caller': 'error',
    'no-else-return': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-magic-numbers': ['error', { 'ignoreArrayIndexes': true }],
    'no-multi-spaces': 'error',
    'no-redeclare': 'error',
    'yoda': ['error', 'always'],
    'no-catch-shadow': 'error',
    'no-shadow-restricted-names': 'error',
    'brace-style': ['error', '1tbs', {'allowSingleLine': true}],
    'camelcase': 'error',
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'comma-style': ['error', 'last'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'key-spacing': ['error', {'afterColon': true, 'beforeColon': false}],
    'new-parens': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'no-unused-vars': ['error', {
      'vars': 'local',
      'args': 'none',
      'ignoreRestSiblings': true,
      'caughtErrors': 'none',
    }],
    'comma-dangle': 0,
  },
}
