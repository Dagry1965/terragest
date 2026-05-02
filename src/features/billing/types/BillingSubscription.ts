import { SubscriptionPlan } from "@/features/billing/types/SubscriptionPlan";

export interface BillingSubscription {

  id: string;

  organisationId: string;

  plan: SubscriptionPlan;

  actif: boolean;

  utilisateursMax: number;

  exploitationsMax: number;

  terrainsMax: number;

  expirationDate?: string;

  createdAt: string;
}
