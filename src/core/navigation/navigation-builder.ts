import { getEnabledModules } from "@/core/modules/module-registry";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export type ERPNavigationItem = {
  label: string;
  href: string;
  group: string;
};

function normalizeGroup(group?: string) {
  if (!group) {
    return "Metier";
  }

  return group
    .replace("SystÃƒÆ’Ã‚¨me", "Systeme")
    .replace("Système", "Systeme")
    .replace("Métier", "Metier")
    .replace("MÃƒÆ’Ã‚©tier", "Metier");
}

function moduleKeyFromHref(href: string) {
  return href
    .split("/")
    .filter(Boolean)[0];
}

export function buildERPNavigation(): ERPNavigationItem[] {
  const staticItems: ERPNavigationItem[] = [
    {
      label: "Cockpit",
      href: "/workspaces/general",
      group: "Pilotage",
    },
    {
      label: "Production",
      href: "/workspaces/production",
      group: "Pilotage",
    },
    {
      label: "Maintenance",
      href: "/workspaces/maintenance",
      group: "Pilotage",
    },
    {
      label: "Finance",
      href: "/workspaces/finance",
      group: "Pilotage",
    },
    {
      label: "Administration",
      href: "/workspaces/administration",
      group: "Systeme",
    },
    {
      label: "Supervision",
      href: "/workspaces/supervision",
      group: "Systeme",
    },
  ].filter((item) => {
    const workspaceKey =
      item.href.split("/").filter(Boolean)[1];

    return (
      !workspaceKey ||
      ERPSessionRuntime.canAccessWorkspace(workspaceKey)
    );
  });

  const moduleItems = getEnabledModules()
    .map((module) => {
      const runtimeModule = module as any;

      const href =
        runtimeModule.routes?.list ?? "/";

      const key =
        runtimeModule.key ??
        runtimeModule.id ??
        moduleKeyFromHref(href);

      return {
        key,
        label:
          runtimeModule.pluralLabel ??
          runtimeModule.label ??
          key,
        href,
        group: normalizeGroup(runtimeModule.group),
      };
    })
    .filter((module) =>
      ERPSessionRuntime.canAccessModule(module.key)
    )
    .map(({ key, ...item }) => item);

  return [
    ...staticItems,
    ...moduleItems,
  ];
}