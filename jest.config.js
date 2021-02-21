module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transformIgnorePatterns: ['./node_modules/'],
  transform: {
    "^.+\\.tsx$": "babel-jest"
  }
}

