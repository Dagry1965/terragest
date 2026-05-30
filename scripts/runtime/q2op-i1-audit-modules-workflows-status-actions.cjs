const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleDirs = [
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions",
];

const importantFiles = {
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimeActionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  workflowEngine: "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  beforeMutationGuards: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
};

const checks = [];
const modules = [];

function full(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(full(relativePath));
}

function read(relativePath) {
  if (!exists(relativePath)) return "";
  return fs.readFileSync(full(relativePath), "utf8");
}

function walk(relativeDir, predicate, results = []) {
  const absoluteDir = full(relativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolute = path.join(absoluteDir, entry.name);
    const relative = path.relative(root, absolute).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist", "coverage"].includes(entry.name)) {
        continue;
      }

      walk(relative, predicate, results);
      continue;
    }

    if (!predicate(relative)) {
      continue;
    }

    results.push(relative);
  }

  return results;
}

function add(area, status, severity, message, file = "") {
  checks.push({ area, status, severity, message, file });
}

function extractStringAfter(content, pattern) {
  const match = content.match(pattern);
  return match ? match[1] : "";
}

function extractArrayBlock(content, key) {
  const index = content.indexOf(key);

  if (index === -1) return "";

  const start = content.indexOf("[", index);
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < content.length; i++) {
    const char = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (char === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") depth++;
    if (char === "]") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  return "";
}

function extractObjectBlock(content, key) {
  const index = content.indexOf(key);

  if (index === -1) return "";

  const start = content.indexOf("{", index);
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < content.length; i++) {
    const char = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (char === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  return "";
}

function extractKeysFromBlock(block) {
  const keys = [];
  const regex = /key:\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(block))) {
    keys.push(match[1]);
  }

  return Array.from(new Set(keys));
}

function extractLabelsFromBlock(block) {
  const labels = [];
  const regex = /label:\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(block))) {
    labels.push(match[1]);
  }

  return Array.from(new Set(labels));
}

function extractTransitions(block) {
  const transitions = [];
  const transitionRegex = /{\s*from:\s*["']([^"']+)["']\s*,\s*to:\s*["']([^"']+)["']\s*,\s*action:\s*["']([^"']+)["']/g;
  let match;

  while ((match = transitionRegex.exec(block))) {
    transitions.push({
      from: match[1],
      to: match[2],
      action: match[3],
    });
  }

  return transitions;
}

function extractStatusFields(schemaBlock) {
  const statusFields = [];
  const fieldRegex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?type:\s*["']([^"']+)["'][\s\S]*?}/g;
  let match;

  while ((match = fieldRegex.exec(schemaBlock))) {
    const key = match[1];
    const type = match[2];
    const lower = key.toLowerCase();

    if (
      lower === "statut" ||
      lower === "status" ||
      lower.includes("statut") ||
      lower.includes("status") ||
      lower.includes("etat") ||
      lower.includes("état")
    ) {
      statusFields.push({
        key,
        type,
      });
    }
  }

  return statusFields;
}

function findGeneratedModuleFiles() {
  return moduleDirs.flatMap((dir) => {
    return walk(
      dir,
      (relative) =>
        relative.endsWith(".module.ts") ||
        relative.endsWith("coreModules.ts")
    );
  });
}

function readSiblingActionsFile(moduleFile) {
  const dir = path.dirname(moduleFile);
  const base = path.basename(moduleFile).replace(".module.ts", ".actions.ts");
  const actionFile = path.join(dir, base).replace(/\\/g, "/");

  if (exists(actionFile)) {
    return {
      file: actionFile,
      content: read(actionFile),
    };
  }

  return {
    file: "",
    content: "",
  };
}

