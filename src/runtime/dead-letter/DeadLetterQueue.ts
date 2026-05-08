export class DeadLetterQueue {

  private queue: unknown[] = [];

  push(payload: unknown) {

    this.queue.push(payload);

    console.error(
      "[DeadLetterQueue]",
      payload
    );
  }

  getAll() {

    return this.queue;
  }
}
