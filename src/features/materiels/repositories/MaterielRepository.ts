import type { Materiel }
from "../types/Materiel";

export interface MaterielRepository {

  findAll(): Promise<Materiel[]>;

  findById(id: string): Promise<Materiel | null>;

  create(data: Partial<Materiel>): Promise<string>;

  update(
    id: string,
    data: Partial<Materiel>
  ): Promise<void>;

  delete(id: string): Promise<void>;
}
