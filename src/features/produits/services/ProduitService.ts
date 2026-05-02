import {
  FirestoreProduitRepository
}
from "../repositories/firestore/FirestoreProduitRepository";

import { Produit }
from "../types/Produit";

export const ProduitService = {

  async create(
    data: Produit
  ) {

    return FirestoreProduitRepository
      .create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return FirestoreProduitRepository
      .getAll();
  },

  async getById(
    id: string
  ) {

    return FirestoreProduitRepository
      .getById(id);
  },

  async update(

    id: string,

    data: Partial<Produit>

  ) {

    return FirestoreProduitRepository
      .update(id, data);
  },

  async delete(
    id: string
  ) {

    return FirestoreProduitRepository
      .delete(id);
  },
};
