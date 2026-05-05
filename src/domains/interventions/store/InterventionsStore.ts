// src/domains/interventions/store/InterventionsStore.ts

export interface InterventionsTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface InterventionsItem {

  id: string;

  nom: string;

  workflow: string;

  timeline:
    InterventionsTimelineEntry[];
}

class InterventionsStoreManager {

  private items:
    InterventionsItem[] = [];

  add(
    item: InterventionsItem
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

export const InterventionsStore =
  new InterventionsStoreManager();
