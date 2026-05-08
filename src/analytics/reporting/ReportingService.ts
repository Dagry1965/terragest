import {
  AggregationService,
} from "@/analytics/services/AggregationService";

export const ReportingService = {

  async generateBusinessReport() {

    const metrics =
      await AggregationService.buildTableau de bordMetrics();

    return {

      generatedAt:
        new Date(),

      metrics,
    };
  },
};


