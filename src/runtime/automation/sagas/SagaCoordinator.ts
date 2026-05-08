export class SagaCoordinator {

  async start(
    saga: string
  ) {

    console.log(
      "[Saga]",
      saga
    );
  }
}
