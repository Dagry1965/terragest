export type AutomationRule = {

  id: string;

  name: string;

  trigger: string;

  condition?: string;

  action: string;

  enabled: boolean;
};
