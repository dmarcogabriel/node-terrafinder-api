module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['<rootDir>/src/config/tests/setupTests.js'],
}
