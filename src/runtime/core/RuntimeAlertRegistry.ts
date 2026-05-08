export interface RuntimeAlert {

  level:
    | "info"
    | "warning"
    | "critical";

  message: string;

  moduleId?: string;

  createdAt: string;
}

export class RuntimeAlertRegistry {

  private alerts:
    RuntimeAlert[] = [];

  pushAlert(
    alert: RuntimeAlert
  ) {

    this.alerts.push(alert);
  }

  getAlerts() {

    return this.alerts;
  }

  getCriticalAlerts() {

    return this.alerts.filter(
      alert =>
        alert.level === "critical"
    );
  }

  getWarnings() {

    return this.alerts.filter(
      alert =>
        alert.level === "warning"
    );
  }
}

export const runtimeAlertRegistry =
  new RuntimeAlertRegistry();