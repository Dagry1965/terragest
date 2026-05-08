import type {
  ERPPersistedRecord,
  ERPPersistenceDriver,
} from "./ERPPersistenceDriver";

class ERPInMemoryPersistenceDriverClass
  implements ERPPersistenceDriver {

  private records:
    ERPPersistedRecord[] = [];

  async save<T>(
    collection: string,
    record: ERPPersistedRecord<T>
  ) {
    const exists =
      this.records.some(
        (item) =>
          item.collection === collection &&
          item.tenantId === record.tenantId &&
          item.id === record.id
      );

    if (exists) {
      this.records =
        this.records.map((item) =>
          item.collection === collection &&
          item.tenantId === record.tenantId &&
          item.id === record.id
            ? record as ERPPersistedRecord
            : item
        );

      return;
    }

    this.records.unshift(
      record as ERPPersistedRecord
    );

    this.records =
      this.records.slice(0, 1000);
  }

  async list<T>(
    collection: string,
    tenantId: string
  ) {
    return this.records.filter(
      (record) =>
        record.collection === collection &&
        record.tenantId === tenantId
    ) as ERPPersistedRecord<T>[];
  }

  async get<T>(
    collection: string,
    tenantId: string,
    id: string
  ) {
    return this.records.find(
      (record) =>
        record.collection === collection &&
        record.tenantId === tenantId &&
        record.id === id
    ) as ERPPersistedRecord<T> | undefined;
  }
}

export const ERPInMemoryPersistenceDriver =
  new ERPInMemoryPersistenceDriverClass();