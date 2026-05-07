export interface RuntimeAutomation {

  id: string;

  name: string;

  schedule: string;

  enabled?: boolean;

  handler:
    () => Promise<void>;
}
