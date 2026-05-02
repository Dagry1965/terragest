import { MouvementStockType } from './mouvement-stock.type';

export interface MouvementStock {
  id: string;
  produitId: string;
  organisationId: string;
  type: MouvementStockType;
  quantite: number;           // tu peux ajouter un commentaire pour indiquer si elle doit toujours être > 0
  commentaire?: string;
  createdAt: Date;
  createdBy: string;
}

