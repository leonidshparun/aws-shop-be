/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@libs/(.*)$': ['<rootDir>/src/libs/$1'],
    '^@functions/(.*)$': ['<rootDir>/src/functions/$1'],
    '^@schema/(.*)$': ['<rootDir>/src/schema/$1'],
  },
};
