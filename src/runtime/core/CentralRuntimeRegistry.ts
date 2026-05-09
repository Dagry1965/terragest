import type {
  RuntimeModuleContract,
  RuntimeModuleId,
} from "./RuntimeContracts";

import {
  GeneratedRuntimeModules,
} from "../generated/GeneratedRuntimeModules";

import {
  runtimeOrchestrator,
} from "./RuntimeOrchestrator";

import {
  runtimeLifecycle,
} from "./RuntimeLifecycle";

import {
  runtimeHealthRegistry,
} from "./RuntimeHealthRegistry";

import {
  runtimeAlertRegistry,
} from "./RuntimeAlertRegistry";

import {
  runtimeWorkerRegistry,
} from "./RuntimeWorkerRegistry";

import {
  runtimeQueueRegistry,
} from "./RuntimeQueueRegistry";

import {
  runtimeRetryRegistry,
} from "./RuntimeRetryRegistry";

import {
  runtimeDeadLetterQueue,
} from "./RuntimeDeadLetterQueue";

import {
  runtimeStreamRegistry,
} from "./RuntimeStreamRegistry";

import {
  runtimeScheduler,
} from "./RuntimeScheduler";

import {
  runtimeAuditRegistry,
} from "./RuntimeAuditRegistry";

export class CentralRuntimeRegistry {
  private modules =
    new Map<
      RuntimeModuleId,
      RuntimeModuleContract
    >();

  initialize() {
    for (const module of GeneratedRuntimeModules) {
      this.registerModule(module);
    }
  }

  registerModule(module: RuntimeModuleContract) {
    this.modules.set(module.id, module);
    return module;
  }

  getModule(moduleId: RuntimeModuleId) {
    return this.modules.get(moduleId);
  }

  getModules() {
    return Array.from(this.modules.values());
  }

  hasModule(moduleId: RuntimeModuleId) {
    return this.modules.has(moduleId);
  }

  getModuleCount() {
    return this.modules.size;
  }

  getRuntimeOrchestrator() {
    return runtimeOrchestrator;
  }

  getRuntimeLifecycle() {
    return {
      status: runtimeLifecycle.getStatus(),
      startedAt: runtimeLifecycle.getStartedAt(),
    };
  }

  getRuntimeHealth() {
    return runtimeHealthRegistry.getAll();
  }

  getRuntimeAlerts() {
    return runtimeAlertRegistry.getAlerts();
  }

  getRuntimeWorkers() {
    return runtimeWorkerRegistry.getWorkers();
  }

  getRuntimeQueues() {
    return runtimeQueueRegistry.getJobs();
  }

  getRuntimeRetries() {
    return runtimeRetryRegistry.getRetries();
  }

  getRuntimeDeadLetters() {
    return runtimeDeadLetterQueue.getEvents();
  }

  getRuntimeStreams() {
    return runtimeStreamRegistry.getStreams();
  }

  getRuntimeScheduler() {
    return runtimeScheduler;
  }

  getRuntimeAudit() {
    return runtimeAuditRegistry.getEntries();
  }
}

export const centralRuntimeRegistry =
  new CentralRuntimeRegistry();

centralRuntimeRegistry.initialize();