export interface ERPFieldMetadata {

  key: string;

  label: string;

  type:
    | "text"
    | "number"
    | "date"
    | "select"
    | "boolean";
}

export interface ERPModuleMetadata {

  key: string;

  label: string;

  route: string;

  icon?: string;

  fields:
    ERPFieldMetadata[];
}

export class ERPMetadataRegistry {

  private modules:
    ERPModuleMetadata[] = [];

  registerModule(
    module: ERPModuleMetadata
  ) {

    this.modules.push(module);
  }

  getModules() {

    return this.modules;
  }

  getModule(
    key: string
  ) {

    return this.modules.find(
      module =>
        module.key === key
    );
  }
}

export const erpMetadataRegistry =
  new ERPMetadataRegistry();