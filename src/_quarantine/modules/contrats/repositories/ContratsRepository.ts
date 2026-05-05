import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { ContratsDTO } from "../dto/ContratsDTO";

export class ContratsRepository extends FirestoreRepository<ContratsDTO> {
  constructor() {
    super("contrats");
  }
}
