export class AggregationService {
  static async buildDashboardMetrics() {
    return {
      totalModules: 0,
      totalWorkflows: 0,
      totalEvents: 0,
      totalErrors: 0,
      runtimeHealth: "healthy",
    };
  }
}
