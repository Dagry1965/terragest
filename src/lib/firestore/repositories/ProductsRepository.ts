export const ProductsRepository = {
  async create(data: any) {
    console.log("Creating product", data);

    return {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date(),
    };
  },

  async getAll() {
    return [];
  },
};