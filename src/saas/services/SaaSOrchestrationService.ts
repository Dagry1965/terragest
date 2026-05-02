import {
  TenantService,
} from "@/saas/tenants/TenantService";

import {
  SubscriptionService,
} from "@/saas/subscriptions/SubscriptionService";

import {
  FeatureFlagService,
} from "@/saas/features/FeatureFlagService";

export const SaaSOrchestrationService = {

  initializeTenant(
    tenantId: string
  ) {

    const tenant =
      TenantService.resolveTenant(
        tenantId
      );

    const subscription =
      SubscriptionService.getSubscription(
        tenantId
      );

    return {

      tenant,

      subscription,

      features: {

        ai:
          FeatureFlagService.hasFeature(
            "AI_ENGINE"
          ),

        realtime:
          FeatureFlagService.hasFeature(
            "REALTIME"
          ),

        analytics:
          FeatureFlagService.hasFeature(
            "ANALYTICS"
          ),
      },
    };
  },
};
