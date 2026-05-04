import { Workflow } from "./types";

export const workflowRegistry:
  Workflow[] = [

  {
    name: "payment.workflow",

    trigger: "payment.validated",
  },
];