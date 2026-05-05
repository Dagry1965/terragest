export class WorkflowSupervisor {

  monitor(
    workflow: string
  ) {

    console.log(
      "[Supervisor]",
      workflow
    );
  }

  failure(
    workflow: string,
    error: unknown
  ) {

    console.error(
      "[Supervisor Failure]",
      workflow,
      error
    );
  }
}
