export class EventPipeline {

  async dispatch(
    event: string,
    payload?: unknown
  ) {

    console.log(
      "[EventPipeline]",
      event,
      payload
    );
  }
}
