import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { PaiementsDTO } from "../dto/PaiementsDTO";

export class PaiementsRepository extends FirestoreRepository<PaiementsDTO> {
  constructor() {
    super("paiements");
  }
}
