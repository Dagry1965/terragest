import { getEnabledModules } from "@/core/modules/module-registry";

export type ERPNavigationItem = {
  label: string;
  href: string;
  group: string;
};

export function buildERPNavigation(): ERPNavigationItem[] {
  const staticItems: ERPNavigationItem[] = [
    {
      label: "Tableau de bord",
      href: "/",
      group: "Pilotage",
    },
    {
      label: "Workflows",
      href: "/workflows",
      group: "SystÃ¨me",
    },
    {
      label: "Supervision",
      href: "/supervision",
      group: "SystÃ¨me",
    },
    {
      label: "Admin",
      href: "/admin",
      group: "SystÃ¨me",
    },
  ];

  const moduleItems = getEnabledModules().map((module) => ({
    label: module.pluralLabel,
    href: module.routes.list,
    group: module.group,
  }));

  return [...staticItems, ...moduleItems];
}
