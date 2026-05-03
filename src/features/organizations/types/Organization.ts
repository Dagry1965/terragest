import {
  BaseAuditEntity,
}
from "@/types/BaseEntity";

export type OrganizationPlan =
  | "free"
  | "pro"
  | "enterprise";

export type Organization =
BaseAuditEntity & {

  name: string;

  ownerId: string;

  tenantId: string;

  plan: OrganizationPlan;

  active: boolean;
};