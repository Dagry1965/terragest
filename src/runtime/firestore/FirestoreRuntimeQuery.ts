import type { ERPModule } from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeQuery {

  static async list(
    module: ERPModule
  ) {
    return FirestoreRuntimeRepository.findMany(
      module
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeRepository.findById(
      module,
      id
    );
  }
}