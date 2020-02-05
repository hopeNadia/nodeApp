module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['prettier'],
  globals: {
    "__Config": "writable"
  },
  rules: {
    "react/prop-types": 1
  }
};
