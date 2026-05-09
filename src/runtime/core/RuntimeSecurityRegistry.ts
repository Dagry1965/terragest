export interface RuntimeSecurityRule {

  id: string;

  moduleId?: string;

  type:
    | "rbac"
    | "tenant"
    | "quota"
    | "rate-limit"
    | "audit";

  enabled: boolean;

  config?: Record<
    string,
    unknown
  >;
}

export class RuntimeSecurityRegistry {

  private rules:
    RuntimeSecurityRule[] = [];

  registerRule(
    rule: RuntimeSecurityRule
  ) {

    this.rules.push(rule);
  }

  getRules() {

    return this.rules;
  }

  getEnabledRules() {

    return this.rules.filter(
      rule =>
        rule.enabled
    );
  }

  getModuleRules(
    moduleId: string
  ) {

    return this.rules.filter(
      rule =>
        rule.moduleId === moduleId
    );
  }
}

export const runtimeSecurityRegistry =
  new RuntimeSecurityRegistry();