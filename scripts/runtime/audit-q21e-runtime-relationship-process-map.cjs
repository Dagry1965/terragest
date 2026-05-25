const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const MODULES_DIR = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated"
);

const REPORTS_DIR = path.join(ROOT, "reports");

const OUT_MD = path.join(
  REPORTS_DIR,
  "q21e-runtime-relationship-process-map.md"
);

const OUT_JSON = path.join(
  REPORTS_DIR,
  "q21e-runtime-relationship-process-map.json"
);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(full);
    }

    return [full];
  });
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function rel(file) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function extractModuleKey(content, fallback) {
  const metadataKey =
    content.match(/metadata\s*:\s*{[\s\S]*?key\s*:\s*"([^"]+)"/)?.[1];

  const rootKey =
    content.match(/key\s*:\s*"([^"]+)"/)?.[1];

  return metadataKey || rootKey || fallback;
}

function countMatches(content, regex) {
  return [...content.matchAll(regex)].length;
}

function has(content, pattern) {
  return pattern.test(content);
}

function extractArrayBlock(content, key) {
  const regex = new RegExp(`${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`, "m");
  return content.match(regex)?.[1] ?? "";
}

function extractRelationFields(content) {
  const fields = [];
  const fieldBlocks = [...content.matchAll(/\{\s*key\s*:\s*"([^"]+)"[\s\S]*?type\s*:\s*"relation"[\s\S]*?\}/g)];

  for (const match of fieldBlocks) {
    const block = match[0];
    fields.push({
      key: match[1],
      module: block.match(/module\s*:\s*"([^"]+)"/)?.[1] ?? "",
      hasFilterBy: /filterBy\s*:/.test(block),
      hasExcludeUsedBy: /excludeUsedBy\s*:/.test(block),
      hasAutoFill: /autoFill\s*:/.test(block),
      hasCreate: /create\s*:/.test(block),
    });
  }

  return fields;
}

function extractChildren(content) {
  const children = [];
  const childBlocks = [...content.matchAll(/\{\s*key\s*:\s*"([^"]+)"[\s\S]*?moduleKey\s*:\s*"([^"]+)"[\s\S]*?foreignKey\s*:\s*"([^"]+)"[\s\S]*?\}/g)];

  for (const match of childBlocks) {
    const block = match[0];

    children.push({
      key: match[1],
      moduleKey: match[2],
      foreignKey: match[3],
      hasLabelFields: /labelFields\s*:/.test(block),
      hasSubtitleFields: /subtitleFields\s*:/.test(block),
      hasRelations: /relations\s*:/.test(block),
      hasPrefillFromParent: /prefillFromParent\s*:/.test(block),
      hasLockFields: /lockFields\s*:/.test(block),
      displayIn: block.match(/displayIn\s*:\s*\[([\s\S]*?)\]/)?.[1]?.replace(/\s+/g, " ").trim() ?? "",
      position: block.match(/position\s*:\s*"([^"]+)"/)?.[1] ?? "",
    });
  }

  return children;
}

function scoreModule(item) {
  let score = 0;

  score += item.capabilities.parentContext ? 1 : 0;
  score += item.capabilities.children ? 1 : 0;
  score += item.capabilities.labelFields ? 1 : 0;
  score += item.capabilities.relationFields ? 1 : 0;
  score += item.capabilities.relationFilterBy ? 1 : 0;
  score += item.capabilities.relationExcludeUsedBy ? 1 : 0;
  score += item.capabilities.relationAutoFill ? 1 : 0;
  score += item.capabilities.computedFields ? 1 : 0;
  score += item.capabilities.lockedFields ? 1 : 0;
  score += item.capabilities.workflowActions ? 1 : 0;

  return score;
}

ensureDir(REPORTS_DIR);

const files = walk(MODULES_DIR).filter((file) =>
  file.endsWith(".module.ts")
);

