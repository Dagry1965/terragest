import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { MaterielsDTO } from "../dto/MaterielsDTO";

export class MaterielsRepository extends FirestoreRepository<MaterielsDTO> {
  constructor() {
    super("materiels");
  }
}
