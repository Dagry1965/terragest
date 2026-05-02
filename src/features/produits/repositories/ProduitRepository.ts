import type { Produit }
from "../types/Produit";

import { UNITE }
from "../types/UNITE";

export class ProduitRepository {

  static async getById(
    id: string
  ): Promise<Produit> {

    return {

      id,

      nom: "Produit demo",

      categorie: "Agricole",

      unite: UNITE.KG,

      prix: 0,

      prixUnitaire: 0,

      organisationId: "demo-org",

      stockActuel: 100,

      seuilAlerte: 10,

      statut: "ACTIF",

      createdAt: new Date(),
    };
  }

  static async create(
    data: Produit
  ) {

    return true;
  }

  static async update(
    id: string,
    data: Partial<Produit>
  ) {

    return true;
  }

  
  static async updateStock(

    id: string,

    stockActuel: number

  ) {

    return true;
  }

  static async getAllByOrganisation(
    organisationId: string
  ): Promise<Produit[]> {

    return [];
  }

  static async delete(
    id: string
  ) {

    return true;
  }
}

