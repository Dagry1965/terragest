import { SubscriptionPlan } from "@/features/billing/types/SubscriptionPlan";

export const FeatureFlags = {

  EXPORTS: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],

  ANALYTICS: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],

  REALTIME: [
    SubscriptionPlan.ENTERPRISE,
  ],

  MULTI_ORGANISATION: [
    SubscriptionPlan.ENTERPRISE,
  ],

  WORKFLOW: [
    SubscriptionPlan.PRO,
    SubscriptionPlan.ENTERPRISE,
  ],
};
