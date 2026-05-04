# =========================================================
# ERP TERRAGEST
# SETUP STOCK TESTS
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ERP TERRAGEST - STOCK TESTS SETUP" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$root = "C:\Users\Admin\terragest"

# =========================================================
# CREATE DIRECTORY FUNCTION
# =========================================================

function Ensure-Directory {

    param(
        [string]$Path
    )

    if (!(Test-Path $Path)) {

        New-Item -ItemType Directory -Path $Path | Out-Null

        Write-Host "[CREATED] $Path" -ForegroundColor Green
    }
    else {

        Write-Host "[EXISTS ] $Path" -ForegroundColor Yellow
    }
}

# =========================================================
# CREATE FILE FUNCTION
# =========================================================

function Create-File {

    param(
        [string]$Path,
        [string]$Content
    )

    $Content | Set-Content `
        -Path $Path `
        -Encoding UTF8

    Write-Host "[CREATED] $Path" -ForegroundColor Green
}

# =========================================================
# DIRECTORIES
# =========================================================

Ensure-Directory "$root\lib"
Ensure-Directory "$root\lib\testing"

Ensure-Directory "$root\tests"
Ensure-Directory "$root\tests\unit"
Ensure-Directory "$root\tests\unit\stocks"

# =========================================================
# STOCK MANAGEMENT SERVICE
# =========================================================

$stockService = @'
export interface StockItem {

  product: string;

  quantity: number;

  unitPrice: number;
}

export function addStock(
  current: number,
  added: number
): number {

  if (added <= 0) {
    throw new Error("Quantité invalide");
  }

  return current + added;
}

export function removeStock(
  current: number,
  removed: number
): number {

  if (removed <= 0) {
    throw new Error("Quantité invalide");
  }

  if (removed > current) {
    throw new Error("Stock insuffisant");
  }

  return current - removed;
}

export function calculateStockValue(
  quantity: number,
  unitPrice: number
): number {

  if (quantity < 0 || unitPrice < 0) {
    throw new Error("Valeur invalide");
  }

  return quantity * unitPrice;
}
'@

Create-File `
    -Path "$root\lib\testing\stock-management.ts" `
    -Content $stockService

# =========================================================
# STOCK TESTS
# =========================================================

$stockTests = @'
import { describe, it, expect } from "vitest";

import {

  addStock,

  removeStock,

  calculateStockValue

} from "@/lib/testing/stock-management";

describe("Stock management", () => {

  it("should add stock", () => {

    const result = addStock(100, 50);

    expect(result).toBe(150);

  });

  it("should remove stock", () => {

    const result = removeStock(100, 40);

    expect(result).toBe(60);

  });

  it("should calculate stock value", () => {

    const result = calculateStockValue(10, 2500);

    expect(result).toBe(25000);

  });

  it("should reject negative quantity", () => {

    expect(() =>
      addStock(10, -5)
    ).toThrow();

  });

  it("should reject insufficient stock", () => {

    expect(() =>
      removeStock(10, 50)
    ).toThrow();

  });

});
'@

Create-File `
    -Path "$root\tests\unit\stocks\stock-management.test.ts" `
    -Content $stockTests

# =========================================================
# TREE DISPLAY
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "GENERATED FILES" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "lib/testing/stock-management.ts" -ForegroundColor Green
Write-Host "tests/unit/stocks/stock-management.test.ts" -ForegroundColor Green

# =========================================================
# NEXT COMMANDS
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "NEXT COMMAND" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "pnpm test:run" -ForegroundColor Yellow
Write-Host ""

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "STOCK TESTS READY" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""