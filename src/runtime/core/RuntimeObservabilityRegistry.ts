export interface RuntimeObservabilityEntry {

  moduleId: string;

  metrics: string[];

  logs: string[];

  alerts: string[];
}

export class RuntimeObservabilityRegistry {

  private entries =
    new Map<
      string,
      RuntimeObservabilityEntry
    >();

  register(
    entry: RuntimeObservabilityEntry
  ) {

    this.entries.set(
      entry.moduleId,
      entry
    );
  }

  getModuleObservability(
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
}

export const runtimeObservabilityRegistry =
  new RuntimeObservabilityRegistry();