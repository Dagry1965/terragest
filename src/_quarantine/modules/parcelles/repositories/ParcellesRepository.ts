import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { ParcellesDTO } from "../dto/ParcellesDTO";

export class ParcellesRepository extends FirestoreRepository<ParcellesDTO> {
  constructor() {
    super("parcelles");
  }
}
