Write-Host "=== TERRAGEST_V2 - SETUP ERP TENANT ISOLATION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/tenant" | Out-Null

@'
export type ERPTenant = {
  id: string;

  name: string;

  slug: string;

  createdAt: string;
};

let currentTenant:
  ERPTenant | null = null;

const tenantRegistry:
  ERPTenant[] = [];

export function registerTenant(
  tenant: ERPTenant
) {
  const exists =
    tenantRegistry.find(
      (item) =>
        item.id ===
        tenant.id
    );

  if (exists) {
    return;
  }

  tenantRegistry.push(
    tenant
  );

  console.log(
    "ERP TENANT REGISTERED",
    tenant.name
  );
}

export function setCurrentTenant(
  tenant: ERPTenant
) {
  currentTenant =
    tenant;

  console.log(
    "ERP CURRENT TENANT",
    tenant.name
  );
}

export function getCurrentTenant() {
  return currentTenant;
}

export function getTenants() {
  return tenantRegistry;
}

export function assertTenant() {
  if (!currentTenant) {
    throw new Error(
      "Aucun tenant ERP actif"
    );
  }

  return currentTenant;
}
'@ | Set-Content "src/core/tenant/tenant-isolation-engine.ts"

Write-Host "=== ERP TENANT ISOLATION ENGINE créé avec succès ===" -ForegroundColor Green