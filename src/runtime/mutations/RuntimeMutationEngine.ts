import type { ERPModule } from "@/runtime/modules";
import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";

export class RuntimeMutationEngine {
  static async create(
    module: ERPModule,
    data: Record<string, unknown>
  ) {
    return RuntimeRepository.create(module, data);
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    return RuntimeRepository.update(module, id, data);
  }
}