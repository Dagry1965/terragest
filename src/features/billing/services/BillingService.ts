import { BillingPlan }
from "@/features/billing/types/Subscription";

import { BillingRepository }
from "@/features/billing/repositories/BillingRepository";

export const BillingService = {

  getPlanLimits(
    plan: BillingPlan
  ) {

    switch (plan) {

      case "free":

        return {
          maxUsers: 3,
          analytics: false,
          realtime: false,
        };

      case "pro":

        return {
          maxUsers: 25,
          analytics: true,
          realtime: true,
        };

      case "enterprise":

        return {
          maxUsers: 999,
          analytics: true,
          realtime: true,
        };

      default:

        return {
          maxUsers: 1,
          analytics: false,
          realtime: false,
        };
    }
  },

  async getSubscriptions() {

    return await
      BillingRepository.getAll();
  },

  async updatePlan(
    id: string,
    plan: BillingPlan
  ) {

    return await
      BillingRepository.update(
        id,
        {
          plan,
        }
      );
  },
};