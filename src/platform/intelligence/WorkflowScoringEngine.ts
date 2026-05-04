// src/platform/intelligence/WorkflowScoringEngine.ts

export class WorkflowScoringEngine {

  static score(
    workflow: string
  ): number {

    if (
      workflow.includes(
        "critical"
      )
    ) {

      return 100;
    }

    if (
      workflow.includes(
        "paiement"
      )
    ) {

      return 80;
    }

    return 50;
  }
}