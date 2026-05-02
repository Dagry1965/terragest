import { FeatureFlags } from "@/features/billing/types/FeatureFlags";

export const hasFeatureAccess = (
  plan: string | undefined,
  feature:
    keyof typeof FeatureFlags
) => {

  if (!plan) {
    return false;
  }

  return FeatureFlags[
    feature
  ].includes(plan as any);
}
