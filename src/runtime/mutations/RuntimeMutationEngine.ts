import type { ERPModule } from "@/runtime/modules";
import { FirestoreRuntimeMutation } from "@/runtime/firestore/FirestoreRuntimeMutation";

export class RuntimeMutationEngine {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data
    );
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeMutation.delete(
      module,
      id
    );
  }
}
