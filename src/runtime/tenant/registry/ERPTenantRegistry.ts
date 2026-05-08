import type { ERPTenant } from "./ERPTenant";

export const ERPTenantRegistry: ERPTenant[] = [
  {
    id: "tenant_demo",
    key: "demo",
    name: "Terragest Demo",
    status: "active",
    plan: "enterprise",
    createdAt: new Date().toISOString(),
    modules: [
      "exploitations",
      "terrains",
      "materiels",
      "stocks",
      "maintenance",
      "paiements",
    ],
  },

  {
    id: "tenant_agricorp",
    key: "agricorp",
    name: "AgriCorp",
    status: "active",
    plan: "business",
    createdAt: new Date().toISOString(),
    modules: [
      "exploitations",
      "stocks",
      "produits",
    ],
  },

  {
    id: "tenant_farmgroup",
    key: "farmgroup",
    name: "FarmGroup",
    status: "maintenance",
    plan: "starter",
    createdAt: new Date().toISOString(),
    modules: [
      "terrains",
      "materiels",
    ],
  },
];