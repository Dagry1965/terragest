export interface EnterpriseGovernanceCheck {
  key: string;
  label: string;
  status: "ok" | "warning" | "todo";
}

export class EnterpriseRuntimeGovernance {
  static checks(): EnterpriseGovernanceCheck[] {
    return [
      {
        key: "centralized-pages",
        label: "Pages pilotees par templates centraux",
        status: "ok",
      },
      {
        key: "runtime-actions",
        label: "Actions pilotees par Action Registry",
        status: "ok",
      },
      {
        key: "forms-runtime",
        label: "Formulaires generes par schema",
        status: "ok",
      },
      {
        key: "tables-runtime",
        label: "Tables branchees au data binding",
        status: "ok",
      },
      {
        key: "legacy-cleanup",
        label: "Nettoyage legacy complet",
        status: "warning",
      },
      {
        key: "production-hardening",
        label: "Durcissement production",
        status: "todo",
      },
    ];
  }
}