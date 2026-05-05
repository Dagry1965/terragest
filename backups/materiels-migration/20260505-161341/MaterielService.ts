import {
  FirestoreMaterielRepository
}
from "../repositories/firestore/FirestoreMaterielRepository";

import { Materiel }
from "../types/Materiel";

export const MaterielService = {

  async create(
    data: Materiel
  ) {

    return FirestoreMaterielRepository
      .create(data);
  },

  async getAll() {

    return FirestoreMaterielRepository
      .getAll();
  },

  async getById(
    id: string
  ) {

    return FirestoreMaterielRepository
      .getById(id);
  },

  async update(

    id: string,

    data: Partial<Materiel>

  ) {

    return FirestoreMaterielRepository
      .update(id, data);
  },

  async delete(
    id: string
  ) {

    return FirestoreMaterielRepository
      .delete(id);
  },
};