import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { MaintenanceDTO } from "../dto/MaintenanceDTO";

export class MaintenanceRepository extends FirestoreRepository<MaintenanceDTO> {
  constructor() {
    super("maintenance");
  }
}
