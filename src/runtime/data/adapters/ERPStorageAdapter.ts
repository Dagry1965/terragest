export interface ERPStorageAdapter {
  create(
    collection: string,
    payload: Record<string, unknown>
  ): Promise<unknown>;

  update(
    collection: string,
    id: string,
    payload: Record<string, unknown>
  ): Promise<unknown>;

  delete(
    collection: string,
    id: string
  ): Promise<void>;

  list(
    collection: string
  ): Promise<unknown[]>;
}