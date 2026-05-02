import {

  FirestoreStockRepository

} from "@/features/stocks/repositories/firestore/FirestoreStockRepository";

export const
StockService = {

  async create(
    data: any
  ) {

    return FirestoreStockRepository
      .create(data);
  },

  async getAll() {

    return FirestoreStockRepository
      .getAll();
  },
};
