import type {
  ERPModule,
} from "@/runtime/modules";

import {
  RuntimeContextEnforcer,
} from "@/runtime/context";

import {
  FirestoreRuntimeRepository,
} from "./FirestoreRuntimeRepository";

export class FirestoreRuntimeQuery {
  static async list(
    module: ERPModule
  ) {
    const records =
      await FirestoreRuntimeRepository.findMany(
        module
      );

    return RuntimeContextEnforcer.filterReadContext(
      module,
      records
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    const record =
      await FirestoreRuntimeRepository.findById(
        module,
        id
      );

    if (!record) {
      return null;
    }

    RuntimeContextEnforcer.assertRecordInContext(
      module,
      record
    );

    return record;
  }
}
