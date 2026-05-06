export type RuntimePolicyContext = {
  module: string;
  action: string;
  tenantId?: string;
  role?: string;
  payload?: unknown;
};

export interface Policy {

  name: string;

  enabled: boolean;

  evaluate(
    context: RuntimePolicyContext
  ): Promise<boolean>;
}