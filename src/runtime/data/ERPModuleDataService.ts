import {
  erpDataRepository,
  type ERPRecord,
} from "./ERPDataRepository";

export class ERPModuleDataService {

  getAll(
    module: string
  ) {

    return erpDataRepository
      .findAll(module);
  }

  getById(
    module: string,
    id: string
  ) {

    return erpDataRepository
      .findById(
        module,
        id
      );
  }

  create(
    module: string,
    data: ERPRecord
  ) {

    return erpDataRepository
      .create(
        module,
        data
      );
  }

  update(
    module: string,
    id: string,
    data: ERPRecord
  ) {

    return erpDataRepository
      .update(
        module,
        id,
        data
      );
  }

  delete(
    module: string,
    id: string
  ) {

    return erpDataRepository
      .delete(
        module,
        id
      );
  }
}

export const erpModuleDataService =
  new ERPModuleDataService();