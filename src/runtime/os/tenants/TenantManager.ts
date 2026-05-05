export class TenantManager {

  private currentTenant:
    string | null = null;

  setTenant(
    tenantId: string
  ) {

    this.currentTenant =
      tenantId;

    console.log(
      "[Tenant]",
      tenantId
    );
  }

  getTenant() {

    return this.currentTenant;
  }
}
