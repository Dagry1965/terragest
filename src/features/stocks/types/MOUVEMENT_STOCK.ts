export interface MOUVEMENT_STOCK {

  id: string;

  produitId: string;

  produitNom: string;

  type: "ENTREE" | "SORTIE";

  quantite: number;

  createdAt: Date;
}
