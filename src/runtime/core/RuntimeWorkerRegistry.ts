export interface RuntimeWorker {

  id: string;

  moduleId: string;

  name: string;

  status:
    | "idle"
    | "running"
    | "stopped";

  startedAt?: string;
}

export class RuntimeWorkerRegistry {

  private workers:
    RuntimeWorker[] = [];

  registerWorker(
    worker: RuntimeWorker
  ) {

    this.workers.push(worker);
  }

  getWorkers() {

    return this.workers;
  }

  getModuleWorkers(
    moduleId: string
  ) {

    return this.workers.filter(
      worker =>
        worker.moduleId === moduleId
    );
  }

  getRunningWorkers() {

    return this.workers.filter(
      worker =>
        worker.status === "running"
    );
  }
}

export const runtimeWorkerRegistry =
  new RuntimeWorkerRegistry();