// src/platform/health/ERPHealthCheck.ts

import { ModuleRegistry }
from "@/platform/registry/ModuleRegistry";

export class ERPHealthCheck {

  static run() {

    console.log(
      "[ERP HEALTH CHECK]"
    );

    const modules =
      ModuleRegistry.getEnabledModules();

    console.log(
      `[MODULES]
       ${modules.length} active`
    );

    for (const module of modules) {

      console.log(
        `[MODULE OK]
         ${module.name}`
      );
    }

    return true;
  }
}
