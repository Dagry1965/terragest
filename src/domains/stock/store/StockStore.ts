// src/domains/stock/store/StockStore.ts

export interface StockItem {

  id: string;

  produit: string;

  quantite: number;

  workflow: string;
}

class StockStoreManager {

  private items:
    StockItem[] = [];

  add(
    item: StockItem
  ) {

    this.items.unshift(
      item
    );

    console.log(
      "[STOCK STORE ADD]",
      item.produit
    );
  }

  all() {

    return this.items;
  }
}

export const StockStore =
  new StockStoreManager();
