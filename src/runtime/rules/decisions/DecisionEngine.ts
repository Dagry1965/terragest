export class DecisionEngine {

  decide(
    input?: unknown
  ) {

    console.log(
      "[DecisionEngine]",
      input
    );

    return {
      approved: true,
    };
  }
}
