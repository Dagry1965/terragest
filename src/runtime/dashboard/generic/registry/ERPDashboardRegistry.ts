import type {
  ERPDashboardConfig,
}
from "../ERPDashboardTypes";

export class ERPDashboardRegistry {

  private static dashboards:
    Record<
      string,
      ERPDashboardConfig
    > = {};

  static register(
    dashboard:
      ERPDashboardConfig
  ) {

    this.dashboards[
      dashboard.key
    ] = dashboard;
  }

  static get(
    key: string
  ):
    ERPDashboardConfig | null {

    return (
      this.dashboards[key]
      ?? null
    );
  }

  static getAll():
    ERPDashboardConfig[] {

    return Object.values(
      this.dashboards
    );
  }
}