import {
  erpBusinessSchemaRegistry,
} from "../schemas";

import {
  erpModuleDataService,
} from "./ERPModuleDataService";

export class ERPModuleRuntimeDataBridge {

  getModuleData(
    module: string
  ) {

    const schema =
      erpBusinessSchemaRegistry
        .getSchema(module);

    if (!schema) {

      return [];
    }

    return erpModuleDataService
      .getAll(module);
  }

  getModuleRecord(
    module: string,
    id: string
  ) {

    return erpModuleDataService
      .getById(
        module,
        id
      );
  }
}

export const erpModuleRuntimeDataBridge =
  new ERPModuleRuntimeDataBridge();