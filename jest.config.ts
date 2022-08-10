import { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  verbose: true,
  //resetMocks: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', ...defaults.moduleFileExtensions],
  moduleNameMapper: {
    "^@models/(.*)": "<rootDir>/src/models/$1",
    "^@handlers/(.*)": "<rootDir>/src/handlers/$1"
  }
};
export default config;