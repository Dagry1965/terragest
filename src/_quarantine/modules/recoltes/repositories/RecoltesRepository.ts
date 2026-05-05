import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { RecoltesDTO } from "../dto/RecoltesDTO";

export class RecoltesRepository extends FirestoreRepository<RecoltesDTO> {
  constructor() {
    super("recoltes");
  }
}
