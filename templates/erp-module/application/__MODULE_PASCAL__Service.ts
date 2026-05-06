import {
  Firestore__MODULE_PASCAL__Repository
}
from "../infrastructure/Firestore__MODULE_PASCAL__Repository";

import type {
  __MODULE_PASCAL__
}
from "../domain/__MODULE_PASCAL__";

export const __MODULE_PASCAL__Service = {
  async create(
    data: Partial<__MODULE_PASCAL__>
  ) {
    return Firestore__MODULE_PASCAL__Repository.create(
      data
    );
  },

  async getAll() {
    return Firestore__MODULE_PASCAL__Repository.getAll();
  },

  async getById(
    id: string
  ) {
    return Firestore__MODULE_PASCAL__Repository.getById(
      id
    );
  },

  async update(
    id: string,
    data: Partial<__MODULE_PASCAL__>
  ) {
    return Firestore__MODULE_PASCAL__Repository.update(
      id,
      data
    );
  },

  async delete(
    id: string
  ) {
    return Firestore__MODULE_PASCAL__Repository.delete(
      id
    );
  },
};