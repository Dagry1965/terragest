import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { UtilisateursDTO } from "../dto/UtilisateursDTO";

export class UtilisateursRepository extends FirestoreRepository<UtilisateursDTO> {
  constructor() {
    super("utilisateurs");
  }
}
