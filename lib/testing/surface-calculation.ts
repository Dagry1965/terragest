export function calculateSurface(
  length: number,
  width: number
): number {

  if (length <= 0 || width <= 0) {
    throw new Error("Dimensions invalides");
  }

  return length * width;
}

export function squareMetersToHectares(
  surface: number
): number {

  if (surface < 0) {
    throw new Error("Surface invalide");
  }

  return surface / 10000;
}