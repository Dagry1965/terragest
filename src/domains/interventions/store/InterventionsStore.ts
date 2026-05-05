// src/domains/interventions/store/InterventionsStore.ts

export interface InterventionItem {

  id: string;

  materielId: string;

  description: string;

  workflow: string;
}

class InterventionsStoreManager {

  private items:
    InterventionItem[] = [];

  add(
    item: InterventionItem
  ) {

    this.items.unshift(
      item
    );

    console.log(
      "[INTERVENTION CREATED]",
      item.id
    );
  }

  all() {

    return this.items;
  }
}

export const InterventionsStore =
  new InterventionsStoreManager();
