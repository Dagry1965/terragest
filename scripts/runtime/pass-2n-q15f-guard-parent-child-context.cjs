const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[Q15F_WRITTEN]", path.relative(ROOT, file));
}

function backup(file) {
  const backupPath = file + ".bak-q15f-parent-child-context";
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log("[Q15F_BACKUP]", path.relative(ROOT, backupPath));
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error("[Q15F_MISSING_PATTERN] " + label);
  }

  return content.replace(from, to);
}

backup(target);

let content = read(target);

if (!content.includes("@/runtime/context")) {
  content = replaceOnce(
    content,
`import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

`,
`import {
  FirestoreRuntimeRepository,
} from "@/runtime/firestore/FirestoreRuntimeRepository";

import {
  RuntimeContextEnforcer,
} from "@/runtime/context";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

`,
    "imports"
  );
}

if (!content.includes("Q15F_PARENT_CHILD_CONTEXT_GUARD")) {
  const insertAfterAsString = `function isRendezvousModule(module: ERPModule): boolean {`;

  const guardCode = `function getModuleByKey(
  moduleKey: string
): ERPModule | null {
  return (
    allERPModules.find(
      (item) => item.metadata.key === moduleKey
    ) ?? null
  );
}

function hasAnyParentContextField(
  data: RuntimeRecord
): boolean {
  return Boolean(
    asString(data.parentModuleKey) ||
    asString(data.parentRecordId) ||
    asString(data.parentForeignKey)
  );
}

async function guardParentChildContextMutation(
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

  const parentRecordId =
    asString(data.parentRecordId);

  const parentForeignKey =
    asString(data.parentForeignKey);

  if (
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

  if (
    childForeignValue &&
    childForeignValue !== parentRecordId
  ) {
    throw new Error(
      "Contexte parent incohérent : la référence enfant ne correspond pas au parent."
    );
  }

  const parentModule =
    getModuleByKey(parentModuleKey);

  if (!parentModule) {
    throw new Error(
      "Contexte parent invalide : module parent introuvable."
    );
  }

  const parentRecord =
    await FirestoreRuntimeRepository.findById(
      parentModule,
      parentRecordId
    );

  if (!parentRecord) {
    throw new Error(
      "Contexte parent invalide : enregistrement parent introuvable."
    );
  }

  RuntimeContextEnforcer.assertRecordInContext(
    parentModule,
    parentRecord
  );

  return {
    ...data,
    [parentForeignKey]: parentRecordId,
    parentModuleKey,
    parentRecordId,
    parentForeignKey,
  };
}

`;

  content = replaceOnce(
    content,
    insertAfterAsString,
    guardCode + insertAfterAsString,
    "insert parent child guard"
  );
}

if (!content.includes("guardParentChildContextMutation(")) {
  content = replaceOnce(
    content,
`export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (!isRendezvousModule(module)) {
    return data;
  }

  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  return guardRendezvousMutation(
    module,
    data,
    context
  );
}
`,
`export async function processRuntimeBeforeMutationGuards(
  module: ERPModule,
  data: Record<string, unknown>,
  context: RuntimeBeforeMutationGuardContext
): Promise<Record<string, unknown>> {
  if (
    context.operation !== "create" &&
    context.operation !== "update"
  ) {
    return data;
  }

  const parentGuardedData =
    await guardParentChildContextMutation(
      module,
      data,
    );

  if (!isRendezvousModule(module)) {
    return parentGuardedData;
  }

  return guardRendezvousMutation(
    module,
    parentGuardedData,
    context
  );
}
`,
    "processRuntimeBeforeMutationGuards body"
  );
}

write(target, content);

console.log("");
console.log("[Q15F_DONE] Parent/child context guard installed.");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\check-encoding.cjs");
console.log("  pnpm build");