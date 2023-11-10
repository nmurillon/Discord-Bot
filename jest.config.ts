import type { Config } from 'jest';
require('dotenv').config({path: '.env.test'})

const config: Config = {
    modulePaths: ['<rootDir>/src/', '<rootDir>/test/'],
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
      "@commands/(.*)": "<rootDir>/src/commands/$1",
      "@handlers/(.*)": "<rootDir>/src/handlers/$1",
      "@models/(.*)": "<rootDir>/src/models/$1"
    },
    setupFiles: ['dotenv/config', '<rootDir>/tests/setup/configTest.ts']
};

export default config;