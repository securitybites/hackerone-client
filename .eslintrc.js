module.exports = {
  "extends": [
    "standard",
    "plugin:promise/recommended",
    "plugin:node/recommended",
  ],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
  },
  "env": {
    "jest": true,
  },
}