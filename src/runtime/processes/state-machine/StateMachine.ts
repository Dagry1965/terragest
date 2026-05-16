export class StateMachine {

  private currentState =
    "INITIAL";

  transition(
    nextState: string
  ) {

    console.log(
      "[StateMachine]",
      this.currentState,
      "→",
      nextState
    );

    this.currentState =
      nextState;
  }

  getState() {

    return this.currentState;
  }
}
