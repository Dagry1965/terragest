export class ExecutionTrace {

  trace(
    operation: string,
    payload?: unknown
  ) {

    console.log(
      "[Trace]",
      operation,
      payload
    );
  }
}
