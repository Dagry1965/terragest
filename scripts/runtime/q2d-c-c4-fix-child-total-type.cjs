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
  file + ".bak-q2d-c-c4-fix-child-total-type",
  original,
  "utf8"
);

let content = original;

/**
 * 1. Ajouter ERPOperationalChildTotalConfig dans l'import ERPModule.
 */
content = content.replace(
  /import type \{ ERPModule \} from "@\/runtime\/modules\/ERPModule";/,
  `import type {
  ERPModule,
  ERPOperationalChildTotalConfig,
} from "@/runtime/modules/ERPModule";`
);

/**
 * 2. Remplacer le cast local incomplet par le type officiel.
 */
content = content.replace(
  /\(tableConfig as\s*\|\s*\{\s*childTotals\?: Array<\{\s*key: string;\s*moduleKey: string;\s*foreignKey: string;\s*totalField: string;\s*\}>;\s*\}\s*\|\s*undefined\)\?\.childTotals \?\? \[\]/m,
  `(tableConfig as
          | {
              childTotals?: ERPOperationalChildTotalConfig[];
            }
          | undefined)?.childTotals ?? []`
);

const problems = [];

if (!content.includes("ERPOperationalChildTotalConfig")) {
  problems.push("ERPOperationalChildTotalConfig non importé/utilisé");
}

if (content.includes("childTotals?: Array<{") && content.includes("totalField: string;")) {
  problems.push("Ancien type local incomplet encore présent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-D-C-C4 type childTotals aligné sur ERPOperationalChildTotalConfig.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
