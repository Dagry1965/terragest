const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "package.json";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-add-audit-local-script`);

if (!fs.existsSync(file)) {
  console.error("[ERROR] package.json introuvable.");
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log("[BACKUP] package.json.bak-q21x-add-audit-local-script");
}

const pkg = JSON.parse(fs.readFileSync(file, "utf8"));

pkg.scripts = pkg.scripts ?? {};
pkg.scripts["audit:local"] = "node scripts/runtime/audit-local-logic.cjs";

fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n", "utf8");

console.log("[DONE] package.json script audit:local added.");