import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { ProductionsDTO } from "../dto/ProductionsDTO";

export class ProductionsRepository extends FirestoreRepository<ProductionsDTO> {
  constructor() {
    super("productions");
  }
}
