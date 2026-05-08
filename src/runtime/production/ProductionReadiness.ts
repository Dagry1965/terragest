export interface ProductionReadinessCheck {
  key: string;
  label: string;
  status: "ready" | "warning" | "todo";
}

export class ProductionReadiness {
  static checks(): ProductionReadinessCheck[] {
    return [
      {
        key: "error-boundary",
        label: "Error boundaries globaux",
        status: "ready",
      },
      {
        key: "logging",
        label: "Logging structure",
        status: "ready",
      },
      {
        key: "cache",
        label: "Cache runtime",
        status: "ready",
      },
      {
        key: "rate-limit",
        label: "Rate limiting runtime",
        status: "ready",
      },
      {
        key: "tenant",
        label: "Isolation tenant reelle",
        status: "warning",
      },
      {
        key: "ci-cd",
        label: "CI/CD enterprise",
        status: "todo",
      },
      {
        key: "security-audit",
        label: "Audit securite production",
        status: "warning",
      },
    ];
  }
}