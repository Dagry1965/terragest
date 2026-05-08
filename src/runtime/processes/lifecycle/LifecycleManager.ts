export class LifecycleManager {

  start(
    process: string
  ) {

    console.log(
      "[Lifecycle Start]",
      process
    );
  }

  complete(
    process: string
  ) {

    console.log(
      "[Lifecycle Complete]",
      process
    );
  }
}
