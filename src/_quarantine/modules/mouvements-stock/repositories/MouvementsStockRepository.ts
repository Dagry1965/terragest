import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { MouvementsStockDTO } from "../dto/MouvementsStockDTO";

export class MouvementsStockRepository extends FirestoreRepository<MouvementsStockDTO> {
  constructor() {
    super("mouvementsStock");
  }
}
