import type { ERPModule } from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeMutation {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeRepository.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeRepository.update(
      module,
      id,
      data
    );
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeRepository.delete(
      module,
      id
    );
  }
}