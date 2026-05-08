import { TerrainsRepository } from "../repositories/TerrainsRepository";

export class TerrainsService {
  private repository =
    new TerrainsRepository();

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: string) {
    return this.repository.findById(id);
  }

  async create(data: any) {
    return this.repository.create(data);
  }

  async update(
    id: string,
    data: any
  ) {
    return this.repository.update(id, data);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