function inspectModule(moduleFile) {
  const content = read(moduleFile);
  const actionSibling = readSiblingActionsFile(moduleFile);

  const combined = content + "\n" + actionSibling.content;

  const key =
    extractStringAfter(content, /metadata:\s*{[\s\S]*?key:\s*["']([^"']+)["']/) ||
    extractStringAfter(content, /key:\s*["']([^"']+)["']/) ||
    path.basename(moduleFile).replace(".module.ts", "");

  const label =
    extractStringAfter(content, /metadata:\s*{[\s\S]*?label:\s*["']([^"']+)["']/) ||
    extractStringAfter(content, /label:\s*["']([^"']+)["']/) ||
    key;

  const schemaBlock = extractObjectBlock(content, "schema");
  const workflowBlock = extractArrayBlock(content, "workflows");
  const actionsBlock = extractArrayBlock(content, "actions");
  const compositionBlock = extractObjectBlock(content, "composition");
  const childrenBlock = extractArrayBlock(compositionBlock, "children");

  const statusFields = extractStatusFields(schemaBlock);
  const workflowKeys = extractKeysFromBlock(workflowBlock);
  const workflowLabels = extractLabelsFromBlock(workflowBlock);
  const workflowStates = extractKeysFromBlock(extractArrayBlock(workflowBlock, "states"));
  const transitions = extractTransitions(workflowBlock);

  const actionKeys = extractKeysFromBlock(combined.includes("actions") ? combined : actionsBlock);
  const actionLabels = extractLabelsFromBlock(combined.includes("actions") ? combined : actionsBlock);

  const childKeys = extractKeysFromBlock(childrenBlock);
  const childLabels = extractLabelsFromBlock(childrenBlock);

  const hasActions = /actions\s*:|Actions|action:|runtimeOnly|href:|hrefTemplate/.test(combined);
  const hasWorkflow = workflowBlock.trim().length > 0;
  const hasCompositionChildren = childrenBlock.trim().length > 0;
  const hasRequiresParentContext = combined.includes("requiresParentContext");
  const hasStatusGovernance = combined.includes("RuntimeStatusGovernance") || combined.includes("statusGovernance");

  const manualHrefRisk =
    combined.includes("/nouveau?") ||
    combined.includes("hrefTemplate") ||
    combined.includes("new URLSearchParams");

  const moduleSummary = {
    file: moduleFile,
    actionFile: actionSibling.file,
    key,
    label,
    statusFields,
    workflowKeys,
    workflowLabels,
    workflowStates,
    transitions,
    actionKeys,
    actionLabels,
    childKeys,
    childLabels,
    hasActions,
    hasWorkflow,
    hasCompositionChildren,
    hasRequiresParentContext,
    hasStatusGovernance,
    manualHrefRisk,
  };

  modules.push(moduleSummary);

  if (statusFields.length > 0) {
    add("module-status", "OK", "MEDIUM", `${key}: status fields = ${statusFields.map((f) => f.key).join(", ")}`, moduleFile);
  } else {
    add("module-status", "INFO", "LOW", `${key}: no explicit status field detected`, moduleFile);
  }

  if (hasWorkflow) {
    add("module-workflow", "OK", "HIGH", `${key}: workflow detected (${workflowKeys.length} workflow key marker(s), ${transitions.length} transition(s))`, moduleFile);
  } else {
    add("module-workflow", "INFO", "MEDIUM", `${key}: no workflow detected`, moduleFile);
  }

  if (hasActions) {
    add("module-actions", "INFO", "HIGH", `${key}: actions metadata or actions file detected`, moduleFile);
  }

  if (manualHrefRisk) {
    add("module-navigation", "WARN", "MEDIUM", `${key}: possible manual href/template detected; should use runtime builders for child creation`, moduleFile);
  }
}

function inspectFormActionLeaks() {
  const form = read(importantFiles.enterpriseForm);
  const page = read(importantFiles.runtimePage);

  const formMarkers = [
    "workflowActions",
    "RuntimeActionEngine",
    "handleWorkflowAction",
    "workflowActions.map",
    "ERPButton",
  ];

  const formHits = formMarkers.filter((marker) => form.includes(marker));

  if (formHits.length > 0) {
    add(
      "form-actions",
      "WARN",
      "HIGH",
      "ERPEnterpriseForm still contains workflow/action rendering markers: " + formHits.join(", ") + ". Target architecture: forms should not render workflow buttons.",
      importantFiles.enterpriseForm
    );
  } else {
    add(
      "form-actions",
      "OK",
      "HIGH",
      "ERPEnterpriseForm has no workflow/action rendering markers.",
      importantFiles.enterpriseForm
    );
  }

  const pagePassesWorkflowActions =
    page.includes("workflowActions={") ||
    page.includes("workflowActions=");

  if (pagePassesWorkflowActions) {
    add(
      "form-actions",
      "WARN",
      "HIGH",
      "ERPRuntimePage passes workflowActions into ERPEnterpriseForm. Target architecture: render actions outside the form.",
      importantFiles.runtimePage
    );
  } else {
    add(
      "form-actions",
      "OK",
      "HIGH",
      "ERPRuntimePage does not pass workflowActions into ERPEnterpriseForm.",
      importantFiles.runtimePage
    );
  }

  if (page.includes("runtimeActions.map")) {
    add(
      "runtime-actions",
      "OK",
      "HIGH",
      "ERPRuntimePage renders runtime actions outside the detail view/form.",
      importantFiles.runtimePage
    );
  } else {
    add(
      "runtime-actions",
      "WARN",
      "HIGH",
      "ERPRuntimePage runtime actions renderer not clearly detected.",
      importantFiles.runtimePage
    );
  }
}

function inspectBusinessRules() {
  const content = read(importantFiles.businessRules);

  const ruleMarkers = [
    "rendezvous",
    "interventionsauto",
    "facturesauto",
    "encaissementsauto",
    "lignesinterventionauto",
    "stocksauto",
    "receptionsstockauto",
    "mouvementsstockauto",
    "statut",
    "create",
    "update",
  ];

  const hits = ruleMarkers.filter((marker) =>
    content.toLowerCase().includes(marker.toLowerCase())
  );

  if (hits.length > 0) {
    add(
      "business-rules",
      "OK",
      "HIGH",
      "Business rules file contains workflow/side-effect markers: " + hits.join(", "),
      importantFiles.businessRules
    );
  } else {
    add(
      "business-rules",
      "WARN",
      "HIGH",
      "No business rule markers detected.",
      importantFiles.businessRules
    );
  }
}

function inspectGuards() {
  const content = read(importantFiles.beforeMutationGuards);

  const guardMarkers = [
    "requiresParentContext",
    "parentModuleKey",
    "parentRecordId",
    "parentForeignKey",
    "RuntimeContextEnforcer",
  ];

  const hits = guardMarkers.filter((marker) => content.includes(marker));

  if (hits.length === guardMarkers.length) {
    add(
      "guards",
      "OK",
      "HIGH",
      "Parent/child guard markers present: " + hits.join(", "),
      importantFiles.beforeMutationGuards
    );
  } else {
    add(
      "guards",
      "WARN",
      "HIGH",
      "Some parent/child guard markers missing. Found: " + hits.join(", "),
      importantFiles.beforeMutationGuards
    );
  }
}

function buildMermaidForModule(module) {
  const lines = [];
  lines.push("```mermaid");
  lines.push("flowchart TD");
  lines.push(`  A["${module.label}<br/>${module.key}"]`);

  if (module.statusFields.length > 0) {
    lines.push(`  S["Statuts<br/>${module.statusFields.map((f) => f.key).join("<br/>")}"]`);
    lines.push("  A --> S");
  }

  if (module.workflowStates.length > 0) {
    lines.push(`  W["Workflow<br/>${module.workflowStates.join(" → ")}"]`);
    lines.push("  A --> W");
  } else if (module.hasWorkflow) {
    lines.push(`  W["Workflow déclaré"]`);
    lines.push("  A --> W");
  }

  if (module.transitions.length > 0) {
    module.transitions.slice(0, 8).forEach((transition, index) => {
      lines.push(`  T${index}["${transition.from} -- ${transition.action} --> ${transition.to}"]`);
      lines.push(`  W --> T${index}`);
    });
  }

  if (module.actionLabels.length > 0) {
    lines.push(`  AC["Actions<br/>${module.actionLabels.slice(0, 8).join("<br/>")}"]`);
    lines.push("  A --> AC");
  } else if (module.hasActions) {
    lines.push(`  AC["Actions détectées"]`);
    lines.push("  A --> AC");
  }

  if (module.childLabels.length > 0) {
    lines.push(`  C["Enfants / composition<br/>${module.childLabels.slice(0, 8).join("<br/>")}"]`);
    lines.push("  A --> C");
  }

  lines.push("```");
  return lines.join("\n");
}

const moduleFiles = findGeneratedModuleFiles();

for (const moduleFile of moduleFiles) {
  inspectModule(moduleFile);
}

inspectFormActionLeaks();
inspectBusinessRules();
inspectGuards();

const ok = checks.filter((check) => check.status === "OK").length;
const info = checks.filter((check) => check.status === "INFO").length;
const warn = checks.filter((check) => check.status === "WARN").length;
const fail = checks.filter((check) => check.status === "FAIL").length;
const failHigh = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH").length;
const warnHigh = checks.filter((check) => check.status === "WARN" && check.severity === "HIGH").length;

console.log("[Q2-OP-I1] Modules / workflows / statuses / action buttons audit");
console.log("[ROOT]", root);
console.log("[MODULES]", modules.length);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}`
    );
  }
}

const report = [];

report.push("# Q2-OP-I1 — Schéma global modules / workflows / statuts / actions");
report.push("");
report.push("Objectif : cartographier les modules ERP, leurs statuts, workflows, transitions, actions, règles métier et vérifier que les boutons de workflow ne sont pas portés par les formulaires.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- Modules analysés : ${modules.length}`);
report.push(`- OK : ${ok}`);
report.push(`- INFO : ${info}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Doctrine cible");
report.push("");
report.push("- Les formulaires affichent et saisissent des champs.");
report.push("- Les workflows, transitions et actions métier sont rendus par le runtime autour du formulaire.");
report.push("- Les statuts ne sont pas des commandes libres.");
report.push("- Les changements d’état passent par des actions contrôlées : RuntimeActionEngine / RuntimeWorkflowEngine / Business Rules.");
report.push("- Les créations enfant passent par RuntimeChildCreateHrefBuilder ou par composition.children, jamais par des URLs codées à la main.");
report.push("");
report.push("## Alertes principales");
report.push("");
report.push("| Area | Status | Severity | File | Message |");
report.push("|---|---:|---:|---|---|");

for (const check of checks.filter((item) => item.status !== "OK" || item.severity === "HIGH")) {
  report.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Vue synthétique par module");
report.push("");
report.push("| Module | Label | Statuts | Workflows | Transitions | Actions | Enfants | Risque href manuel |");
report.push("|---|---|---|---:|---:|---:|---:|---:|");

for (const module of modules.sort((a, b) => a.key.localeCompare(b.key))) {
  report.push(
    `| ${module.key} | ${module.label} | ${module.statusFields.map((f) => f.key).join(", ") || "-"} | ${module.hasWorkflow ? "oui" : "non"} | ${module.transitions.length} | ${module.actionLabels.length || (module.hasActions ? "oui" : 0)} | ${module.childLabels.length} | ${module.manualHrefRisk ? "oui" : "non"} |`
  );
}

report.push("");
report.push("## Schémas détaillés par module");
report.push("");

for (const module of modules.sort((a, b) => a.key.localeCompare(b.key))) {
  report.push(`### ${module.label} — \`${module.key}\``);
  report.push("");
  report.push(`- Fichier : \`${module.file}\``);
  if (module.actionFile) {
    report.push(`- Actions : \`${module.actionFile}\``);
  }
  report.push(`- Champs de statut : ${module.statusFields.map((f) => "`" + f.key + "`").join(", ") || "aucun détecté"}`);
  report.push(`- Workflow : ${module.hasWorkflow ? "oui" : "non"}`);
  report.push(`- États détectés : ${module.workflowStates.join(", ") || "non détectés"}`);
  report.push(`- Actions détectées : ${module.actionLabels.join(", ") || module.actionKeys.join(", ") || "aucune action explicite détectée"}`);
  report.push(`- Enfants/composition : ${module.childLabels.join(", ") || module.childKeys.join(", ") || "aucun enfant détecté"}`);
  report.push("");

  if (module.transitions.length > 0) {
    report.push("#### Transitions");
    report.push("");
    report.push("| From | Action | To |");
    report.push("|---|---|---|");
    for (const transition of module.transitions) {
      report.push(`| ${transition.from} | ${transition.action} | ${transition.to} |`);
    }
    report.push("");
  }

  report.push(buildMermaidForModule(module));
  report.push("");
}

report.push("## Recommandation de prochaine passe");
report.push("");
report.push("1. Extraire un composant runtime unique type `ERPRuntimeActionBar` pour rendre les actions hors formulaire.");
report.push("2. Retirer `workflowActions` de `ERPEnterpriseForm`.");
report.push("3. Faire porter les actions par `ERPRuntimePage` ou un moteur runtime dédié.");
report.push("4. Ajouter un audit bloquant : aucun bouton workflow/action ne doit être rendu dans les formulaires.");
report.push("5. Ajouter un audit bloquant : aucune création enfant avec `requiresParentContext` ne doit avoir une URL manuelle sans parent context.");

const reportPath = full("docs/audits/Q2-OP-I1-modules-workflows-status-actions-map.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));