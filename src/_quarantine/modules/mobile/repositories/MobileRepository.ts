import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { MobileDTO } from "../dto/MobileDTO";

export class MobileRepository extends FirestoreRepository<MobileDTO> {
  constructor() {
    super("mobile");
  }
}
