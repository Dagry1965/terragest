const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  expanded: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  rendezvous: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

function abs(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = abs(rel);
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(abs(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

function backup(rel, suffix) {
  const file = abs(rel);
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", rel + suffix);
}

function addOpenLabelAfterCreateLabel(content, createLabel, openLabel) {
  const target = `createLabel: "${createLabel}",`;

  if (!content.includes(target)) {
    console.log("[SKIP] createLabel introuvable:", createLabel);
    return content;
  }

  const index = content.indexOf(target);
  const after = content.slice(index, index + 300);

  if (after.includes("openLabel:")) {
    console.log("[SKIP] openLabel déjà proche de:", createLabel);
    return content;
  }

  return content.replace(
    target,
    `${target}
        openLabel: "${openLabel}",`
  );
}

/**
 * 1. ERPOperationalExpandedChildren :
 * supprimer la logique métier hardcodée et utiliser child.openLabel.
 */
{
  const rel = files.expanded;
  backup(rel, ".bak-q2d-b-open-label-metadata-driven");

  let content = read(rel);

  content = content.replace(
    /function getOpenLabel\(moduleKey: string\): string \{[\s\S]*?\n\}/,
    `function getOpenLabel(child: ERPCompositionChild): string {
  return child.openLabel ?? "Ouvrir";
}`
  );

  content = content.replace(
    /getOpenLabel\(([^)]*?moduleKey[^)]*?)\)/g,
    "getOpenLabel(child)"
  );

  content = content.replace(
    /getOpenLabel\(group\.module\.metadata\.key\)/g,
    "getOpenLabel(group.child)"
  );

  content = content.replace(
    /getOpenLabel\(child\.moduleKey\)/g,
    "getOpenLabel(child)"
  );

  if (content.includes("Ouvrir intervention") || content.includes("Ouvrir facture")) {
    throw new Error("Labels hardcodés encore présents dans ERPOperationalExpandedChildren.tsx");
  }

  if (!content.includes('return child.openLabel ?? "Ouvrir";')) {
    throw new Error("getOpenLabel metadata-driven non appliqué.");
  }

  write(rel, content);
}

/**
 * 2. Metadata rendezvous : enfant intervention.
 */
{
  const rel = files.rendezvous;
  backup(rel, ".bak-q2d-b-open-labels");

  let content = read(rel);

  content = addOpenLabelAfterCreateLabel(
    content,
    "Créer une intervention",
    "Ouvrir intervention"
  );

  write(rel, content);
}

/**
 * 3. Metadata interventions : enfants lignes + factures.
 */
{
  const rel = files.interventions;
  backup(rel, ".bak-q2d-b-open-labels");

  let content = read(rel);

  content = addOpenLabelAfterCreateLabel(
    content,
    "Ajouter une ligne",
    "Ouvrir ligne"
  );

  content = addOpenLabelAfterCreateLabel(
    content,
    "Ajouter une facture",
    "Ouvrir facture"
  );

  write(rel, content);
}

/**
 * 4. Metadata factures : enfants encaissements + échéances.
 */
{
  const rel = files.factures;
  backup(rel, ".bak-q2d-b-open-labels");

  let content = read(rel);

  content = addOpenLabelAfterCreateLabel(
    content,
    "Ajouter un encaissement",
    "Ouvrir encaissement"
  );

  content = addOpenLabelAfterCreateLabel(
    content,
    "Ajouter une échéance",
    "Ouvrir échéance"
  );

  write(rel, content);
}

console.log("");
console.log("[DONE] Q2-D-B openLabel metadata-driven appliqué.");
console.log("");
console.log("Next:");
console.log("pnpm build");
