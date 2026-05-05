// src/domains/materiels/store/MaterielsStore.ts

export interface MaterielItem {

  id: string;

  nom: string;

  statut: string;

  historique:
    string[];
}

class MaterielsStoreManager {

  private items:
    MaterielItem[] = [];

  add(
    item: MaterielItem
  ) {

    this.items.unshift(
      item
    );
  }

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  setStatus(

    id: string,

    statut: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.statut =
      statut;

    item.historique.unshift(

      `${new Date().toLocaleString()} - ${statut}`
    );
  }

  all() {

    return this.items;
  }
}

export const MaterielsStore =
  new MaterielsStoreManager();
