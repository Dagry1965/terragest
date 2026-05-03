import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { StocksDTO } from "../dto/StocksDTO";

export class StocksRepository extends FirestoreRepository<StocksDTO> {
  constructor() {
    super("stocks");
  }
}
