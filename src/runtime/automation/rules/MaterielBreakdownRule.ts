import type { AutomationRule }
from "./AutomationRule";

export const
MaterielBreakdownRule:
AutomationRule = {

  id: "RULE_MAT_BREAKDOWN",

  name:
    "Materiel Breakdown Automation",

  trigger:
    "MATERIEL_BREAKDOWN_DECLARED",

  condition:
    "severity === HIGH",

  action:
    "CREATE_INTERVENTION",

  enabled: true,
};
