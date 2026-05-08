import type {
  ERPAlert,
} from "./ERPAlert";

class ERPAlertStoreClass {

  private alerts:
    ERPAlert[] = [];

  add(
    alert: ERPAlert
  ) {

    this.alerts.unshift(alert);

    this.alerts =
      this.alerts.slice(0, 100);
  }

  all() {

    return this.alerts;
  }
}

export const ERPAlertStore =
  new ERPAlertStoreClass();