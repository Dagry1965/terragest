import type { BusinessRule }
from "./BusinessRule";

export const
MaterielCriticalRule:
BusinessRule = {

  id: "RULE_MAT_CRITICAL",

  name:
    "Critical Material Breakdown",

  condition:
    "severity === HIGH",

  action:
    "URGENT_MAINTENANCE",

  priority: 1,

  enabled: true,
};
