export type ERPRetryPolicy = {
  maxAttempts: number;
  baseDelayMs: number;
  backoffFactor: number;
};

export const DefaultERPRetryPolicy: ERPRetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 250,
  backoffFactor: 2,
};

export function computeRetryDelay(
  attempt: number,
  policy: ERPRetryPolicy = DefaultERPRetryPolicy
) {
  return policy.baseDelayMs * Math.pow(policy.backoffFactor, Math.max(0, attempt - 1));
}