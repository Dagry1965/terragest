export type RuntimeHealth = {

  status: string;

  uptime: number;

  workflows: number;

  retries: number;

  deadLetters: number;
};
