// src/domains/stock/store/StockStore.ts

export interface StockTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface StockItem {

  id: string;

  produit: string;

  quantite: number;

  workflow: string;

  timeline:
    StockTimelineEntry[];
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

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  transition(

    id: string,

    workflow: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.workflow =
      workflow;

    item.timeline.unshift({

      id:
        crypto.randomUUID(),

      label:
        `Workflow ${workflow}`,

      date:
        new Date()
          .toLocaleString()
    });

    console.log(
      "[STOCK WORKFLOW]",
      workflow
    );
  }
}

export const StockStore =
  new StockStoreManager();
