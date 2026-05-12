import type { ERPBusinessRule } from "@/runtime/rules/ERPBusinessRuleEngine";
import type { TerragestBusinessRule } from "../rules/TerragestBusinessRules";

export class TerragestBusinessRuleAdapter {
  static adapt(rule: TerragestBusinessRule): ERPBusinessRule {
    return {
      id: rule.code,

      module: rule.module,

      description: [
        rule.label,
        `[${rule.category}]`,
        `[${rule.severity}]`,
        rule.description,
        rule.event ? `[event:${rule.event}]` : "",
      ]
        .filter(Boolean)
        .join(" "),

      validate: (data: Record<string, unknown>) => {
        switch (rule.code) {
          /**
           * TERRAIN RULES
           */
          case "TERRAIN_SURFACE_POSITIVE":
            return Number(data.surfaceTotale ?? 0) > 0;

          /**
           * PRODUCT RULES
           */
          case "PRODUCT_REQUIRES_UNIT":
            return String(data.unite ?? "").trim().length > 0;

          /**
           * CONTRACT RULES
           */
          case "CONTRACT_END_AFTER_START": {
            const start = String(data.dateDebut ?? "");
            const end = String(data.dateFin ?? "");

            if (!start || !end) return false;

            return new Date(end).getTime() > new Date(start).getTime();
          }

          /**
           * CAMPAIGN RULES
           */
          case "CAMPAIGN_END_AFTER_START": {
            const start = String(data.dateDebut ?? "");
            const end = String(data.dateFin ?? "");

            if (!start || !end) return false;

            return new Date(end).getTime() > new Date(start).getTime();
          }

          /**
           * DEFAULT
           */
          default:
            return true;
        }
      },
    };
  }

  static adaptMany(rules: TerragestBusinessRule[]): ERPBusinessRule[] {
    return rules.map((rule) => TerragestBusinessRuleAdapter.adapt(rule));
  }
}
