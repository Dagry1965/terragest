import { AggregationService } from "../aggregation/AggregationService";

export class ReportingService {
  static async buildReport() {
    const metrics =
      await AggregationService.buildDashboardMetrics();

    return {
      metrics,
    };
  }
}
