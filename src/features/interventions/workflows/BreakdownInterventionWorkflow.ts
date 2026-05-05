import { InterventionService }
from "../services/InterventionService";

export class
BreakdownInterventionWorkflow {

  private service =
    new InterventionService();

  async execute(
    payload?: unknown
  ) {

    console.log(
      "[Workflow] breakdown intervention"
    );

    return this.service
      .createIntervention(
        payload
      );
  }
}
