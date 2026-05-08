import { ERPAccessGuard } from "./guards/ERPAccessGuard";

let seeded = false;

export function seedERPSecurityRuntime() {
  if (seeded) {
    return;
  }

  seeded = true;

  ERPAccessGuard.can("materiels", "read");
  ERPAccessGuard.can("stocks", "execute");
  ERPAccessGuard.can("paiements", "audit");
  ERPAccessGuard.can("contrats", "export");
}