const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "ERPModule.ts"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12b-composition-types`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

if (!content.includes("export type ERPCompositionDisplayMode")) {
  const compositionTypes = `
export type ERPCompositionDisplayMode =
  | "inline"
  | "card"
  | "badge";

export type ERPCompositionRenderMode =
  | "detail"
  | "edit";

export type ERPCompositionPosition =
  | "before"
  | "after";

export interface ERPCompositionBreadcrumb {
  field: string;
  moduleKey: string;
  labelFields: string[];
  hrefPattern?: string;
}

export interface ERPCompositionRelation {
  field: string;
  moduleKey: string;
  labelFields: string[];
  snapshotFields?: string[];
  displayAs?: ERPCompositionDisplayMode;
  lockDerivedFields?: boolean;
}

export interface ERPCompositionChild {
  key: string;
  moduleKey: string;
  foreignKey: string;
  title: string;
  createLabel?: string;
  displayIn?: ERPCompositionRenderMode[];
  position?: ERPCompositionPosition;
  lazy?: boolean;
  totalField?: string;
  relations?: ERPCompositionRelation[];
}

export interface ERPModuleComposition {
  labelFields?: string[];
  breadcrumbs?: ERPCompositionBreadcrumb[];
  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  children?: ERPCompositionChild[];
}

`;

  content = content.replace(
    "export interface ERPModule {",
    compositionTypes + "export interface ERPModule {"
  );
}

if (!content.includes("composition?: ERPModuleComposition;")) {
  content = content.replace(
    /(\s+relations\?: ERPModuleRelation\[\];\s+)/,
    `$1\n  composition?: ERPModuleComposition;\n`
  );
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: ERPModule composition types ajoutés.");