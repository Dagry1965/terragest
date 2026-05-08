import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { DTO } from "../dto/DTO";

export class Repository extends FirestoreRepository<DTO> {
  constructor() {
    super("");
  }
}
