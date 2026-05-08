import {
  AnalyticsRepository,
} from "@/analytics/repositories/AnalyticsRepository";

import {
  KPIEngine,
} from "@/analytics/kpi/KPIEngine";

export const AggregationService = {

  async buildTableau de bordMetrics() {

    const products =
      await AnalyticsRepository.getProducts();

    const transactions =
      await AnalyticsRepository.getTransactions();

    return {

      revenue:
        KPIEngine.calculateRevenue(
          transactions
        ),

      stockRate:
        KPIEngine.calculateStockRate(
          products
        ),

      productsCount:
        products.length,

      transactionsCount:
        transactions.length,
    };
  },
};


