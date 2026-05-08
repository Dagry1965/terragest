import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { MonitoringDTO } from "../dto/MonitoringDTO";

export class MonitoringRepository extends FirestoreRepository<MonitoringDTO> {
  constructor() {
    super("monitoring");
  }
}
