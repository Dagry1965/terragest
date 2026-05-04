// src/platform/rules/monitoring/RuleMonitoring.ts

export class RuleMonitoring {

  static started(
    rule: string
  ) {

    console.log(
      "[RULE STARTED]",
      rule
    );
  }

  static completed(
    rule: string
  ) {

    console.log(
      "[RULE COMPLETED]",
      rule
    );
  }

  static failed(

    rule: string,

    error: unknown
  ) {

    console.error(
      "[RULE FAILED]",
      rule,
      error
    );
  }
}
