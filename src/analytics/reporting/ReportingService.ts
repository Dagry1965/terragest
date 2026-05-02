import {
  AggregationService,
} from "@/analytics/services/AggregationService";

export const ReportingService = {

  async generateBusinessReport() {

    const metrics =
      await AggregationService.buildDashboardMetrics();

    return {

      generatedAt:
        new Date(),

      metrics,
    };
  },
};
