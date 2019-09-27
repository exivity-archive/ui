module.exports = {
  "env": {
    "browser": true
  },
  "extends": [
    "exivity",
    "exivity/react",
    "exivity/testing"
  ],

  "overrides": [{
    "files": ["*.stories.*"],
    "rules": {
      // Storybook cannot parse the stories otherwise
      "@typescript-eslint/member-delimiter-style": [2, { "multiline": { "delimiter": "semi"} }]
    }
  }],

  "rules": {
    "react/function-component-definition": 2
  }
}