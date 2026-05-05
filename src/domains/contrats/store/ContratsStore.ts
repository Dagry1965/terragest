// src/domains/contrats/store/ContratsStore.ts

export interface ContratsTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface ContratsItem {

  id: string;

  nom: string;

  workflow: string;

  timeline:
    ContratsTimelineEntry[];
}

class ContratsStoreManager {

  private items:
    ContratsItem[] = [];

  add(
    item: ContratsItem
  ) {

    this.items.unshift(
      item
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
        `Workflow `,

      date:
        new Date()
          .toLocaleString()
    });
  }
}

export const ContratsStore =
  new ContratsStoreManager();
