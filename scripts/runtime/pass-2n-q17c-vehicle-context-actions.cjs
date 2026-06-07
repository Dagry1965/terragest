/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function patchERPModuleTypes() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "ERPModule.ts"
  );

  backup(file, "q17c-child-prefill-types");

  let content = read(file);

  if (!content.includes("prefillFromParent?:")) {
    content = content.replace(
      `  foreignKey: string;`,
      `  foreignKey: string;
  prefillFromParent?: Record<string, string>;
  lockFields?: string[];`
    );
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchRelatedRecordsPanel() {
  const file = p(
    "src",
    "components",
    "erp",
    "runtime",
    "ERPRelatedRecordsPanel.tsx"
  );

  backup(file, "q17c-child-prefill");

  let content = read(file);

  const oldFunction = `function buildCreateHref(
  child: ERPCompositionChild,
  parentRecordId: string,
  parentModuleKey: string,
  mode: "detail" | "edit"
): string {
  const params = new URLSearchParams();

  params.set(child.foreignKey, parentRecordId);

  // Q15E_PARENT_CHILD_CONTEXT
  // Transport générique du contexte parent vers la création enfant.
  params.set("parentModuleKey", parentModuleKey);
  params.set("parentRecordId", parentRecordId);
  params.set("parentForeignKey", child.foreignKey);

  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" +
      parentRecordId +
      (mode === "edit" ? "/edit" : "")
  );

  params.set("lockFields", child.foreignKey);

  return "/" + child.moduleKey + "/nouveau?" + params.toString();
}`;

  const newFunction = `function getParentValueForPrefill(
  parentRecord: Record<string, unknown>,
  parentRecordId: string,
  sourceField: string
): unknown {
  if (
    sourceField === "id" ||
    sourceField === "_id" ||
    sourceField === "$id"
  ) {
    return parentRecordId;
  }

  return parentRecord[sourceField];
}

function buildCreateHref(
  child: ERPCompositionChild,
  parentRecord: Record<string, unknown>,
  parentRecordId: string,
  parentModuleKey: string,
  mode: "detail" | "edit"
): string {
  const params = new URLSearchParams();

  params.set(child.foreignKey, parentRecordId);

  const prefillFromParent =
    child.prefillFromParent ?? {};

  Object.entries(prefillFromParent).forEach(
    ([targetField, sourceField]) => {
      const value =
        getParentValueForPrefill(
          parentRecord,
          parentRecordId,
          sourceField
        );

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.set(
          targetField,
          String(value)
        );
      }
    }
  );

  // Q15E_PARENT_CHILD_CONTEXT
  // Transport générique du contexte parent vers la création enfant.
  params.set("parentModuleKey", parentModuleKey);
  params.set("parentRecordId", parentRecordId);
  params.set("parentForeignKey", child.foreignKey);

  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" +
      parentRecordId +
      (mode === "edit" ? "/edit" : "")
  );

  const lockFields =
    child.lockFields?.length
      ? child.lockFields
      : [child.foreignKey];

  params.set(
    "lockFields",
    Array.from(new Set(lockFields)).join(",")
  );

  return "/" + child.moduleKey + "/nouveau?" + params.toString();
}`;

  if (content.includes(oldFunction)) {
    content = content.replace(oldFunction, newFunction);
  } else if (!content.includes("prefillFromParent")) {
    throw new Error("[ERPRelatedRecordsPanel] buildCreateHref pattern introuvable");
  }

  content = replaceOnce(
    content,
    `      buildCreateHref(
        child,
        parentRecordId,
        parentModuleKey,
        mode
      ),`,
    `      buildCreateHref(
        child,
        parentRecord,
        parentRecordId,
        parentModuleKey,
        mode
      ),`,
    "update buildCreateHref call"
  );

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function patchVehiculesModule() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "vehicules",
    "vehicules.module.ts"
  );

  backup(file, "q17c-vehicle-context-actions");

  let content = read(file);

  if (!content.includes('key: "rendezvous"')) {
    const marker = `    children: [
      {`;

    const insertion = `    children: [
      {
        key: "rendezvous",
        moduleKey: "rendezvous",
        foreignKey: "vehiculeId",
        title: "Rendez-vous du véhicule",
        createLabel: "Ajouter un rendez-vous pour ce véhicule",
        displayIn: [
          "detail",
          "edit",
        ],
        position: "after",
        lazy: true,
        mode: "readonly",
        allowCreate: true,
        badgeLabel: "rendez-vous liés",
        description: "Crée un rendez-vous dans le contexte du véhicule avec client et véhicule préremplis.",
        openLabel: "Ouvrir rendez-vous",
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: [
          "clientId",
          "vehiculeId",
        ],
        labelFields: [
          "dateRendezVous",
          "heureRendezVous",
          "typeService",
          "statut",
        ],
        subtitleFields: [
          "motif",
          "statut",
        ],
      },
      {`;

    content = replaceOnce(
      content,
      marker,
      insertion,
      "insert rendezvous child"
    );
  }

  if (!content.includes("Ajouter une intervention pour ce véhicule")) {
    content = content.replace(
      `        createLabel: "Ajouter une intervention",`,
      `        createLabel: "Ajouter une intervention pour ce véhicule",
        allowCreate: true,
        prefillFromParent: {
          vehiculeId: "id",
          clientId: "clientId",
        },
        lockFields: [
          "clientId",
          "vehiculeId",
        ],`
    );
  }

  write(file, content);
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function main() {
  console.log("");
  console.log("[PASS] 2N-Q17C - Vehicle context actions");

  patchERPModuleTypes();
  patchRelatedRecordsPanel();
  patchVehiculesModule();

  console.log("");
  console.log("[Q17C_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester fiche vehicule -> ajouter RDV / intervention");
}

main();