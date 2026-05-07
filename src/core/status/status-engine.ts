export type ERPStatusDefinition = {
  value: string;

  label: string;

  color:
    | "gray"
    | "blue"
    | "green"
    | "yellow"
    | "red";

  transitions?: string[];
};

export type ERPModuleStatuses = {
  module: string;

  statuses:
    ERPStatusDefinition[];
};

const statusRegistry:
  ERPModuleStatuses[] = [];

export function registerStatuses(
  config: ERPModuleStatuses
) {
  statusRegistry.push(config);
}

export function getModuleStatuses(
  module: string
) {
  return statusRegistry.find(
    (entry) =>
      entry.module === module
  );
}

export function canTransition(
  module: string,
  from: string,
  to: string
) {
  const config =
    getModuleStatuses(module);

  if (!config) {
    return false;
  }

  const current =
    config.statuses.find(
      (status) =>
        status.value === from
    );

  if (!current) {
    return false;
  }

  return (
    current.transitions?.includes(
      to
    ) ?? false
  );
}
