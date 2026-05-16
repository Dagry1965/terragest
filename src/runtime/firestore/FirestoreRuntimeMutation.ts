import type { ERPModule } from "@/runtime/modules";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

import {
  runtimeEventBus,
} from "@/runtime/events/RuntimeEventBus";

export class FirestoreRuntimeMutation {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    const result =
      await FirestoreRuntimeRepository.create(
        module,
        data
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.created`,
      {
        ...data,
        result,
      }
    );

    return result;
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    const result =
      await FirestoreRuntimeRepository.update(
        module,
        id,
        data
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.updated`,
      {
        id,
        ...data,
        result,
      }
    );

    return result;
  }

  static async delete(
    module: ERPModule,
    id: string
  ) {
    const result =
      await FirestoreRuntimeRepository.delete(
        module,
        id
      );

    await runtimeEventBus.emit(
      `${module.metadata.key}.deleted`,
      {
        id,
        result,
      }
    );

    return result;
  }
}