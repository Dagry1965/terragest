const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/operational/RuntimeOperationalChildrenResolver.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2f-b2-add-modulekey-to-expanded-group",
  original,
  "utf8"
);

let content = original;

if (!content.includes("moduleKey: string;")) {
  content = content.replace(
    `export type RuntimeOperationalExpandedGroup = {
  child: ERPCompositionChild;
  module: ERPModule;`,
    `export type RuntimeOperationalExpandedGroup = {
  child: ERPCompositionChild;
  moduleKey: string;
  module: ERPModule;`
  );
}

if (!content.includes("moduleKey: child.moduleKey,")) {
  content = content.replace(
    `  return {
    child,
    module,
    records,
    grandchildrenByParentId,
  };`,
    `  return {
    child,
    moduleKey: child.moduleKey,
    module,
    records,
    grandchildrenByParentId,
  };`
  );
}

const problems = [];

if (!content.includes("moduleKey: string;")) {
  problems.push("moduleKey absent du type RuntimeOperationalExpandedGroup");
}

if (!content.includes("moduleKey: child.moduleKey,")) {
  problems.push("moduleKey non renseigné dans le retour resolveChildGroup");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-F-B2 moduleKey ajouté à RuntimeOperationalExpandedGroup.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
