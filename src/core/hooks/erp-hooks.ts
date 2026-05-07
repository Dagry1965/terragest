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
