const config = require('./jest.config');

module.exports = {
  ...config,
  testMach: ['**/*.test.js'],
};
