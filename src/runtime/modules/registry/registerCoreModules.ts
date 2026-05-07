import { ERPModuleRegistry } from "../ERPModuleRegistry";

const modules = [
  "dashboard",
  "exploitations",
  "terrains",
  "materiels",
  "maintenance",
  "interventions",
  "stocks",
  "produits",
  "notifications",
  "runtime-supervision",
];

for (const code of modules) {
  ERPModuleRegistry.register({
    code,
    name: code
      .replace("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    routes: [`/${code}`],
    permissions: [`${code}.read`, `${code}.write`],
    workflows: [],
    rules: [],
    analytics: [],
    notifications: [],
  });
}
