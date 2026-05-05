import type { Materiel }
from "../../../features/materiels/types/Materiel";

import type { MaterielRepository }
from "../../../features/materiels/repositories/MaterielRepository";

export class FirestoreMaterielRepository
implements MaterielRepository {

  async findAll(): Promise<Materiel[]> {

    return [];
  }

  async findById(
    id: string
  ): Promise<Materiel | null> {

    return null;
  }

  async create(
    data: Partial<Materiel>
  ): Promise<string> {

    return "id";
  }

  async update(
    id: string,
    data: Partial<Materiel>
  ): Promise<void> {
  }

  async delete(
    id: string
  ): Promise<void> {
  }
}
