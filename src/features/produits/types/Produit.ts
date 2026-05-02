import { UNITE }
from "./UNITE";

export interface Produit {

  id: string;

  nom: string;

  categorie: string;

  unite: UNITE;

  prix: number;

  prixUnitaire: number;

  organisationId: string;

  stockActuel: number;

  seuilAlerte: number;

  statut: string;

  createdAt: Date;
}
