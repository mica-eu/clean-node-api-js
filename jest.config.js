module.exports = {
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/src/**/*.js'],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
};
