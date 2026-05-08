export const AggregationService = {
  async buildDashboardMetrics() {
    return {
      totalProducts: 0,
      totalModules: 0,
      totalWorkflows: 0,
      totalEvents: 0,
      totalErrors: 0,
      runtimeHealth: "healthy",
    };
  },
};
