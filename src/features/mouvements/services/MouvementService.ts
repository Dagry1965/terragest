import { MouvementRepository } from "../repositories/MouvementRepository";

import { Mouvement } from "../types/Mouvement";

import { StockService } from "@/services/StockService";

export const MouvementService = {

  async create(data: Mouvement) {

    await MouvementRepository.create(data);

    await StockService.applyMouvement(
      data.categorie,
      data.referenceId,
      data.sens,
      data.quantite
    );
  },

  async getAllByOrganisation(
    organisationId: string
  ) {

    return MouvementRepository.getAllByOrganisation(
      organisationId
    );
  },
};
