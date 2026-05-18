const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts"
);

let content = fs.readFileSync(target, "utf8");

if (!content.includes('from "@/runtime/dashboard/generic/ERPDashboardModuleResolver"')) {
  content = content.replace(
`import { RuntimeDataBinding } from "@/runtime/data-binding";

import { allERPModules } from "../definitions/coreModules";`,
`import { RuntimeDataBinding } from "@/runtime/data-binding";
import { resolveDashboardModule } from "@/runtime/dashboard/generic/ERPDashboardModuleResolver";

import { allERPModules } from "../definitions/coreModules";`
  );
}

if (!content.includes("static resolveModule(")) {
  content = content.replace(
`export class ERPRelationDataLoader {
  static async load(moduleKey: string) {`,
`export class ERPRelationDataLoader {
  static resolveModule(moduleKey: string) {
    return (
      resolveDashboardModule(moduleKey) ??
      allERPModules.find(
        (item) => item.metadata.key === moduleKey
      ) ??
      null
    );
  }

  static async load(moduleKey: string) {`
  );
}

content = content.replace(
`    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return [];
    }`,
`    const module =
      ERPRelationDataLoader.resolveModule(moduleKey);

    if (!module) {
      return [];
    }`
);

content = content.replace(
`    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return "";
    }`,
`    const module =
      ERPRelationDataLoader.resolveModule(moduleKey);

    if (!module) {
      return "";
    }`
);

fs.writeFileSync(target, content, "utf8");

console.log("OK: ERPRelationDataLoader now uses dashboard module resolver first.");