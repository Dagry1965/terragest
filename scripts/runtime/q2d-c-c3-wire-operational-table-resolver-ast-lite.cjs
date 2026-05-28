const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/components/erp/operational/ERPOperationalTable.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2d-c-c3-wire-operational-data-resolver-ast-lite",
  original,
  "utf8"
);

let content = original;

function findMatchingParen(source, openParenIndex) {
  let depth = 0;
  let inString = false;
  let stringQuote = "";
  let escaped = false;

  for (let i = openParenIndex; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === stringQuote) {
        inString = false;
        stringQuote = "";
      }

      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (depth === 0) {
      return i;
    }
  }

  return -1;
}

function replaceUseEffectContaining(source, needle, replacement, label) {
  const regex = /useEffect\s*\(/g;
  let match;

  while ((match = regex.exec(source)) !== null) {
    const useEffectIndex = match.index;
    const openParenIndex = source.indexOf("(", useEffectIndex);
    const closeParenIndex = findMatchingParen(source, openParenIndex);

    if (closeParenIndex < 0) {
      throw new Error("Parenthèse fermante introuvable pour useEffect: " + label);
    }

    let endIndex = closeParenIndex + 1;

    while (source[endIndex] && /\s/.test(source[endIndex])) {
      endIndex++;
    }

    if (source[endIndex] === ";") {
      endIndex++;
    }

    const block = source.slice(useEffectIndex, endIndex);

    if (block.includes(needle)) {
      return source.slice(0, useEffectIndex) + replacement + source.slice(endIndex);
    }
  }

  throw new Error("useEffect contenant introuvable: " + label + " / " + needle);
}

/**
 * Import resolver.
 */
content = content.replace(
  /import\s*\{\s*RuntimeDataBinding,?\s*\}\s*from\s*"@\/runtime\/data-binding\/RuntimeDataBinding";\s*/m,
  ""
);

if (!content.includes("@/runtime/operational")) {
  const importMarker = `import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";`;

  if (!content.includes(importMarker)) {
    throw new Error("Import marker ERPOperationalExpandedChildren introuvable.");
  }

  content = content.replace(
    importMarker,
    `${importMarker}
import {
  RuntimeOperationalDataResolver,
} from "@/runtime/operational";`
  );
}

const relationReplacement = `useEffect(() => {
    async function loadRelationLabels() {
      const fieldColumns = columns.filter((column) => column.kind === "field");
      const fieldKeys = fieldColumns.map((column) => column.key);

      if (fieldKeys.length === 0) {
        setRelationLabels({});
        return;
      }

      try {
        const next =
          await RuntimeOperationalDataResolver.resolveRelationLabels({
            module,
            fieldKeys,
          });

        setRelationLabels(next);
      } catch (error) {
        console.error("[OPERATIONAL RELATION LABELS ERROR]", error);
        setRelationLabels({});
      }
    }

    loadRelationLabels();
  }, [columns, module]);`;

const totalsReplacement = `useEffect(() => {
    async function loadChildTotals() {
      const totalsConfig =
        (tableConfig as
          | {
              childTotals?: Array<{
                key: string;
                moduleKey: string;
                foreignKey: string;
                totalField: string;
              }>;
            }
          | undefined)?.childTotals ?? [];

      if (totalsConfig.length === 0) {
        setChildTotals({});
        return;
      }

      try {
        const next =
          await RuntimeOperationalDataResolver.resolveChildTotals({
            parentModule: module,
            totals: totalsConfig,
          });

        setChildTotals(next);
      } catch (error) {
        console.error("[OPERATIONAL CHILD TOTALS ERROR]", error);
        setChildTotals({});
      }
    }

    loadChildTotals();
  }, [module, tableConfig]);`;

content = replaceUseEffectContaining(
  content,
  "loadRelationLabels",
  relationReplacement,
  "relationLabels"
);

content = replaceUseEffectContaining(
  content,
  "loadChildTotals",
  totalsReplacement,
  "childTotals"
);

const problems = [];

if (!content.includes("RuntimeOperationalDataResolver")) {
  problems.push("RuntimeOperationalDataResolver non présent");
}

if (!content.includes("resolveRelationLabels")) {
  problems.push("resolveRelationLabels non présent");
}

if (!content.includes("resolveChildTotals")) {
  problems.push("resolveChildTotals non présent");
}

if (content.includes("RuntimeDataBinding.list")) {
  problems.push("RuntimeDataBinding.list encore présent dans ERPOperationalTable");
}

if (content.includes("@/runtime/data-binding/RuntimeDataBinding")) {
  problems.push("Ancien import RuntimeDataBinding encore présent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-D-C-C3 ERPOperationalTable branché au RuntimeOperationalDataResolver.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2d-c-d-audit-operational-table-resolver-wiring.cjs");
console.log("pnpm build");
