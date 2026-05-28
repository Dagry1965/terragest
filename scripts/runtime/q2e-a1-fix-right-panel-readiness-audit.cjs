const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "scripts/runtime/q2e-a-operational-right-panel-readiness-audit.cjs";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2e-a1-fix-right-panel-readiness-audit",
  original,
  "utf8"
);

let content = original;

content = content.replace(
  `checkContains(
  pageRel,
  page,
  "rightPanel",
  "ERPOperationalModulePage manipule rightPanel"
);`,
  `checkContains(
  pageRel,
  page,
  "ERPOperationalRightPanel",
  "ERPOperationalModulePage branche le composant RightPanel"
);`
);

content = content.replace(
  `checkContains(
    rel,
    content,
    "type: \\"summary\\"",
    \`\${rel} rightPanel utilise type summary\`
  );`,
  `checkContains(
    rel,
    content,
    "type:",
    \`\${rel} rightPanel déclare un type\`
  );`
);

const problems = [];

if (content.includes("ERPOperationalModulePage manipule rightPanel")) {
  problems.push("Ancien check rightPanel encore présent");
}

if (content.includes("rightPanel utilise type summary")) {
  problems.push("Ancien check type summary encore présent");
}

if (!content.includes("ERPOperationalModulePage branche le composant RightPanel")) {
  problems.push("Nouveau check composant RightPanel absent");
}

if (!content.includes("rightPanel déclare un type")) {
  problems.push("Nouveau check type rightPanel absent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-E-A1 audit RightPanel readiness corrigé.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2e-a-operational-right-panel-readiness-audit.cjs");
console.log("pnpm build");
