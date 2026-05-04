// src/platform/intelligence/OperationalIntelligenceScheduler.ts

import { RuntimeAnomalyDetector }
from "@/platform/intelligence/RuntimeAnomalyDetector";

import { AutoHealingService }
from "@/platform/intelligence/AutoHealingService";

export class OperationalIntelligenceScheduler {

  static start() {

    console.log(
      "[INTELLIGENCE] started"
    );

    setInterval(
      () => {

        RuntimeAnomalyDetector
          .analyze();

        AutoHealingService
          .recoverFailedJobs();

      },
      15000
    );
  }
}