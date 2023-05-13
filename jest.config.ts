import type { Config } from 'jest';

const config: Config = {
    modulePaths: ['<rootDir>/src/', '<rootDir>/test/'],
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "@models/(.*)": "<rootDir>/src/models/$1",
      "@handlers/(.*)": "<rootDir>/src/handlers/$1"
    },
    setupFiles: ['<rootDir>/tests/setup/configTest.ts']
};

export default config;