export type ERPTenantStatus =
  | "active"
  | "suspended"
  | "maintenance";

export type ERPTenantPlan =
  | "starter"
  | "business"
  | "enterprise";

export type ERPTenant = {
  id: string;
  key: string;
  name: string;
  status: ERPTenantStatus;
  plan: ERPTenantPlan;
  createdAt: string;
  modules: string[];
};