module.exports = {
  "coverageDirectory": "./coverage/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/**/index.ts"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/setupTest.js"
  ],
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}
