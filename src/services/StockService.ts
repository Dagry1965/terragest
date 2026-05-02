import {
  FirestoreStockRepository
}
from "@/features/stocks/repositories/firestore/FirestoreStockRepository";

import { MOUVEMENT_STOCK }
from "@/features/stocks/types/MOUVEMENT_STOCK";

export const StockService = {

  async create(
    data: MOUVEMENT_STOCK
  ) {

    return FirestoreStockRepository
      .create(data);
  },

  async getAll() {

    return FirestoreStockRepository
      .getAll();
  },

  async getById(
    id: string
  ) {

    return FirestoreStockRepository
      .getById(id);
  },

  async update(

    id: string,

    data: Partial<MOUVEMENT_STOCK>

  ) {

    return FirestoreStockRepository
      .update(id, data);
  },

  async delete(
    id: string
  ) {

    return FirestoreStockRepository
      .delete(id);
  },

  async applyMouvement(

  categorie: string,

  referenceId: string,

  sens: string,

  quantite: number

) {

  console.log(
    "applyMouvement",
    {
      categorie,
      referenceId,
      sens,
      quantite,
    }
  );

  return true;
},


};