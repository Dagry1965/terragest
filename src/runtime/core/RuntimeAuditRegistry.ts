export interface RuntimeAuditEntry {

  id: string;

  action: string;

  moduleId?: string;

  userId?: string;

  payload?: unknown;

  createdAt: string;
}

export class RuntimeAuditRegistry {

  private entries:
    RuntimeAuditEntry[] = [];

  log(
    entry: RuntimeAuditEntry
  ) {

    this.entries.push(entry);
  }

  getEntries() {

    return this.entries;
  }

  getModuleEntries(
    moduleId: string
  ) {

    return this.entries.filter(
      entry =>
        entry.moduleId === moduleId
    );
  }

  clear() {

    this.entries = [];
  }
}

export const runtimeAuditRegistry =
  new RuntimeAuditRegistry();