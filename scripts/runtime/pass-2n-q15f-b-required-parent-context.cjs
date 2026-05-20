const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: path.join(ROOT, "src", "runtime", "modules", "ERPModule.ts"),
  lignesModule: path.join(
    ROOT,
    "src",
    "runtime",
    "modules",
    "generated",
    "lignesinterventionauto",
    "lignesinterventionauto.module.ts"
  ),
  guards: path.join(
    ROOT,
    "src",
    "runtime",
    "guards",
    "processRuntimeBeforeMutationGuards.ts"
  ),
};

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[Q15F_B_WRITTEN]", path.relative(ROOT, file));
}

function backup(file) {
  const backupPath = file + ".bak-q15f-b-required-parent-context";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log("[Q15F_B_BACKUP]", path.relative(ROOT, backupPath));
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error("[Q15F_B_MISSING_PATTERN] " + label);
  }

  return content.replace(from, to);
}

// 1. Types ERPModule
backup(files.erpModule);

let erpModule = read(files.erpModule);

if (!erpModule.includes("export interface ERPCompositionRequiredParent")) {
  erpModule = replaceOnce(
    erpModule,
`export interface ERPModuleComposition {
  labelFields?: string[];
  breadcrumbs?: ERPCompositionBreadcrumb[];
  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  readOnlyFields?: string[];
  allowOverride?: string[];
  children?: ERPCompositionChild[];
}
`,
`export interface ERPCompositionRequiredParent {
  moduleKey: string;
  foreignKey: string;
}

export interface ERPModuleComposition {
  labelFields?: string[];
  breadcrumbs?: ERPCompositionBreadcrumb[];
  relations?: ERPCompositionRelation[];
  lockedFields?: string[];
  readOnlyFields?: string[];
  allowOverride?: string[];
  children?: ERPCompositionChild[];

  /**
   * Q15F-B_REQUIRED_PARENT_CONTEXT
   * Quand true, le module ne peut être créé/modifié que depuis un parent valide.
   */
  requiresParentContext?: boolean;

  /**
   * Parents autorisés pour ce module enfant.
   * Exemple : lignesinterventionauto -> interventionsauto via interventionId.
   */
  allowedParents?: ERPCompositionRequiredParent[];
}
`,
    "ERPModuleComposition"
  );
}

write(files.erpModule, erpModule);

// 2. Déclaration parent obligatoire dans lignesinterventionauto
backup(files.lignesModule);

let lignesModule = read(files.lignesModule);

if (!lignesModule.includes("Q15F_B_REQUIRED_PARENT_CONTEXT")) {
  lignesModule = replaceOnce(
    lignesModule,
`  composition: {
    labelFields: [
`,
`  composition: {
    // Q15F_B_REQUIRED_PARENT_CONTEXT
    // Une ligne d'intervention doit toujours être créée dans le contexte d'une intervention parente.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "interventionsauto",
        foreignKey: "interventionId",
      },
    ],

    labelFields: [
`,
    "lignesinterventionauto composition"
  );
}

write(files.lignesModule, lignesModule);

// 3. Guard parent obligatoire
backup(files.guards);

let guards = read(files.guards);

if (!guards.includes("Q15F_B_REQUIRED_PARENT_CONTEXT_GUARD")) {
  guards = replaceOnce(
    guards,
`async function guardParentChildContextMutation(
  module: ERPModule,
  data: RuntimeRecord
): Promise<RuntimeRecord> {
  // Q15F_PARENT_CHILD_CONTEXT_GUARD
  // Sécurise les créations/modifications enfant quand un contexte parent est transmis.
  if (!hasAnyParentContextField(data)) {
    return data;
  }

  const parentModuleKey =
    asString(data.parentModuleKey);
`,
`async function guardParentChildContextMutation(
  module: ERPModule,
  data: RuntimeRecord
): Promise<RuntimeRecord> {
  // Q15F_PARENT_CHILD_CONTEXT_GUARD
  // Sécurise les créations/modifications enfant quand un contexte parent est transmis.

  // Q15F_B_REQUIRED_PARENT_CONTEXT_GUARD
  // Si le module déclare requiresParentContext, le parent devient obligatoire.
  const requiresParentContext =
    Boolean(module.composition?.requiresParentContext);

  const allowedParents =
    module.composition?.allowedParents ?? [];

  const hasParentContext =
    hasAnyParentContextField(data);

  if (!hasParentContext && !requiresParentContext) {
    return data;
  }

  if (!hasParentContext && requiresParentContext) {
    throw new Error(
      "Contexte parent obligatoire : cet enregistrement doit être créé depuis son parent métier."
    );
  }

  const parentModuleKey =
    asString(data.parentModuleKey);
`,
    "guard early parent context"
  );

  guards = replaceOnce(
    guards,
`  if (
    !parentModuleKey ||
    !parentRecordId ||
    !parentForeignKey
  ) {
    throw new Error(
      "Contexte parent incomplet : impossible d’enregistrer cet enfant sans parent valide."
    );
  }

  const childForeignValue =
    asString(data[parentForeignKey]);
`,
`  if (
    !parentModuleKey ||
    !parentRecordId ||
    !parentForeignKey
  ) {
    throw new Error(
      "Contexte parent incomplet : impossible d’enregistrer cet enfant sans parent valide."
    );
  }

  if (allowedParents.length > 0) {
    const parentAllowed =
      allowedParents.some((parent) =>
        parent.moduleKey === parentModuleKey &&
        parent.foreignKey === parentForeignKey
      );

    if (!parentAllowed) {
      throw new Error(
        "Contexte parent refusé : ce module enfant ne peut pas être rattaché à ce parent."
      );
    }
  }

  const childForeignValue =
    asString(data[parentForeignKey]);
`,
    "guard allowed parents"
  );
}

write(files.guards, guards);

console.log("");
console.log("[Q15F_B_DONE] Required parent context metadata + guard installed.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\check-encoding.cjs");
console.log("  pnpm build");