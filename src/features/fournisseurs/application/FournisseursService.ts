import {
  FirestoreFournisseursRepository
}
from "../infrastructure/FirestoreFournisseursRepository";

import type {
  Fournisseurs
}
from "../domain/Fournisseurs";

export const FournisseursService = {
  async create(
    data: Partial<Fournisseurs>
  ) {
    return FirestoreFournisseursRepository.create(
      data
    );
  },

  async getAll() {
    return FirestoreFournisseursRepository.getAll();
  },

  async getById(
    id: string
  ) {
    return FirestoreFournisseursRepository.getById(
      id
    );
  },

  async update(
    id: string,
    data: Partial<Fournisseurs>
  ) {
    return FirestoreFournisseursRepository.update(
      id,
      data
    );
  },

  async delete(
    id: string
  ) {
    return FirestoreFournisseursRepository.delete(
      id
    );
  },
};