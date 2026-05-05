// src/domains/materiels/store/MaterielsStore.ts

export interface MaterielsTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface MaterielsItem {

  id: string;

  nom: string;

  workflow: string;

  timeline:
    MaterielsTimelineEntry[];
}

class MaterielsStoreManager {

  private items:
    MaterielsItem[] = [];

  add(
    item: MaterielsItem
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

export const MaterielsStore =
  new MaterielsStoreManager();
