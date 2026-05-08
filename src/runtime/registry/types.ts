import type {
  ERPGeneratedSchema,
} from "@/runtime/ui-generation";

export type ERPRegistryAction = {
  key: string;
  label: string;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "danger";
};

export type ERPRegistryPermission = {
  key: string;
  label: string;
};

export type ERPRegistryWorkflow = {
  key: string;
  label: string;
};

export type ERPRegistryAutomation = {
  key: string;
  label: string;
};

export type ERPRegistryEvent = {
  key: string;
  label: string;
};

export type ERPRegistryNavigationItem = {
  key: string;
  label: string;
  href: string;
  icon?: string;
};

export type ERPRegistryModule = {
  key: string;
  label: string;

  description?: string;

  schema: ERPGeneratedSchema;

  navigation: ERPRegistryNavigationItem[];

  actions: ERPRegistryAction[];

  permissions: ERPRegistryPermission[];

  workflows: ERPRegistryWorkflow[];

  automation: ERPRegistryAutomation[];

  events: ERPRegistryEvent[];
};