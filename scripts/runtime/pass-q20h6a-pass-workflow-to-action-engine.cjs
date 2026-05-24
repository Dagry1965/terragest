const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(relPath) {
  return path.join(ROOT, relPath);
}

function read(relPath) {
  return fs.readFileSync(file(relPath), "utf8");
}

function write(relPath, content) {
  fs.writeFileSync(file(relPath), content, "utf8");
  console.log(`[WRITTEN] ${relPath}`);
}

function backup(relPath, suffix) {
  const source = file(relPath);
  const target = file(`${relPath}.bak-${suffix}`);

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relPath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP EXISTS] ${relPath}.bak-${suffix}`);
  }
}

const suffix = "q20h6a-pass-workflow-to-action-engine";
const rel = "src/components/erp/runtime/ERPRuntimePage.tsx";

backup(rel, suffix);

let content = read(rel);

if (content.includes("workflow: module?.workflows?.[0],")) {
  console.log("[SKIP] workflow already passed to RuntimeActionEngine.");
} else {
  const before = /RuntimeActionEngine\.getAvailableActions\(\{\s*actions: module\?\.actions \?\? \[\],\s*record,\s*\}\)/m;

  const after = `RuntimeActionEngine.getAvailableActions({
          actions: module?.actions ?? [],
          workflow: module?.workflows?.[0],
          record,
        })`;

  if (!before.test(content)) {
    console.error("[ERROR] getAvailableActions block not found.");
    console.error("Inspect manually:");
    console.error("Get-Content .\\src\\components\\erp\\runtime\\ERPRuntimePage.tsx | Select-Object -Skip 185 -First 45");
    process.exit(1);
  }

  content = content.replace(before, after);
}

write(rel, content);

console.log("");
console.log("[Q20H6A_DONE] ERPRuntimePage now passes workflow to RuntimeActionEngine.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test RDV planifie: only Confirmer + Annuler should be visible.");
console.log("  Test intervention terminee: only Facturer should be visible if transition allows it.");