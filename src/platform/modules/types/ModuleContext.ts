// src/platform/modules/types/ModuleContext.ts

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

export interface ModuleContext {

  domain: string;

  action: string;

  mode:
    ExecutionMode;

  payload?: unknown;

  user?: string;
}
