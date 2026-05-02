export interface StockMovement {

  id: string;

  organisationId: string;

  produitId: string;

  type:
    | "ENTREE"
    | "SORTIE"
    | "TRANSFERT";

  quantite: number;

  reference?: string;

  commentaire?: string;

  createdBy: string;

  createdAt: string;
}
