export class DeadLetterQueue {

  capture(
    payload: unknown
  ) {

    console.error(
      "[DEAD LETTER QUEUE]",
      payload
    );
  }
}
