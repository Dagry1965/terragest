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
