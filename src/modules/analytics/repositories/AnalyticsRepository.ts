import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { AnalyticsDTO } from "../dto/AnalyticsDTO";

export class AnalyticsRepository extends FirestoreRepository<AnalyticsDTO> {
  constructor() {
    super("analytics");
  }
}
