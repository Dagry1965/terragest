// src/domains/materiels/repositories/MaterielsRepository.ts

import {
  BaseFirestoreRepository
}
from "@/infrastructure/repositories/firestore/BaseFirestoreRepository";

import {
  MaterielItem
}
from "@/domains/materiels/store/MaterielsStore";

export class MaterielsRepository
extends BaseFirestoreRepository<MaterielItem> {

  constructor() {

    super(
      "materiels"
    );
  }
}

export const materielsRepository =
  new MaterielsRepository();
