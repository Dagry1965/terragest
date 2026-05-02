import { ProduitRepository } from "../repositories/ProduitRepository";

import { Produit } from "../types/Produit";

export const ProduitService = {

  async create(data: Produit) {

    return ProduitRepository.create(data);
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return ProduitRepository.getAllByOrganisation(
      organisationId
    );
  },
};
