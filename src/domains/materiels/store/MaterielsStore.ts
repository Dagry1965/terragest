// src/domains/materiels/store/MaterielsStore.ts

import {
  materielsRepository
}
from "@/domains/materiels/repositories/MaterielsRepository";

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

  async load() {

    const data =
      await materielsRepository
        .findAll();

    this.items =
      data as MaterielItem[];

    console.log(
      "[MATERIELS LOADED]",
      this.items.length
    );
  }

  subscribe() {

    materielsRepository.subscribe(

      data => {

        this.items =
          data as MaterielItem[];

        console.log(
          "[MATERIELS REALTIME]",
          this.items.length
        );
      }
    );
  }

  async add(
    item: MaterielItem
  ) {

    this.items.unshift(
      item
    );

    await materielsRepository
      .create(item);

    console.log(
      "[MATERIEL CREATED]",
      item.nom
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

  async setStatus(

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

    await materielsRepository
      .update(id, {

        statut,

        historique:
          item.historique
      });
  }

  all() {

    return this.items;
  }
}

export const MaterielsStore =
  new MaterielsStoreManager();
