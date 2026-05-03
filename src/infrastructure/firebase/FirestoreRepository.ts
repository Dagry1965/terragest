export class FirestoreRepository<T> {
  protected collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async create(data: T): Promise<void> {
    console.log("CREATE", this.collectionName, data);
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    console.log("UPDATE", this.collectionName, id, data);
  }

  async delete(id: string): Promise<void> {
    console.log("DELETE", this.collectionName, id);
  }

  async findById(id: string): Promise<T | null> {
    console.log("FIND BY ID", this.collectionName, id);

    return null;
  }

  async findAll(): Promise<T[]> {
    console.log("FIND ALL", this.collectionName);

    return [];
  }
}