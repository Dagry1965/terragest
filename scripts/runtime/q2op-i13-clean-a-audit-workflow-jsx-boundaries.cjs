const fs = require("fs");
const path = require("path");

const root = process.cwd();
const formPath = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const fullPath = path.join(root, formPath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", formPath);
  process.exit(1);
}

const source = fs.readFileSync(fullPath, "utf8");
const lines = source.split(/\r?\n/);

function lineNumberAt(index) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function printRange(startLine, endLine) {
  const start = Math.max(1, startLine);
  const end = Math.min(lines.length, endLine);

  return lines
    .slice(start - 1, end)
    .map((line, index) => {
      const actual = start + index;
      return `${String(actual).padStart(5, " ")}: ${line}`;
    })
    .join("\n");
}

function findAll(marker) {
  const result = [];
  let index = source.indexOf(marker);

  while (index !== -1) {
    result.push({
      marker,
      index,
      line: lineNumberAt(index),
    });
    index = source.indexOf(marker, index + marker.length);
  }

  return result;
}

function findBalancedJsxExpression(startIndex) {
  if (startIndex < 0) return null;

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = startIndex; i < source.length; i++) {
    const c = source[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "{") depth++;
    if (c === "}") depth--;

    if (depth === 0 && i > startIndex) {
      return {
        startIndex,
        endIndex: i + 1,
        startLine: lineNumberAt(startIndex),
        endLine: lineNumberAt(i),
        text: source.slice(startIndex, i + 1),
      };
    }
  }

  return null;
}

const markers = {
  workflowCondition: '{mode === "edit" && !isRemovedRecord && workflowActions.length > 0 && (',
  workflowMap: "workflowActions.map",
  pendingRefSet: "pendingWorkflowActionRef.current = action",
  requestSubmit: "formRef.current?.requestSubmit()",
  workflowTitle: "Workflow",
  afterActionsWrapper: '<div className="flex flex-col',
  summaryPanel: "<ERPFormSummaryPanel module={module} />",
};

const report = [];
report.push("# Q2-OP-I13-CLEAN-A — Audit bornes JSX du bloc workflow");
report.push("");
report.push("Objectif : identifier les bornes exactes du bloc workflow dans `ERPEnterpriseForm` sans modifier le fichier.");
report.push("");

const findings = [];

for (const [name, marker] of Object.entries(markers)) {
  const hits = findAll(marker);
  findings.push({ name, marker, hits });

  report.push(`## Marker: ${name}`);
  report.push("");
  report.push(`Pattern: \`${marker.replace(/`/g, "\\`")}\``);
  report.push("");
  report.push(`Occurrences: ${hits.length}`);
  report.push("");

  for (const hit of hits) {
    report.push(`- Line ${hit.line}`);
  }

  report.push("");
}

const workflowHit = findAll(markers.workflowCondition)[0];
let balanced = null;

if (workflowHit) {
  balanced = findBalancedJsxExpression(workflowHit.index);

  report.push("## Bloc workflow équilibré détecté");
  report.push("");

  if (balanced) {
    report.push(`- Start line: ${balanced.startLine}`);
    report.push(`- End line: ${balanced.endLine}`);
    report.push(`- Contains workflowActions.map: ${balanced.text.includes("workflowActions.map") ? "yes" : "no"}`);
    report.push(`- Contains pending ref set: ${balanced.text.includes("pendingWorkflowActionRef.current = action") ? "yes" : "no"}`);
    report.push(`- Contains requestSubmit: ${balanced.text.includes("formRef.current?.requestSubmit()") ? "yes" : "no"}`);
    report.push("");
    report.push("### Contexte bloc workflow complet");
    report.push("");
    report.push("```tsx");
    report.push(printRange(balanced.startLine - 8, balanced.endLine + 8));
    report.push("```");
    report.push("");
  } else {
    report.push("Aucun bloc équilibré trouvé depuis le marker workflow.");
    report.push("");
  }
}

const summaryHit = findAll(markers.summaryPanel)[0];
const actionsWrapperHit = findAll(markers.afterActionsWrapper)[0];

report.push("## Contexte fin de formulaire");
report.push("");

const contextStart =
  balanced?.startLine ??
  workflowHit?.line ??
  actionsWrapperHit?.line ??
  1750;

const contextEnd =
  summaryHit?.line
    ? summaryHit.line + 12
    : contextStart + 160;

report.push("```tsx");
report.push(printRange(contextStart - 20, contextEnd));
report.push("```");
report.push("");

report.push("## Décision recommandée");
report.push("");

if (!workflowHit) {
  report.push("- Le bloc workflow visuel n’a pas été trouvé. Ne rien supprimer.");
} else if (!balanced) {
  report.push("- Le bloc workflow a été trouvé mais pas équilibré. Ne rien supprimer automatiquement.");
} else if (
  balanced.text.includes("workflowActions.map") &&
  balanced.text.includes("pendingWorkflowActionRef.current = action") &&
  balanced.text.includes("formRef.current?.requestSubmit()")
) {
  report.push("- Le bloc workflow visuel est précisément détecté et équilibré.");
  report.push("- Prochaine passe possible : remplacer uniquement les lignes du bloc détecté par `null`, sans toucher aux wrappers voisins.");
} else {
  report.push("- Le bloc détecté ne contient pas tous les marqueurs attendus. Ne pas supprimer automatiquement.");
}

const outPath = path.join(root, "docs/audits/Q2-OP-I13-CLEAN-A-workflow-jsx-boundaries.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, report.join("\n"), "utf8");

console.log("[Q2-OP-I13-CLEAN-A] Workflow JSX boundaries audit");
console.log("[ROOT]", root);
console.log("[REPORT] docs/audits/Q2-OP-I13-CLEAN-A-workflow-jsx-boundaries.md");

console.log("[IMPORTANT]");
for (const item of findings) {
  console.log(`[${item.name}] occurrences=${item.hits.length} lines=${item.hits.map((hit) => hit.line).join(", ") || "-"}`);
}

if (balanced) {
  console.log(`[BALANCED_WORKFLOW_BLOCK] start=${balanced.startLine} end=${balanced.endLine}`);
  console.log(`[BALANCED_CONTAINS] workflowActions.map=${balanced.text.includes("workflowActions.map")} pendingRef=${balanced.text.includes("pendingWorkflowActionRef.current = action")} requestSubmit=${balanced.text.includes("formRef.current?.requestSubmit()")}`);
} else {
  console.log("[BALANCED_WORKFLOW_BLOCK] not-found");
}