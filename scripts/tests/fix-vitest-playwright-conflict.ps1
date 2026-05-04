# =========================================================
# ERP TERRAGEST
# FIX VITEST / PLAYWRIGHT CONFLICT
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "FIX VITEST / PLAYWRIGHT CONFLICT" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$root = "C:\Users\Admin\terragest"

# =========================================================
# PATHS
# =========================================================

$oldE2E = "$root\tests\e2e"

$playwrightRoot = "$root\playwright"

$newE2E = "$root\playwright\tests"

# =========================================================
# CREATE PLAYWRIGHT FOLDER
# =========================================================

if (!(Test-Path $playwrightRoot)) {

    New-Item -ItemType Directory -Path $playwrightRoot | Out-Null

    Write-Host "[CREATED] playwright/" -ForegroundColor Green
}

# =========================================================
# MOVE E2E TESTS
# =========================================================

if (Test-Path $oldE2E) {

    if (!(Test-Path $newE2E)) {

        New-Item -ItemType Directory -Path $newE2E | Out-Null
    }

    Get-ChildItem $oldE2E -File | ForEach-Object {

        Move-Item $_.FullName $newE2E -Force

        Write-Host "[MOVED] $($_.Name) -> playwright/tests/" -ForegroundColor Green
    }

    Remove-Item $oldE2E -Force -Recurse

    Write-Host "[REMOVED] tests/e2e" -ForegroundColor Yellow
}
else {

    Write-Host "[INFO] tests/e2e not found" -ForegroundColor Yellow
}

# =========================================================
# PLAYWRIGHT CONFIG
# =========================================================

$playwrightConfig = @'
import { defineConfig } from "@playwright/test";

export default defineConfig({

  testDir: "./playwright/tests",

  use: {
    baseURL: "http://localhost:3000",
    headless: true
  }

});
'@

$playwrightConfig | Set-Content `
    -Path "$root\playwright.config.ts" `
    -Encoding UTF8

Write-Host "[UPDATED] playwright.config.ts" -ForegroundColor Green

# =========================================================
# VITEST CONFIG
# =========================================================

$vitestConfig = @'
import { defineConfig } from "vitest/config";

export default defineConfig({

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
'@

$vitestConfig | Set-Content `
    -Path "$root\vitest.config.ts" `
    -Encoding UTF8

Write-Host "[UPDATED] vitest.config.ts" -ForegroundColor Green

# =========================================================
# STOP NODE PROCESSES
# =========================================================

Write-Host ""
Write-Host "Stopping Node processes..." -ForegroundColor Yellow

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "[DONE] Node processes stopped" -ForegroundColor Green

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "CONFLICT FIXED" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next commands :" -ForegroundColor Yellow
Write-Host ""

Write-Host "pnpm test:run" -ForegroundColor Green
Write-Host "pnpm test:e2e" -ForegroundColor Green
Write-Host ""