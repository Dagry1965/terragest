// src/platform/governance/tenants/TenantRegistry.ts

class TenantRegistryManager {

  private tenants:
    string[] = [];

  register(
    tenant: string
  ) {

    if (
      !this.tenants.includes(
        tenant
      )
    ) {

      this.tenants.push(
        tenant
      );
    }
  }

  exists(
    tenant: string
  ) {

    return this.tenants.includes(
      tenant
    );
  }
}

export const TenantRegistry =
  new TenantRegistryManager();
