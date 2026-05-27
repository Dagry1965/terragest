import type {
  ERPModule,
} from "@/runtime/modules";

import {
  FirestoreRuntimeQuery,
  FirestoreRuntimeMutation,
} from "@/runtime/firestore";

import type {
  RuntimeMutationOptions,
} from "@/runtime/firestore/FirestoreRuntimeMutation";

import type {
  RuntimeContextOptions,
} from "@/runtime/context";

export class RuntimeDataBinding {
  static async list(
    module: ERPModule,
    options: RuntimeContextOptions = {}
  ) {
    return FirestoreRuntimeQuery.list(
      module,
      options
    );
  }

  static async detail(
    module: ERPModule,
    id: string
  ) {
    return FirestoreRuntimeQuery.detail(
      module,
      id
    );
  }

  static async create(
    module: ERPModule,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {
    return FirestoreRuntimeMutation.create(
      module,
      data,
      options
    );
  }

  static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>,
    options: RuntimeMutationOptions = {}
  ) {
    return FirestoreRuntimeMutation.update(
      module,
      id,
      data,
      options
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
