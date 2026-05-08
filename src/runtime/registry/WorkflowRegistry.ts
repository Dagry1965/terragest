export class WorkflowRegistry {

  private workflows =
    new Map<string, unknown>();

  register(
    name: string,
    workflow: unknown
  ) {

    this.workflows.set(
      name,
      workflow
    );
  }

  get(name: string) {

    return this.workflows.get(name);
  }
}
