// src/platform/bootstrap/bootstrapERP.ts

import { loadDomains }
from "@/platform/bootstrap/loadDomains";

export async function bootstrapERP() {

  console.log(
    "[BOOTSTRAP ERP]"
  );

  await loadDomains();

  console.log(
    "[BOOTSTRAP ERP READY]"
  );
}
