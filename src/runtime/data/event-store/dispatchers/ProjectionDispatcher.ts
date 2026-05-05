export class ProjectionDispatcher {

  dispatch(
    event: unknown
  ) {

    console.log(
      "[ProjectionDispatcher]",
      event
    );
  }
}
