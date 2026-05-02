export class BaseCrudService<T> {

  repository: any;

  constructor(
    repository: any
  ) {

    this.repository =
      repository;
  }

  async create(
    data: T
  ) {

    return this.repository.create(
      data
    );
  }

  async getAll() {

    return this.repository.getAll();
  }

  async getById(
    id: string
  ) {

    return this.repository.getById(
      id
    );
  }

  async update(
    id: string,
    data: Partial<T>
  ) {

    return this.repository.update(
      id,
      data
    );
  }

  async delete(
    id: string
  ) {

    return this.repository.delete(
      id
    );
  }
}
