import type {
  Fournisseurs
}
from "./Fournisseurs";

export interface FournisseursRepository {
  getAll(): Promise<Fournisseurs[]>;

  getById(
    id: string
  ): Promise<Fournisseurs | null>;

  create(
    data: Partial<Fournisseurs>
  ): Promise<unknown>;

  update(
    id: string,
    data: Partial<Fournisseurs>
  ): Promise<void>;

  delete(
    id: string
  ): Promise<void>;
}