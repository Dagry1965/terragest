import {
  FirestoreInterventionRepository
}
from "../repositories/firestore/FirestoreInterventionRepository";

import { Intervention }
from "../types/Intervention";

export const InterventionService = {

  async create(
    data: Intervention
  ) {

    return FirestoreInterventionRepository
      .create(data);
  },

  async getAll() {

    return FirestoreInterventionRepository
      .getAll();
  },

  async getById(
    id: string
  ) {

    return FirestoreInterventionRepository
      .getById(id);
  },

  async update(

    id: string,

    data: Partial<Intervention>

  ) {

    return FirestoreInterventionRepository
      .update(id, data);
  },

  async delete(
    id: string
  ) {

    return FirestoreInterventionRepository
      .delete(id);
  },
};