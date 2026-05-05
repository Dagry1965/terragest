import type { Config }
from "jest";

const config: Config = {

  testEnvironment:
    "node",

  roots: [
    "<rootDir>/tests"
  ],

  transform: {
    "^.+\\\\.tsx?$":
      "ts-jest"
  },

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
};

export default config;
