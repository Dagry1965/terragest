const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
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
  const hits = [];
  let index = source.indexOf(marker);

  while (index !== -1) {
    hits.push({
      marker,
      index,
      line: lineNumberAt(index),
    });

    index = source.indexOf(marker, index + marker.length);
  }

  return hits;
}

function findBalancedJsxExpression(startIndex) {
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

    if (c === "{") {
      depth++;
    }

    if (c === "}") {
      depth--;

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
  }

  return null;
}

const markers = {
  legacyCondition: '{type === "detail" && runtimeActions.length > 0 && (',
  legacyMap: "runtimeActions.map",
  legacyButton: "<button",
  legacyOnClick: "handleRuntimeAction(action)",
  actionBar: "ERPRuntimeActionBar",
  actionBarPlacement: 'data-runtime-action-bar-placement="runtime-page"',
  createForm: '{type === "create" && module && (',
  editForm: '{type === "edit" && module && currentRecord && (',
  details: "{type === \"detail\" && module && currentRecord && (",
};

const report = [];

report.push("# Q2-OP-I14-A — Audit du rendu legacy runtimeActions.map dans ERPRuntimePage");
report.push("");
report.push("Objectif : identifier les bornes exactes du rendu legacy direct des actions métier afin de le supprimer sans casser `ERPRuntimePage`.");
report.push("");

const findings = [];

for (const [name, marker] of Object.entries(markers)) {
  const hits = findAll(marker);
  findings.push({ name, marker, hits });

  report.push(`## Marker: ${name}`);
  report.push("");
  report.push(`Pattern: \`${marker.replace(/`/g, "\\`")}\``);
  report.push(`Occurrences: ${hits.length}`);
  report.push("");

  for (const hit of hits) {
    report.push(`- Line ${hit.line}`);
  }

  report.push("");
}

const legacyHit = findAll(markers.legacyCondition)[0];
let balanced = null;

if (legacyHit) {
  balanced = findBalancedJsxExpression(legacyHit.index);

  report.push("## Bloc legacy équilibré détecté");
  report.push("");

  if (balanced) {
    report.push(`- Start line: ${balanced.startLine}`);
    report.push(`- End line: ${balanced.endLine}`);
    report.push(`- Contains runtimeActions.map: ${balanced.text.includes("runtimeActions.map") ? "yes" : "no"}`);
    report.push(`- Contains handleRuntimeAction(action): ${balanced.text.includes("handleRuntimeAction(action)") ? "yes" : "no"}`);
    report.push(`- Contains <button: ${balanced.text.includes("<button") ? "yes" : "no"}`);
    report.push("");
    report.push("### Contexte bloc legacy");
    report.push("");
    report.push("```tsx");
    report.push(printRange(balanced.startLine - 8, balanced.endLine + 8));
    report.push("```");
    report.push("");
  } else {
    report.push("Aucun bloc équilibré trouvé depuis le marker legacy.");
    report.push("");
  }
}

report.push("## Contexte RuntimeActionBar / formulaires");
report.push("");

const contextStart =
  balanced?.startLine ??
  legacyHit?.line ??
  390;

const contextEnd =
  findAll(markers.details)[0]?.line
    ? findAll(markers.details)[0].line + 18
    : contextStart + 140;

report.push("```tsx");
report.push(printRange(contextStart - 20, contextEnd));
report.push("```");
report.push("");

report.push("## Décision recommandée");
report.push("");

if (!legacyHit) {
  report.push("- Aucun rendu legacy `runtimeActions.map` conditionnel détecté. Ne rien supprimer.");
} else if (!balanced) {
  report.push("- Bloc legacy trouvé mais pas équilibré. Ne rien supprimer automatiquement.");
} else if (
  balanced.text.includes("runtimeActions.map") &&
  balanced.text.includes("handleRuntimeAction(action)") &&
  balanced.text.includes("<button")
) {
  report.push("- Le bloc legacy direct est précisément détecté.");
  report.push("- Prochaine passe : supprimer uniquement ce bloc.");
  report.push("- Attention : `ERPRuntimeActionBar` doit recevoir des actions avec `onClick` pour conserver l'exécution.");
} else {
  report.push("- Le bloc détecté ne contient pas tous les marqueurs attendus. Ne pas supprimer automatiquement.");
}

const outPath = path.join(root, "docs/audits/Q2-OP-I14-A-runtime-page-legacy-action-render.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, report.join("\n"), "utf8");

console.log("[Q2-OP-I14-A] RuntimePage legacy action render audit");
console.log("[ROOT]", root);
console.log("[REPORT] docs/audits/Q2-OP-I14-A-runtime-page-legacy-action-render.md");
console.log("[IMPORTANT]");

for (const item of findings) {
  console.log(`[${item.name}] occurrences=${item.hits.length} lines=${item.hits.map((hit) => hit.line).join(", ") || "-"}`);
}

if (balanced) {
  console.log(`[BALANCED_LEGACY_BLOCK] start=${balanced.startLine} end=${balanced.endLine}`);
  console.log(`[BALANCED_CONTAINS] runtimeActions.map=${balanced.text.includes("runtimeActions.map")} handleRuntimeAction=${balanced.text.includes("handleRuntimeAction(action)")} button=${balanced.text.includes("<button")}`);
} else {
  console.log("[BALANCED_LEGACY_BLOCK] not-found");
}