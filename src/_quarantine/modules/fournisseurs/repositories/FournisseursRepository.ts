import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { FournisseursDTO } from "../dto/FournisseursDTO";

export class FournisseursRepository extends FirestoreRepository<FournisseursDTO> {
  constructor() {
    super("fournisseurs");
  }
}
