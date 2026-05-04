// src/platform/workers/ERPWorker.ts

import { WorkflowExecutor }
from "@/platform/execution/executors/WorkflowExecutor";

export class ERPWorker {

  constructor(
    private readonly name: string
  ) {}

  start() {

    console.log(
      `[WORKER]
       ${this.name}
       started`
    );

    setInterval(
      async () => {

        await WorkflowExecutor
          .runNext();

      },
      3000
    );
  }
}