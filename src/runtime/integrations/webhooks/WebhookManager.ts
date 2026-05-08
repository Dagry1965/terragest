export class WebhookManager {

  receive(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[Webhook]",
      event,
      payload
    );
  }
}
