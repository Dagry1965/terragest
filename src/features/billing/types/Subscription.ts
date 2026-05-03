import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type BillingPlan =
  | "free"
  | "pro"
  | "enterprise";

export type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "cancelled";

export type Subscription =
BaseAuditEntity & {

  organizationId: string;

  tenantId: string;

  plan: BillingPlan;

  status: SubscriptionStatus;

  seats: number;

  currentPeriodEnd: string;
};