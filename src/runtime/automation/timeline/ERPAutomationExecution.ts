export type ERPAutomationExecution = {

  id: string;

  module: string;

  trigger: string;

  action: string;

  status:
    | "success"
    | "warning"
    | "error";

  timestamp: string;

  description?: string;
};