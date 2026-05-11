import type { ERPModule } from "../ERPModule";
import type { ERPModuleField } from "../schemas/ERPModuleSchema";


export interface ERPTableDefinition {
  module?: string;
  collection: string;
  columns: {
    key: string;
    label: string;
    sortable?: boolean;
    searchable?: boolean;
    filterable?: boolean;
  }[];
}

export interface ERPFormDefinition {
  module?: string;
  collection: string;
  fields: ERPModuleField[];
}

export interface ERPDetailsDefinition {
  module?: string;
  collection: string;
  fields: ERPModuleField[];
}

export interface ERPModuleRuntimeDefinition {
  module: ERPModule;
  table: ERPTableDefinition;
  form: ERPFormDefinition;
  details: ERPDetailsDefinition;
}

export class ERPModuleBuilder {
  static buildTable(module: ERPModule): ERPTableDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      columns: module.schema.fields
      .filter((field: ERPModuleField) => field.visibleInList !== false)
.map((field: ERPModuleField) => ({
          key: field.key,
          label: field.label,
          sortable: field.sortable,
          searchable: field.searchable,
          filterable: field.filterable,
        })),
    };
  }

  static buildForm(module: ERPModule): ERPFormDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      fields: module.schema.fields.filter(
        (field: ERPModuleField) => field.visibleInForm !== false
      ),
    };
  }

  static buildDetails(module: ERPModule): ERPDetailsDefinition {
    return {
      module: module.metadata.key,
      collection: module.schema.collection,
      fields: module.schema.fields.filter(
        (field: ERPModuleField) => field.visibleInDetails !== false
      ),
    };
  }

  static buildRuntime(module: ERPModule): ERPModuleRuntimeDefinition {
    return {
      module,
      table: this.buildTable(module),
      form: this.buildForm(module),
      details: this.buildDetails(module),
    };
  }
}
