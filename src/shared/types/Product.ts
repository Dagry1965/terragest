export interface Product {

  id: string;

  organisationId: string;

  nom: string;

  categorie:
    | "AGRICOLE"
    | "ANIMAL"
    | "MATERIEL"
    | "CONSOMMABLE";

  unite: string;

  prixUnitaire?: number;

  stockActuel?: number;

  seuilAlerte?: number;

  actif: boolean;

  createdAt: string;

  updatedAt: string;
}
