export class ERPDashboardDiscoveryRegistry {

  private static dashboards:
    string[] = [];

  static register(
    dashboardKey: string
  ) {

    if (
      !this.dashboards.includes(
        dashboardKey
      )
    ) {
      this.dashboards.push(
        dashboardKey
      );
    }
  }

  static getAll():
    string[] {

    return this.dashboards;
  }
}