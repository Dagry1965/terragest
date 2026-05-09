import type { ERPStorageAdapter } from "./ERPStorageAdapter";

export class MemoryERPStorageAdapter
  implements ERPStorageAdapter
{
  private storage = new Map<
    string,
    Record<string, unknown>[]
  >();

  async create(
    collection: string,
    payload: Record<string, unknown>
  ) {
    const items =
      this.storage.get(collection) ?? [];

    items.push(payload);

    this.storage.set(collection, items);

    return payload;
  }

  async update(
    collection: string,
    id: string,
    payload: Record<string, unknown>
  ) {
    const items =
      this.storage.get(collection) ?? [];

    const updated = items.map((item) =>
      item.id === id
        ? { ...item, ...payload }
        : item
    );

    this.storage.set(collection, updated);

    return payload;
  }

  async delete(
    collection: string,
    id: string
  ) {
    const items =
      this.storage.get(collection) ?? [];

    const filtered = items.filter(
      (item) => item.id !== id
    );

    this.storage.set(collection, filtered);
  }

  async list(
    collection: string
  ) {
    return this.storage.get(collection) ?? [];
  }
}