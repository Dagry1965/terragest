export type ERPBusinessRule = {
  id: string;

  module: string;

  name: string;

  description?: string;

  enabled: boolean;

  evaluate: (
    data: any
  ) => boolean | Promise<boolean>;

  execute: (
    data: any
  ) => Promise<void>;
};

const rulesRegistry:
  ERPBusinessRule[] = [];

export function registerRule(
  rule: ERPBusinessRule
) {
  rulesRegistry.push(rule);
}

export function getRulesForModule(
  module: string
) {
  return rulesRegistry.filter(
    (rule) =>
      rule.module === module &&
      rule.enabled
  );
}

export async function executeRules(
  module: string,
  data: any
) {
  const rules =
    getRulesForModule(module);

  for (const rule of rules) {
    const matches =
      await rule.evaluate(data);

    if (!matches) {
      continue;
    }

    console.log(
      "ERP RULE MATCHED",
      rule.name
    );

    await rule.execute(data);
  }
}
