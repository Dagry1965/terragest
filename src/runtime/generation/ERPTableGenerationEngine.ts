export interface ERPTableColumn {

  key: string;

  label: string;

  sortable?: boolean;

  filterable?: boolean;
}

export interface ERPGeneratedTable {

  module: string;

  columns:
    ERPTableColumn[];
}

export class ERPTableGenerationEngine {

  generateTable(
    module: string,
    columns: ERPTableColumn[]
  ): ERPGeneratedTable {

    return {
      module,
      columns,
    };
  }
}

export const erpTableGenerationEngine =
  new ERPTableGenerationEngine();