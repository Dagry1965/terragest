import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { InterventionsDTO } from "../dto/InterventionsDTO";

export class InterventionsRepository extends FirestoreRepository<InterventionsDTO> {
  constructor() {
    super("interventions");
  }
}
