import {
  ETLPipeline,
} from "@/data-platform/etl/ETLPipeline";

import {
  HistoricalAnalyticsService,
} from "@/data-platform/historical/HistoricalAnalyticsService";

import {
  BIService,
} from "@/data-platform/bi/BIService";

export const DataOrchestrationService = {

  async processBusinessData(
    payload: any
  ) {

    await ETLPipeline.process(
      "business-events",
      payload
    );

    const trend =
      HistoricalAnalyticsService.analyzeTrend(
        payload.history || []
      );

    return BIService.generateInsights({

      trend,

      payload,
    });
  },
};
