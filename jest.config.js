module.exports = {
    preset: 'jest-preset-angular',
    roots: ['src'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
  };
  