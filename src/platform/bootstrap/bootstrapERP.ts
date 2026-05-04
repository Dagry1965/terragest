// src/platform/bootstrap/bootstrapERP.ts

import { loadDomains }
from "@/platform/bootstrap/loadDomains";

import { registerPolicies }
from "@/platform/governance/registerPolicies";

export async function bootstrapERP() {

  console.log(
    "[BOOTSTRAP ERP]"
  );

  registerPolicies();

  await loadDomains();

  console.log(
    "[BOOTSTRAP ERP READY]"
  );
}
