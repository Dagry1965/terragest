// src/platform/persistence/RuntimeRecoveryScheduler.ts

import { RuntimePersistenceService }
from "@/platform/persistence/RuntimePersistenceService";

export class RuntimeRecoveryScheduler {

  static start() {

    console.log(
      "[RECOVERY SCHEDULER] started"
    );

    setInterval(
      () => {

        RuntimePersistenceService
          .saveSnapshot();

      },
      10000
    );
  }
}