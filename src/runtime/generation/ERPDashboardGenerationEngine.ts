export interface ERPDashboardWidget {

  id: string;

  type:
    | "metric"
    | "table"
    | "chart"
    | "activity";

  title: string;
}

export interface ERPGeneratedDashboard {

  module: string;

  widgets:
    ERPDashboardWidget[];
}

export class ERPDashboardGenerationEngine {

  generateDashboard(
    module: string,
    widgets: ERPDashboardWidget[]
  ): ERPGeneratedDashboard {

    return {
      module,
      widgets,
    };
  }
}

export const erpDashboardGenerationEngine =
  new ERPDashboardGenerationEngine();