export interface ERPAuditEntry {

  id: string;

  module: string;

  action: string;

  user?: string;

  createdAt: string;

  payload?:
    Record<string, unknown>;
}

export class ERPRuntimeAuditTrail {

  private entries:
    ERPAuditEntry[] = [];

  log(
    entry: ERPAuditEntry
  ) {

    this.entries.push(
      entry
    );
  }

  all() {

    return this.entries;
  }

  byModule(
    module: string
  ) {

    return this.entries.filter(
      entry =>
        entry.module === module
    );
  }
}

export const erpRuntimeAuditTrail =
  new ERPRuntimeAuditTrail();