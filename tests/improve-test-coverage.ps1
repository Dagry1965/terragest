# =========================================================
# ERP TERRAGEST
# IMPROVE TEST COVERAGE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "ERP TERRAGEST - COVERAGE IMPROVEMENT" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$root = "C:\Users\Admin\terragest"

# =========================================================
# SURFACE TESTS
# =========================================================

$surfaceTests = @'
import { describe, it, expect } from "vitest";

import {
  calculateSurface,
  squareMetersToHectares
} from "@/lib/testing/surface-calculation";

describe("Surface calculations", () => {

  it("should calculate rectangular surface", () => {

    const result = calculateSurface(100, 50);

    expect(result).toBe(5000);

  });

  it("should convert square meters to hectares", () => {

    const result = squareMetersToHectares(10000);

    expect(result).toBe(1);

  });

  it("should throw error for invalid dimensions", () => {

    expect(() =>
      calculateSurface(-1, 50)
    ).toThrow();

  });

  it("should reject negative surface conversion", () => {

    expect(() =>
      squareMetersToHectares(-100)
    ).toThrow();

  });

});
'@

$surfaceTests | Set-Content `
  "$root\tests\unit\terrains\surface-calculation.test.ts"

Write-Host "[UPDATED] surface-calculation.test.ts" -ForegroundColor Green

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

  it("should reject negative stock removal", () => {

    expect(() =>
      removeStock(10, -1)
    ).toThrow();

  });

  it("should reject negative stock value", () => {

    expect(() =>
      calculateStockValue(-1, 100)
    ).toThrow();

  });

});
'@

$stockTests | Set-Content `
  "$root\tests\unit\stocks\stock-management.test.ts"

Write-Host "[UPDATED] stock-management.test.ts" -ForegroundColor Green

# =========================================================
# DONE
# =========================================================

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "COVERAGE TESTS UPDATED" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next command :" -ForegroundColor Yellow
Write-Host ""

Write-Host "pnpm test:coverage" -ForegroundColor Green
Write-Host ""