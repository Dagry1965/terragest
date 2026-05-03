import { BillingService }
from "@/features/billing/services/BillingService";

export const OrganizationAnalyticsService = {

  async getMetrics() {

    return {

      users: 18,

      activeUsers: 12,

      products: 154,

      stocks: 82,

      exploitations: 7,

      alerts: 4,

      plan: "pro",

      limits:
        BillingService.getPlanLimits(
          "pro"
        ),
    };
  },
};