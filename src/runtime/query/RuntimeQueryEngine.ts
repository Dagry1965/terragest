import type { ERPModule } from "@/runtime/modules";
import { RuntimeRepository } from "@/runtime/repositories/RuntimeRepository";

export class RuntimeQueryEngine {
  static async list(module: ERPModule) {
    return RuntimeRepository.findMany(module);
  }

  static async detail(module: ERPModule, id: string) {
    return RuntimeRepository.findById(module, id);
  }
}