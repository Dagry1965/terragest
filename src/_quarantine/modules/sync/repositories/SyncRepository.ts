import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { SyncDTO } from "../dto/SyncDTO";

export class SyncRepository extends FirestoreRepository<SyncDTO> {
  constructor() {
    super("sync");
  }
}
