import {
  centralRuntimeRegistry,
} from "./CentralRuntimeRegistry";

export class RuntimeSupervisor {

  boot() {

    console.log(
      "ERP Runtime Supervisor booting..."
    );

    console.log(
      "Modules:",
      centralRuntimeRegistry.getModuleCount()
    );

    console.log(
      "Registered workflows:",
      centralRuntimeRegistry
        .getModules()
        .flatMap(
          module =>
            module.workflows
        ).length
    );
  }

  healthCheck() {

    return {
      lifecycle:
        centralRuntimeRegistry
          .getRuntimeLifecycle(),

      health:
        centralRuntimeRegistry
          .getRuntimeHealth(),

      alerts:
        centralRuntimeRegistry
          .getRuntimeAlerts(),

      workers:
        centralRuntimeRegistry
          .getRuntimeWorkers(),

      queues:
        centralRuntimeRegistry
          .getRuntimeQueues(),

      retries:
        centralRuntimeRegistry
          .getRuntimeRetries(),

      deadLetters:
        centralRuntimeRegistry
          .getRuntimeDeadLetters(),
    };
  }
}

export const runtimeSupervisor =
  new RuntimeSupervisor();