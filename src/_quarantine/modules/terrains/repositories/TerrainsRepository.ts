import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { TerrainsDTO } from "../dto/TerrainsDTO";

export class TerrainsRepository extends FirestoreRepository<TerrainsDTO> {
  constructor() {
    super("terrains");
  }
}
