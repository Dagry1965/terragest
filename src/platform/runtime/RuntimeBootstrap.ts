// src/platform/runtime/RuntimeBootstrap.ts

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

export class RuntimeBootstrap {

  static async initialize() {

    console.log(
      "[BOOTSTRAP] Runtime initialization"
    );

    await MaterielsStore.load();

    console.log(
      "[BOOTSTRAP] Runtime ready"
    );
  }
}
