export class TriggerEngine {

  trigger(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[Trigger]",
      event,
      payload
    );
  }
}
