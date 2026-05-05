import { InterventionService }
from "../services/InterventionService";

export class BreakdownInterventionWorkflow {
  async execute(payload?: unknown) {
    return InterventionService.create(
      payload as never
    );
  }
}