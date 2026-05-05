// src/domains/maintenance/store/MaintenanceStore.ts

export interface MaintenanceTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface MaintenanceItem {

  id: string;

  nom: string;

  workflow: string;

  timeline:
    MaintenanceTimelineEntry[];
}

class MaintenanceStoreManager {

  private items:
    MaintenanceItem[] = [];

  add(
    item: MaintenanceItem
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
  `Workflow ${workflow}`,

      date:
        new Date()
          .toLocaleString()
    });
  }
}

export const MaintenanceStore =
  new MaintenanceStoreManager();