const modules = files.map((file) => {
  const content = read(file);
  const fallback = path.basename(file).replace(".module.ts", "");
  const moduleKey = extractModuleKey(content, fallback);

  const relationFields = extractRelationFields(content);
  const children = extractChildren(content);

  const capabilities = {
    parentContext:
      has(content, /requiresParentContext\s*:\s*true/) ||
      has(content, /allowedParents\s*:/),

    children:
      has(content, /children\s*:/) ||
      children.length > 0,

    labelFields:
      has(content, /labelFields\s*:/),

    subtitleFields:
      has(content, /subtitleFields\s*:/),

    childRelations:
      has(content, /relations\s*:/),

    relationFields:
      relationFields.length > 0,

    relationFilterBy:
      relationFields.some((field) => field.hasFilterBy),

    relationExcludeUsedBy:
      relationFields.some((field) => field.hasExcludeUsedBy),

    relationAutoFill:
      relationFields.some((field) => field.hasAutoFill),

    computedFields:
      has(content, /computedFields\s*:/),

    lockedFields:
      has(content, /lockedFields\s*:/),

    readOnlyFields:
      has(content, /readOnlyFields\s*:/),

    workflowActions:
      has(content, /actions\s*:/) ||
      has(content, /workflows\s*:/),

    businessRules:
      has(content, /businessRules\s*:/),

    formTabs:
      has(content, /tabs\s*:/),

    listFields:
      countMatches(content, /list\s*:\s*{/g),
  };

  return {
    moduleKey,
    file: rel(file),
    score: 0,
    capabilities,
    relationFields,
    children,
    rawCounts: {
      relationFields: relationFields.length,
      children: children.length,
      filterBy: relationFields.filter((field) => field.hasFilterBy).length,
      excludeUsedBy: relationFields.filter((field) => field.hasExcludeUsedBy).length,
      autoFill: relationFields.filter((field) => field.hasAutoFill).length,
      listFields: capabilities.listFields,
    },
  };
});

for (const module of modules) {
  module.score = scoreModule(module);
}

modules.sort((a, b) => {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  return a.moduleKey.localeCompare(b.moduleKey);
});

const families = [
  {
    key: "intervention-rdv-facture",
    modules: ["rendezvous", "interventionsauto", "lignesinterventionauto", "facturesauto", "encaissementsauto", "echeancespaiementauto"],
  },
  {
    key: "stock-fournisseur-reception",
    modules: ["fournisseursauto", "commandesstockauto", "lignescommandestockauto", "receptionsstockauto", "stocksauto", "mouvementsstockauto", "produitsauto"],
  },
  {
    key: "client-vehicule",
    modules: ["clientsauto", "vehicules", "vehiculesauto"],
  },
  {
    key: "paiement-recouvrement",
    modules: ["facturesauto", "encaissementsauto", "echeancespaiementauto"],
  },
];

const familyReport = families.map((family) => {
  const found = modules.filter((module) =>
    family.modules.includes(module.moduleKey)
  );

  return {
    key: family.key,
    expectedModules: family.modules,
    foundModules: found.map((module) => module.moduleKey),
    missingModules: family.modules.filter(
      (key) => !found.some((module) => module.moduleKey === key)
    ),
    modules: found,
  };
});

const json = {
  generatedAt: new Date().toISOString(),
  mode: "REPORT_ONLY",
  summary: {
    filesScanned: files.length,
    modulesScanned: modules.length,
    modulesWithChildren: modules.filter((m) => m.capabilities.children).length,
    modulesWithParentContext: modules.filter((m) => m.capabilities.parentContext).length,
    modulesWithLabelFields: modules.filter((m) => m.capabilities.labelFields).length,
    modulesWithRelationFilterBy: modules.filter((m) => m.capabilities.relationFilterBy).length,
    modulesWithRelationExcludeUsedBy: modules.filter((m) => m.capabilities.relationExcludeUsedBy).length,
    modulesWithRelationAutoFill: modules.filter((m) => m.capabilities.relationAutoFill).length,
    modulesWithComputedFields: modules.filter((m) => m.capabilities.computedFields).length,
  },
  families: familyReport,
  modules,
};

const lines = [];

lines.push("# Q21E — Runtime Relationship Process Map");
lines.push("");
lines.push("Mode: REPORT ONLY. Cet audit ne modifie aucun fichier runtime.");
lines.push("");
lines.push("## Synthèse");
lines.push("");
lines.push(`- Modules scannés: ${json.summary.modulesScanned}`);
lines.push(`- Modules avec enfants: ${json.summary.modulesWithChildren}`);
lines.push(`- Modules avec contexte parent: ${json.summary.modulesWithParentContext}`);
lines.push(`- Modules avec labelFields: ${json.summary.modulesWithLabelFields}`);
lines.push(`- Modules avec relation.filterBy: ${json.summary.modulesWithRelationFilterBy}`);
lines.push(`- Modules avec relation.excludeUsedBy: ${json.summary.modulesWithRelationExcludeUsedBy}`);
lines.push(`- Modules avec relation.autoFill: ${json.summary.modulesWithRelationAutoFill}`);
lines.push(`- Modules avec computedFields: ${json.summary.modulesWithComputedFields}`);
lines.push("");

lines.push("## Familles de processus ERP");
lines.push("");

for (const family of familyReport) {
  lines.push(`### ${family.key}`);
  lines.push("");
  lines.push(`- Modules trouvés: ${family.foundModules.join(", ") || "aucun"}`);
  lines.push(`- Modules manquants: ${family.missingModules.join(", ") || "aucun"}`);
  lines.push("");

  for (const module of family.modules) {
    lines.push(`#### ${module.moduleKey}`);
    lines.push("");
    lines.push(`- Fichier: \`${module.file}\``);
    lines.push(`- Score relationnel: ${module.score}/10`);
    lines.push(`- Parent context: ${module.capabilities.parentContext ? "oui" : "non"}`);
    lines.push(`- Children: ${module.capabilities.children ? "oui" : "non"} (${module.children.length})`);
    lines.push(`- labelFields: ${module.capabilities.labelFields ? "oui" : "non"}`);
    lines.push(`- relation.filterBy: ${module.capabilities.relationFilterBy ? "oui" : "non"}`);
    lines.push(`- relation.excludeUsedBy: ${module.capabilities.relationExcludeUsedBy ? "oui" : "non"}`);
    lines.push(`- relation.autoFill: ${module.capabilities.relationAutoFill ? "oui" : "non"}`);
    lines.push(`- computedFields: ${module.capabilities.computedFields ? "oui" : "non"}`);
    lines.push("");

    if (module.relationFields.length > 0) {
      lines.push("Relations:");
      lines.push("");
      for (const relation of module.relationFields) {
        const flags = [
          relation.hasFilterBy ? "filterBy" : "",
          relation.hasExcludeUsedBy ? "excludeUsedBy" : "",
          relation.hasAutoFill ? "autoFill" : "",
        ].filter(Boolean);

        lines.push(
          `- \`${relation.key}\` → \`${relation.module || "?"}\`${flags.length ? " (" + flags.join(", ") + ")" : ""}`
        );
      }
      lines.push("");
    }

    if (module.children.length > 0) {
      lines.push("Enfants déclarés:");
      lines.push("");
      for (const child of module.children) {
        const flags = [
          child.hasLabelFields ? "labelFields" : "",
          child.hasSubtitleFields ? "subtitleFields" : "",
          child.hasRelations ? "relations" : "",
          child.hasPrefillFromParent ? "prefillFromParent" : "",
          child.hasLockFields ? "lockFields" : "",
        ].filter(Boolean);

        lines.push(
          `- \`${child.key}\` → \`${child.moduleKey}\` via \`${child.foreignKey}\`${flags.length ? " (" + flags.join(", ") + ")" : ""}`
        );
      }
      lines.push("");
    }
  }
}

lines.push("## Modules triés par maturité relationnelle");
lines.push("");

for (const module of modules) {
  lines.push(
    `- ${module.score}/10 — \`${module.moduleKey}\` — ${module.file}`
  );
}

fs.writeFileSync(OUT_JSON, JSON.stringify(json, null, 2), "utf8");
fs.writeFileSync(OUT_MD, lines.join("\n"), "utf8");

console.log("[Q21E_AUDIT_RUNTIME_RELATIONSHIP_PROCESS_MAP]");
console.log(`Modules scanned: ${modules.length}`);
console.log(`Modules with children: ${json.summary.modulesWithChildren}`);
console.log(`Modules with parent context: ${json.summary.modulesWithParentContext}`);
console.log(`Modules with labelFields: ${json.summary.modulesWithLabelFields}`);
console.log("");
console.log(`[REPORT] ${path.relative(ROOT, OUT_MD)}`);
console.log(`[JSON]   ${path.relative(ROOT, OUT_JSON)}`);
console.log("");
console.log("Mode: REPORT ONLY. This audit does not block commits yet.");