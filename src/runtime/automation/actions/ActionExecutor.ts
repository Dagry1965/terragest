export class ActionExecutor {

  async execute(
    action: string,
    payload?: unknown
  ) {

    console.log(
      "[Action]",
      action,
      payload
    );
  }
}
