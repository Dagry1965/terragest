export class TransitionManager {

  validate(
    from: string,
    to: string
  ) {

    console.log(
      "[Transition]",
      from,
      to
    );

    return true;
  }
}
