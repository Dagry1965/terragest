// src/platform/workers/WorkerPool.ts

import { ERPWorker }
from "@/platform/workers/ERPWorker";

class WorkerPoolManager {

  private workers:
    ERPWorker[] = [];

  startWorkers(
    count = 3
  ) {

    for (
      let index = 0;
      index < count;
      index++
    ) {

      const worker =
        new ERPWorker(
          `worker-${index + 1}`
        );

      worker.start();

      this.workers.push(worker);
    }

    console.log(
      `[WORKERS]
       ${count}
       workers active`
    );
  }

  getWorkers() {

    return this.workers;
  }
}

export const WorkerPool =
  new WorkerPoolManager();