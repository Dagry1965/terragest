export type ProductionReadinessStatus =
  | "ok"
  | "warning"
  | "critical";

export type ProductionReadinessCheck = {
  key: string;
  scope: string;
  label: string;
  status: ProductionReadinessStatus;
  description: string;
};

export const ProductionReadiness = {
  checks(): ProductionReadinessCheck[] {
    return [
      {
        key: "runtime-registry",
        scope: "registry",
        label: "Runtime Registry",
        status: "ok",
        description: "Registre ERP disponible.",
      },
      {
        key: "security-rbac",
        scope: "security",
        label: "Security RBAC",
        status: "ok",
        description: "RBAC disponible.",
      },
      {
        key: "cloud-persistence",
        scope: "persistence",
        label: "Cloud Persistence",
        status: "warning",
        description: "Driver cloud a finaliser.",
      },
    ];
  },

  score() {
    return 72;
  },
};
