import type { Produit }
from "../types/Produit";

import { ProduitRepository }
from "../repositories/ProduitRepository";

export class ProduitService {

  static async create(
    data: Produit
  ) {

    return ProduitRepository.create(
      data
    );
  }

  static async getAllByOrganisation(
    organisationId: string
  ) {

    return ProduitRepository
      .getAllByOrganisation(
        organisationId
      );
  }

  static async getById(
    id: string
  ) {

    return ProduitRepository
      .getById(id);
  }

  static async update(
    id: string,
    data: Partial<Produit>
  ) {

    return ProduitRepository.update(
      id,
      data
    );
  }

  static async delete(
    id: string
  ) {

    return ProduitRepository.delete(
      id
    );
  }
}
