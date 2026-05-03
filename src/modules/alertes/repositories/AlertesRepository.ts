import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { AlertesDTO } from "../dto/AlertesDTO";

export class AlertesRepository extends FirestoreRepository<AlertesDTO> {
  constructor() {
    super("alertes");
  }
}
