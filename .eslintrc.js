module.exports = {
  env: {
    browser: true
  },
  extends: [
    'exivity',
    'exivity/react',
    'exivity/testing'
  ],

  overrides: [{
    files: ['*.stories.*'],
    rules: {
      // Storybook cannot parse the stories otherwise
      '@typescript-eslint/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'semi'} }]
    }
  }]
}