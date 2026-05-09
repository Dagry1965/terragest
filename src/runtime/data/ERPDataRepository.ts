export interface ERPRecord {

  id: string;

  [key: string]:
    unknown;
}

export class ERPDataRepository {

  private storage:
    Record<
      string,
      ERPRecord[]
    > = {};

  findAll(
    module: string
  ): ERPRecord[] {

    return (
      this.storage[module]
      ?? []
    );
  }

  findById(
    module: string,
    id: string
  ) {

    return this.findAll(
      module
    ).find(
      record =>
        record.id === id
    );
  }

  create(
    module: string,
    data: ERPRecord
  ) {

    if (
      !this.storage[module]
    ) {

      this.storage[module] = [];
    }

    this.storage[module]
      .push(data);

    return data;
  }

  update(
    module: string,
    id: string,
    data: ERPRecord
  ) {

    const records =
      this.findAll(module);

    const index =
      records.findIndex(
        record =>
          record.id === id
      );

    if (
      index >= 0
    ) {

      records[index] = data;
    }

    return data;
  }

  delete(
    module: string,
    id: string
  ) {

    this.storage[module] =
      this.findAll(module)
        .filter(
          record =>
            record.id !== id
        );
  }
}

export const erpDataRepository =
  new ERPDataRepository();