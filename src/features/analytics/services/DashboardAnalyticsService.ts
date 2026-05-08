export const DashboardAnalyticsService = {
  async getStats() {
    return {
      produits: 0,
      stocks: 0,
      materiels: 0,
      exploitations: 0,
      totalModules: 0,
      totalWorkflows: 0,
      totalEvents: 0,
      runtimeHealth: "healthy",
    };
  },
};

export default DashboardAnalyticsService;
