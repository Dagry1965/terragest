import {
  ERPWorkerEngine,
} from "@/runtime/workers";

import {
  ERPAccessGuard,
} from "@/runtime/security";

import {
  ERPAutomationRegistry,
} from "@/runtime/automation";

export const ERPRuntimeSimulation = {
  simulateWorkflow() {
    return {
      status: "success",
      duration: 250,
    };
  },

  simulateWorker() {
    return ERPWorkerEngine.executeJob(
      "worker_runtime_1",
      "materiels",
      "SIMULATION_JOB"
    );
  },

  simulateSecurity() {
    return ERPAccessGuard.can(
      "materiels",
      "read"
    );
  },

  simulateAutomation() {
    return ERPAutomationRegistry;
  },
};