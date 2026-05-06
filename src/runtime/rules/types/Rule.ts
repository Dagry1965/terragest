export type RuleContext = {
  module: string;
  event: string;
  payload?: unknown;
};

export type RuleCondition =
  (
    context: RuleContext
  ) => boolean | Promise<boolean>;

export type RuleAction =
  (
    context: RuleContext
  ) => void | Promise<void>;

export type Rule = {
  id: string;
  name: string;
  description?: string;

  condition:
    RuleCondition;

  action:
    RuleAction;
};