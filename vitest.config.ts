import { defineConfig } from "vitest/config";

import path from "path";

export default defineConfig({

  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  },

  test: {

    globals: true,

    environment: "jsdom",

    setupFiles: ["./tests/setup.ts"],

    include: [

      "tests/unit/**/*.test.ts",
      "tests/unit/**/*.spec.ts",

      "tests/integration/**/*.test.ts",
      "tests/integration/**/*.spec.ts"

    ]

  }

});