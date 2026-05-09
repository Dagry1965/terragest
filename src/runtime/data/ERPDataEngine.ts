import type { ERPModule } from "@/runtime/modules";
import { RuntimeMutationEngine } from "@/runtime/mutations/RuntimeMutationEngine";
import { erpEventBus } from "@/runtime/events";
import { FirestoreRuntimeRepository } from "@/runtime/firestore/FirestoreRuntimeRepository";

export class ERPDataEngine {
  static async create(module: ERPModule, payload: Record<string, unknown>) {
    const data = await RuntimeMutationEngine.create(module, payload);

    erpEventBus.publish({
      type: `${module.metadata.key}.created`,
      module: module.metadata.key,
      payload: data,
    });

    return { success: true, data };
  }

  static async update(
    module: ERPModule,
    id: string,
    payload: Record<string, unknown>
  ) {
    const data = await RuntimeMutationEngine.update(module, id, payload);

    erpEventBus.publish({
      type: `${module.metadata.key}.updated`,
      module: module.metadata.key,
      payload: data,
    });

    return { success: true, data };
  }

  static async delete(module: ERPModule, id: string) {
    await RuntimeMutationEngine.delete(module, id);

    erpEventBus.publish({
      type: `${module.metadata.key}.deleted`,
      module: module.metadata.key,
      payload: { id },
    });

    return { success: true };
  }

  static async list(module: ERPModule) {
    return FirestoreRuntimeRepository.findMany(module);
  }
}
