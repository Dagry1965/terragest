import {
  getERPProductionReadinessSnapshot,
} from "./readiness/ERPProductionReadinessSnapshot";

export const ProductionReadiness = {
  checks() {
    const snapshot =
      getERPProductionReadinessSnapshot();

    return [
      ...snapshot.policies.map((policy) => ({
        key: policy.key,
        label: policy.label,
        status: policy.status,
        description: policy.description,
      })),

      ...snapshot.cloud.map((check) => ({
        key: check.key,
        label: check.label,
        status: check.status,
        description: check.description,
      })),
    ];
  },

  score() {
    return getERPProductionReadinessSnapshot()
      .metrics
      .readinessScore;
  },
};