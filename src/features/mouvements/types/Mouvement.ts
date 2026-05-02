import { MOUVEMENT_SENS } from "@/enums/MouvementSens";

export interface Mouvement {

  id: string;

  organisationId: string;

  typeMouvement: string;

  categorie: string;

  referenceId: string;

  referenceNom: string;

  quantite: number;

  unite: string;

  montant: number;

  sens: MOUVEMENT_SENS;

  commentaire: string;

  createdAt: string;
}
