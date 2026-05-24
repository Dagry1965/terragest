const fs = require("fs");
const path = require("path");

const root = process.cwd();

const modulesRoot = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated"
);

const outputDir = path.join(root, "reports", "runtime");
const outputFile = path.join(outputDir, "q20h-status-audit.md");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) return walk(full);

    return full.endsWith(".module.ts") ? [full] : [];
  });
}

function extractBlock(content, startIndex) {
  if (startIndex < 0) return "";

  let depth = 0;
  let started = false;

  for (let i = startIndex; i < content.length; i++) {
    const char = content[i];

    if (char === "[" || char === "{") {
      depth++;
      started = true;
    }

    if (char === "]" || char === "}") {
      depth--;
    }

    if (started && depth <= 0) {
      return content.slice(startIndex, i + 1);
    }
  }

  return content.slice(startIndex);
}

function extractOptionsForStatus(content) {
  const statusIndex = content.search(/key:\s*["']statut["']/);

  if (statusIndex === -1) return [];

  const after = content.slice(statusIndex);
  const optionsIndex = after.search(/options:\s*\[/);

  if (optionsIndex === -1) return [];

  const block = extractBlock(after, optionsIndex + after.slice(optionsIndex).indexOf("["));

  return [...block.matchAll(/label:\s*["']([^"']+)["']\s*,\s*value:\s*["']([^"']+)["']/g)]
    .map((match) => ({
      label: match[1],
      value: match[2],
    }));
}

function extractWorkflowStates(content) {
  const statesIndex = content.search(/states:\s*\[/);

  if (statesIndex === -1) return [];

  const after = content.slice(statesIndex);
  const block = extractBlock(after, after.indexOf("["));

  return [...block.matchAll(/key:\s*["']([^"']+)["']\s*,\s*label:\s*["']([^"']+)["']/g)]
    .map((match) => ({
      key: match[1],
      label: match[2],
    }));
}

function extractTransitions(content) {
  const transitionsIndex = content.search(/transitions:\s*\[/);

  if (transitionsIndex === -1) return [];

  const after = content.slice(transitionsIndex);
  const block = extractBlock(after, after.indexOf("["));

  return [...block.matchAll(/from:\s*["']([^"']+)["']\s*,\s*to:\s*["']([^"']+)["']\s*,\s*action:\s*["']([^"']+)["']/g)]
    .map((match) => ({
      from: match[1],
      to: match[2],
      action: match[3],
    }));
}

function extractInitialState(content) {
  const match = content.match(/initialState:\s*["']([^"']+)["']/);
  return match ? match[1] : "";
}

function extractModuleKey(content, filePath) {
  const match = content.match(/key:\s*["']([^"']+)["']/);
  return match ? match[1] : path.basename(path.dirname(filePath));
}

function classify(moduleKey, options, states) {
  const values = new Set([
    ...options.map((item) => item.value),
    ...states.map((item) => item.key),
  ]);

  const hasFinancial =
    moduleKey.includes("facture") ||
    moduleKey.includes("encaissement") ||
    moduleKey.includes("echeance");

  const hasStock =
    moduleKey.includes("stock") ||
    moduleKey.includes("mouvement");

  const hasLine =
    moduleKey.includes("lignesintervention");

  if (hasLine) {
    return {
      recommendation:
        "Simplifier visible utilisateur à brouillon / validee. Masquer facturee / annulee. Facturation et retrait doivent devenir relations/actions techniques.",
      visible: ["brouillon", "validee"],
      technical: ["facturee", "annulee", "stockMovementId", "factureId", "removedAt"],
      priority: "haute",
    };
  }

  if (hasFinancial) {
    return {
      recommendation:
        "Conserver les statuts financiers visibles, mais éviter les changements manuels directs. Les paiements/factures doivent piloter les transitions.",
      visible: [...values],
      technical: ["computed payment state", "invoice/payment linkage"],
      priority: "haute",
    };
  }

  if (hasStock) {
    return {
      recommendation:
        "Le stock ne doit pas être modifié directement. Les mouvements pilotent les quantités et les statuts disponible / stock_faible / rupture.",
      visible: [...values],
      technical: ["quantiteAvant", "quantiteApres", "sourceModule", "sourceId"],
      priority: "haute",
    };
  }

  return {
    recommendation:
      "À revoir : distinguer statut métier visible, statut technique et actions workflow.",
    visible: [...values],
    technical: [],
    priority: "moyenne",
  };
}

const files = walk(modulesRoot);

const reports = files
  .map((file) => {
    const content = fs.readFileSync(file, "utf8");

    const hasStatus =
      /key:\s*["']statut["']/.test(content) ||
      /key:\s*["']status["']/.test(content) ||
      /states:\s*\[/.test(content) ||
      /transitions:\s*\[/.test(content);

    if (!hasStatus) return null;

    const moduleKey = extractModuleKey(content, file);
    const options = extractOptionsForStatus(content);
    const states = extractWorkflowStates(content);
    const transitions = extractTransitions(content);
    const initialState = extractInitialState(content);
    const classification = classify(moduleKey, options, states);

    return {
      moduleKey,
      file,
      options,
      states,
      transitions,
      initialState,
      classification,
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.moduleKey.localeCompare(b.moduleKey));

const lines = [];

lines.push("# Q20H — Audit global des statuts runtime");
lines.push("");
lines.push(`Modules analysés : ${reports.length}`);
lines.push("");
lines.push("## Synthèse prioritaire");
lines.push("");
lines.push("| Module | Priorité | Recommandation |");
lines.push("|---|---:|---|");

for (const report of reports) {
  lines.push(
    `| ${report.moduleKey} | ${report.classification.priority} | ${report.classification.recommendation.replaceAll("|", "/")} |`
  );
}

lines.push("");
lines.push("## Détail par module");
lines.push("");

for (const report of reports) {
  lines.push(`### ${report.moduleKey}`);
  lines.push("");
  lines.push(`Fichier : \`${path.relative(root, report.file)}\``);
  lines.push("");
  lines.push(`Initial state : \`${report.initialState || "non défini"}\``);
  lines.push("");

  lines.push("Options champ statut :");
  if (report.options.length === 0) {
    lines.push("- aucune option visible détectée");
  } else {
    for (const option of report.options) {
      lines.push(`- ${option.label} → \`${option.value}\``);
    }
  }

  lines.push("");
  lines.push("États workflow :");
  if (report.states.length === 0) {
    lines.push("- aucun état workflow détecté");
  } else {
    for (const state of report.states) {
      lines.push(`- ${state.label} → \`${state.key}\``);
    }
  }

  lines.push("");
  lines.push("Transitions :");
  if (report.transitions.length === 0) {
    lines.push("- aucune transition détectée");
  } else {
    for (const transition of report.transitions) {
      lines.push(`- \`${transition.from}\` → \`${transition.to}\` : ${transition.action}`);
    }
  }

  lines.push("");
  lines.push("Recommandation :");
  lines.push(`- ${report.classification.recommendation}`);
  lines.push("");

  if (report.classification.visible.length > 0) {
    lines.push(`Statuts visibles proposés : ${report.classification.visible.map((v) => `\`${v}\``).join(", ")}`);
  }

  if (report.classification.technical.length > 0) {
    lines.push(`États/relations techniques : ${report.classification.technical.map((v) => `\`${v}\``).join(", ")}`);
  }

  lines.push("");
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, lines.join("\n"), "utf8");

console.log(`[WRITTEN] ${path.relative(root, outputFile)}`);
console.log("");
console.log("[Q20H2_DONE] Rapport audit statuts généré.");
console.log("");
console.log("Next:");
console.log(`  notepad ${path.relative(root, outputFile)}`);