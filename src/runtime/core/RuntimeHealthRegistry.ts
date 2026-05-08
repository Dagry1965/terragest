export interface RuntimeHealthEntry {

  moduleId: string;

  status:
    | "healthy"
    | "warning"
    | "critical";

  checkedAt: string;

  issues: string[];
}

export class RuntimeHealthRegistry {

  private entries =
    new Map<
      string,
      RuntimeHealthEntry
    >();

  set(
    entry: RuntimeHealthEntry
  ) {

    this.entries.set(
      entry.moduleId,
      entry
    );
  }

  get(
    moduleId: string
  ) {

    return this.entries.get(
      moduleId
    );
  }

  getAll() {

    return Array.from(
      this.entries.values()
    );
  }

  getCriticalEntries() {

    return this.getAll().filter(
      entry =>
        entry.status === "critical"
    );
  }

  getWarningEntries() {

    return this.getAll().filter(
      entry =>
        entry.status === "warning"
    );
  }
}

export const runtimeHealthRegistry =
  new RuntimeHealthRegistry();