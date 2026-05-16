import type {
  ERPAlert,
} from "./ERPAlert";

import {
  ERPRealtimeBus,
} from "@/runtime/realtime/bus/ERPRealtimeBus";

class ERPAlertStoreClass {
  private alerts: ERPAlert[] = [];

  add(alert: ERPAlert) {
    this.alerts.unshift(alert);
    this.alerts = this.alerts.slice(0, 100);

    ERPRealtimeBus.publish({
      id: alert.id,
      channel: "alerts",
      module: alert.module,
      title: alert.title,
      description: alert.description,
      timestamp: alert.timestamp,
      payload: {
        
        ...alert,
      },
    });
  }

  all() {
    return this.alerts;
  }

  byLevel(level: ERPAlert["level"]) {
    return this.alerts.filter(
      alert => alert.level === level
    );
  }

  clear() {
    this.alerts = [];
  }
}

export const ERPAlertStore =
  new ERPAlertStoreClass();
