const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalTable.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2a-e3d-fix-expanded-fragment-key",
  original,
  "utf8"
);

/**
 * Ajouter Fragment dans l'import React.
 */
content = content.replace(
  'import { useMemo, useState } from "react";',
  'import { Fragment, useMemo, useState } from "react";'
);

/**
 * Remplacer le fragment court par un Fragment avec key.
 */
content = content.replace(
  /return \(\s*<>\s*<tr\s*key=\{recordId\}/,
  `return (
                <Fragment key={recordId}>
                  <tr`
);

content = content.replace(
  /<\/>\s*\);/,
  `</Fragment>
              );`
);

const problems = [];

if (!content.includes('import { Fragment, useMemo, useState } from "react";')) {
  problems.push("Import Fragment absent");
}

if (!content.includes("<Fragment key={recordId}>")) {
  problems.push("Fragment key absent");
}

if (content.includes("<>")) {
  problems.push("Fragment court <> encore présent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-E3D key React ajoutée sur Fragment expanded rows.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
