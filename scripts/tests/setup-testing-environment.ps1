# =========================================================
# ERP TERRAGEST - SETUP TESTING ENVIRONMENT
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ERP TERRAGEST - TEST ENVIRONMENT SETUP" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# =========================================================
# ROOT
# =========================================================

$root = "C:\Users\Admin\terragest"

# =========================================================
# CREATE FILE FUNCTION
# =========================================================

function Create-FileIfNotExists {

    param(
        [string]$Path,
        [string]$Content
    )

    if (!(Test-Path $Path)) {

        $Content | Set-Content -Path $Path -Encoding UTF8

        Write-Host "[CREATED] $Path" -ForegroundColor Green
    }
    else {

        Write-Host "[EXISTS ] $Path" -ForegroundColor Yellow
    }
}

# =========================================================
# VITEST CONFIG
# =========================================================

$vitestConfig = @'
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
'@

Create-FileIfNotExists `
    -Path "$root\vitest.config.ts" `
    -Content $vitestConfig

# =========================================================
# TEST SETUP
# =========================================================

$testSetup = @'
import "@testing-library/jest-dom";
'@

Create-FileIfNotExists `
    -Path "$root\tests\setup.ts" `
    -Content $testSetup

# =========================================================
# UNIT TEST EXAMPLE
# =========================================================

$unitTest = @'
import { describe, it, expect } from "vitest";

describe("example", () => {

  it("should work", () => {

    expect(1 + 1).toBe(2);

  });

});
'@

Create-FileIfNotExists `
    -Path "$root\tests\unit\example.test.ts" `
    -Content $unitTest

# =========================================================
# PLAYWRIGHT CONFIG
# =========================================================

$playwrightConfig = @'
import { defineConfig } from "@playwright/test";

export default defineConfig({

  testDir: "./tests/e2e",

  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },

});
'@

Create-FileIfNotExists `
    -Path "$root\playwright.config.ts" `
    -Content $playwrightConfig

# =========================================================
# E2E TEST
# =========================================================

$e2eTest = @'
import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {

  await page.goto("/");

  await expect(page).toHaveTitle(/Terragest/i);

});
'@

Create-FileIfNotExists `
    -Path "$root\tests\e2e\home.spec.ts" `
    -Content $e2eTest

# =========================================================
# GITHUB ACTIONS
# =========================================================

$githubFolder = "$root\.github"
$workflowFolder = "$githubFolder\workflows"

if (!(Test-Path $githubFolder)) {

    New-Item -ItemType Directory -Path $githubFolder | Out-Null
}

if (!(Test-Path $workflowFolder)) {

    New-Item -ItemType Directory -Path $workflowFolder | Out-Null
}

$ciWorkflow = @'
name: CI

on:
  push:
    branches:
      - main

jobs:

  build-test:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Install dependencies
        run: pnpm install

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm exec tsc --noEmit

      - name: Unit Tests
        run: pnpm test

      - name: Build
        run: pnpm build
'@

Create-FileIfNotExists `
    -Path "$workflowFolder\ci.yml" `
    -Content $ciWorkflow

# =========================================================
# PACKAGE.JSON CHECK
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "PACKAGE.JSON" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Ajouter manuellement dans package.json :" -ForegroundColor Yellow
Write-Host ""

Write-Host '"test": "vitest",' -ForegroundColor Green
Write-Host '"test:ui": "vitest --ui",' -ForegroundColor Green
Write-Host '"test:e2e": "playwright test",' -ForegroundColor Green
Write-Host '"test:coverage": "vitest run --coverage"' -ForegroundColor Green

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "TEST ENVIRONMENT READY" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""