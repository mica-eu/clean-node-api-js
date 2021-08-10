const config = require('./jest.config');

module.exports = {
  ...config,
  testMach: ['**/*.spec.js'],
};
