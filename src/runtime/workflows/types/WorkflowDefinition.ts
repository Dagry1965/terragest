import type {
  WorkflowStep
}
from "./WorkflowStep";

export type WorkflowDefinition = {
  id: string;
  name: string;
  steps: WorkflowStep[];
};