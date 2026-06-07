const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  modulePage: "src/components/erp/operational/ERPOperationalModulePage.tsx",
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

/**
 * 1. ERPModule.ts : ajouter ERPOperationalBrandingConfig + branding?.
 */
{
  const rel = files.erpModule;
  backup(rel, ".bak-q2d-f-b-operational-branding-contract");

  let content = read(rel);

  if (!content.includes("ERPOperationalBrandingConfig")) {
    const marker = "export interface ERPOperationalModuleConfig {";

    if (!content.includes(marker)) {
      throw new Error("Point insertion introuvable: ERPOperationalModuleConfig");
    }

    const brandingInterface = `export interface ERPOperationalBrandingConfig {
  /**
   * Nom affiché dans l'eyebrow/header opérationnel.
   * Exemple : AMARKHYS, Terragest, ERP.
   */
  brandName?: string;

  /**
   * Libellé de runtime ou contexte technique.
   * Exemple : Runtime ERP, Cockpit opérationnel.
   */
  runtimeLabel?: string;

  /**
   * Libellé complet prioritaire.
   * Si absent, le rendu utilise brandName + runtimeLabel.
   */
  eyebrow?: string;
}

`;

    content = content.replace(marker, brandingInterface + marker);
  }

  if (!content.includes("branding?: ERPOperationalBrandingConfig;")) {
    content = content.replace(
      /export interface ERPOperationalModuleConfig \{\s*/,
      (match) => `${match}  branding?: ERPOperationalBrandingConfig;\n`
    );
  }

  if (!content.includes("branding?: ERPOperationalBrandingConfig;")) {
    throw new Error("branding non ajouté dans ERPOperationalModuleConfig");
  }

  write(rel, content);
}

/**
 * 2. ERPOperationalModulePage.tsx : remplacer le hardcode par config.branding.
 */
{
  const rel = files.modulePage;
  backup(rel, ".bak-q2d-f-b-operational-branding-page");

  let content = read(rel);

  if (!content.includes("const branding = config?.branding")) {
    const marker = `  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    "Vue opérationnelle générée par le Runtime ERP.";`;

    const fallbackMarkerMojibake = `  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    "Vue opérationnelle générée par le Runtime ERP.";`;

    const replacement = `  const branding = config?.branding ?? {};
  const brandName = branding.brandName ?? "ERP";
  const runtimeLabel = branding.runtimeLabel ?? "Runtime ERP";
  const eyebrow = branding.eyebrow ?? \`\${brandName} · \${runtimeLabel}\`;

  const subtitle =
    config?.subtitle ??
    module.metadata.description ??
    \`Vue opérationnelle générée par le \${runtimeLabel}.\`;`;

    if (content.includes(marker)) {
      content = content.replace(marker, replacement);
    } else if (content.includes(fallbackMarkerMojibake)) {
      content = content.replace(fallbackMarkerMojibake, replacement);
    } else {
      throw new Error("Bloc subtitle hardcodé introuvable dans ERPOperationalModulePage");
    }
  }

  content = content.replace("AMARKHYS · Runtime ERP", "{eyebrow}");
  content = content.replace("AMARKHYS · Runtime ERP", "{eyebrow}");

  if (content.includes("AMARKHYS · Runtime ERP") || content.includes("AMARKHYS · Runtime ERP")) {
    throw new Error("Hardcode AMARKHYS Runtime ERP encore présent dans ERPOperationalModulePage");
  }

  if (!content.includes("const eyebrow =")) {
    throw new Error("eyebrow non ajouté dans ERPOperationalModulePage");
  }

  if (!content.includes("{eyebrow}")) {
    throw new Error("{eyebrow} non branché dans le header opérationnel");
  }

  write(rel, content);
}

/**
 * 3. Ajouter branding dans operational des modules.
 */
function insertBranding(content, moduleName) {
  const operationalIndex = content.indexOf("operational:");

  if (operationalIndex < 0) {
    throw new Error("operational introuvable pour " + moduleName);
  }

  const kpisIndex = content.indexOf("kpis:", operationalIndex);

  if (kpisIndex < 0) {
    throw new Error("kpis introuvable pour " + moduleName);
  }

  const operationalBeforeKpis = content.slice(operationalIndex, kpisIndex);

  if (operationalBeforeKpis.includes("branding:")) {
    console.log("[SKIP] branding déjà présent:", moduleName);
    return content;
  }

  const lineStart = content.lastIndexOf("\n", kpisIndex) + 1;
  const indent = content.slice(lineStart, kpisIndex).match(/^\s*/)?.[0] ?? "    ";

  const brandingBlock = `${indent}branding: {
${indent}  brandName: "AMARKHYS",
${indent}  runtimeLabel: "Runtime ERP",
${indent}  eyebrow: "AMARKHYS · Runtime ERP",
${indent}},
`;

  return content.slice(0, lineStart) + brandingBlock + content.slice(lineStart);
}

for (const [name, rel] of [
  ["rendezvous", files.rendezvous],
  ["interventionsauto", files.interventions],
  ["facturesauto", files.factures],
]) {
  backup(rel, ".bak-q2d-f-b-operational-branding-module");

  let content = read(rel);
  content = insertBranding(content, name);

  if (!content.includes("branding:")) {
    throw new Error("branding non ajouté dans " + rel);
  }

  if (!content.includes('brandName: "AMARKHYS"')) {
    throw new Error("brandName AMARKHYS absent dans " + rel);
  }

  write(rel, content);
}

console.log("");
console.log("[DONE] Q2-D-F-B operational.branding ajouté et branché.");
console.log("");
console.log("Next:");
console.log("pnpm build");
