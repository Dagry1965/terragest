export class IntegrationBus {

  publish(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[IntegrationBus]",
      event,
      payload
    );
  }
}
