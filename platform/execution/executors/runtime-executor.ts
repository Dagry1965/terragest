import { traceExecution } from "../runtime/execution-trace";

export class RuntimeExecutor {

  execute(action: string) {

    try {

      traceExecution(
        "EXECUTION",
        action
      );

      console.log(
        "[RUNTIME EXECUTION]",
        action
      );

    } catch (error) {

      console.error(
        "[EXECUTION ERROR]",
        error
      );
    }
  }
}