import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { FacturesDTO } from "../dto/FacturesDTO";

export class FacturesRepository extends FirestoreRepository<FacturesDTO> {
  constructor() {
    super("factures");
  }
}
