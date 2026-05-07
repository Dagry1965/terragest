import {
  runtimeBusinessRules,
}
from "@/runtime/business-rules/runtimeBusinessRules";

export class RuntimeBusinessRulesEngine {

  static async execute(

    event: string,

    payload: any,

  ) {

    const rules =
      runtimeBusinessRules.filter(

        (rule) =>

          rule.event ===
            event
      );

    for (
      const rule of rules
    ) {

      try {

        const valid =
          rule.condition(
            payload
          );

        if (valid) {

          console.log(
            "Business Rule Triggered",
            rule.id
          );

          await rule.action(
            payload
          );
        }

      } catch (error) {

        console.error(
          "Business Rule Error",
          error
        );
      }
    }
  }
}
