// src/platform/rules/audit/RuleAudit.ts

export class RuleAudit {

  static log(

    action: string,

    payload?: unknown
  ) {

    console.log(
      "[RULE AUDIT]",
      action,
      payload
    );
  }
}
