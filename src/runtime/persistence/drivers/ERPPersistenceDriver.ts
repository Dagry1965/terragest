export type ERPPersistedRecord<T = unknown> = {
  id: string;
  tenantId: string;
  collection: string;
  data: T;
  createdAt: string;
  updatedAt: string;
};

export type ERPPersistenceDriver = {
  save<T>(
    collection: string,
    record: ERPPersistedRecord<T>
  ): Promise<void>;

  list<T>(
    collection: string,
    tenantId: string
  ): Promise<ERPPersistedRecord<T>[]>;

  get<T>(
    collection: string,
    tenantId: string,
    id: string
  ): Promise<ERPPersistedRecord<T> | undefined>;
};