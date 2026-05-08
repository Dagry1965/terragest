import type { ERPSecurityAuditEntry } from "./ERPSecurityAuditLog";

class ERPSecurityAuditStoreClass {
  private entries: ERPSecurityAuditEntry[] = [];

  add(entry: ERPSecurityAuditEntry) {
    this.entries.unshift(entry);
    this.entries = this.entries.slice(0, 300);
  }

  all() {
    return this.entries;
  }

  denied() {
    return this.entries.filter((entry) => !entry.allowed);
  }
}

export const ERPSecurityAuditStore =
  new ERPSecurityAuditStoreClass();