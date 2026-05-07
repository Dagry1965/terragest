Write-Host "=== TERRAGEST_V2 - SETUP ERP HOOKS SYSTEM ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/hooks" | Out-Null

@'
export type ERPHookContext = {
  module: string;
  action: string;
  data?: any;
};

export type ERPBeforeHook =
  (context: ERPHookContext) =>
    Promise<void>;

export type ERPAfterHook =
  (context: ERPHookContext) =>
    Promise<void>;

export type ERPModuleHooks = {
  beforeCreate?: ERPBeforeHook[];
  afterCreate?: ERPAfterHook[];

  beforeUpdate?: ERPBeforeHook[];
  afterUpdate?: ERPAfterHook[];

  beforeDelete?: ERPBeforeHook[];
  afterDelete?: ERPAfterHook[];
};

const hooksRegistry:
  Record<string, ERPModuleHooks> = {};

export function registerModuleHooks(
  module: string,
  hooks: ERPModuleHooks
) {
  hooksRegistry[module] = hooks;
}

export function getModuleHooks(
  module: string
) {
  return hooksRegistry[module];
}

export async function executeHooks(
  module: string,
  hookName: keyof ERPModuleHooks,
  context: ERPHookContext
) {
  const moduleHooks =
    hooksRegistry[module];

  if (!moduleHooks) {
    return;
  }

  const hooks =
    moduleHooks[hookName];

  if (!hooks) {
    return;
  }

  for (const hook of hooks) {
    await hook(context);
  }
}
'@ | Set-Content "src/core/hooks/erp-hooks.ts"

@'
import {
  registerModuleHooks,
} from "@/core/hooks/erp-hooks";

registerModuleHooks(
  "materiels",
  {
    afterUpdate: [
      async (context) => {
        const etat =
          context.data?.etat;

        if (etat === "panne") {
          console.log(
            "HOOK ERP : matériel en panne"
          );

          console.log(
            "SUPERVISION CRITICAL EVENT"
          );

          console.log(
            "WORKFLOW MAINTENANCE START"
          );
        }
      },
    ],
  }
);

registerModuleHooks(
  "stocks",
  {
    afterCreate: [
      async (context) => {
        const quantite =
          context.data?.quantite;

        if (
          typeof quantite === "number" &&
          quantite < 10
        ) {
          console.log(
            "HOOK ERP : stock faible"
          );

          console.log(
            "WORKFLOW REAPPROVISIONNEMENT"
          );
        }
      },
    ],
  }
);

registerModuleHooks(
  "contrats",
  {
    beforeUpdate: [
      async (context) => {
        console.log(
          "HOOK ERP : vérification expiration contrat"
        );
      },
    ],
  }
);
'@ | Set-Content "src/core/hooks/register-hooks.ts"

Write-Host "=== ERP HOOKS SYSTEM créé avec succès ===" -ForegroundColor Green