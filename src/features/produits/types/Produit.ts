import { UNITE } from "@/enums/Unite";

import { STATUT_STANDARD } from "@/enums/StatutStandard";

export interface Produit {

  id: string;

  organisationId: string;

  nom: string;

  categorie: string;

  unite: UNITE;

  prixUnitaire: number;

  stockActuel: number;

  seuilAlerte: number;

  statut: STATUT_STANDARD;

  createdAt: string;
}
