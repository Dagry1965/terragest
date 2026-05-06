export type WorkflowStep = {
  id: string;
  name: string;

  execute:
    (payload?: unknown)
      => Promise<void>;

  compensate?:
    (payload?: unknown)
      => Promise<void>;
};