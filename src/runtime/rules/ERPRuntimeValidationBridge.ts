import {
  erpBusinessRuleEngine,
} from "./ERPBusinessRuleEngine";

export class ERPRuntimeValidationBridge {

  validate(
    module: string,
    data: Record<string, unknown>
  ) {

    return erpBusinessRuleEngine
      .validate(
        module,
        data
      );
  }
}

export const erpRuntimeValidationBridge =
  new ERPRuntimeValidationBridge();