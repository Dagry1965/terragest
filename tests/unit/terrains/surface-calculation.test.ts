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
