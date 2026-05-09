import {
  erpPolicyEngine,
} from "./ERPPolicyEngine";

export class ERPRuntimeAuthorizationBridge {

  can(
    module: string,
    action: string,
    context:
      Record<string, unknown>
  ) {

    return erpPolicyEngine
      .authorize(
        module,
        action,
        context
      );
  }
}

export const erpRuntimeAuthorizationBridge =
  new ERPRuntimeAuthorizationBridge();