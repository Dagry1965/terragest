import { Rule } from "./types";

export const ruleRegistry:
  Rule[] = [

  {
    name: "payment.rule",

    condition: "payment.validated",

    action: "payment.allowed",

    enabled: true,
  },
];