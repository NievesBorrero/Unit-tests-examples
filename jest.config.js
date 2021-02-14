module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/__tests__/e2e',
    '<rootDir>/__tests__/__mocks__'
  ],
  transformIgnorePatterns: ['./node_modules/'],
  transform: {
    "^.+\\.tsx$": "babel-jest"
  },
}

