export type CheckoutPlan =
  | "free"
  | "pro"
  | "enterprise";

export type CheckoutSession = {

  url: string;

  plan: CheckoutPlan;
};