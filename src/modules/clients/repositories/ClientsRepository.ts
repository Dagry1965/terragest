import { FirestoreRepository } from "@/infrastructure/firebase/FirestoreRepository";
import { ClientsDTO } from "../dto/ClientsDTO";

export class ClientsRepository extends FirestoreRepository<ClientsDTO> {
  constructor() {
    super("clients");
  }
}
