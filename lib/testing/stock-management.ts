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
    throw new Error("QuantitÃ© invalide");
  }

  return current + added;
}

export function removeStock(
  current: number,
  removed: number
): number {

  if (removed <= 0) {
    throw new Error("QuantitÃ© invalide");
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
