import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type Product =
BaseAuditEntity & {

  nom: string;

  categorie: string;

  unite: string;

  quantite: number;

  prix: number;

  actif: boolean;
};