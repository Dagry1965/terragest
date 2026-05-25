const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = "src/components/erp/forms/enterprise/ERPFormField.tsx";
const full = path.join(ROOT, file);
const tag = "q21d3c3b-fix-runtime-data-binding-import";

const backup = `${full}.bak-${tag}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(full, backup);
  console.log(`[BACKUP] ${file}.bak-${tag}`);
}

let content = fs.readFileSync(full, "utf8");

const candidates = [
  "@/runtime/modules/data/RuntimeDataBinding",
  "@/runtime/modules/lifecycle/RuntimeDataBinding",
  "@/runtime/data-binding/RuntimeDataBinding",
  "@/runtime/RuntimeDataBinding",
];

const current = `@/runtime/data/RuntimeDataBinding`;

if (!content.includes(current)) {
  console.log("[SKIP] Wrong import not found. File may already be fixed.");
  process.exit(0);
}

const existingCandidate = candidates.find((aliasPath) => {
  const relative = aliasPath.replace("@/", "src/") + ".ts";
  return fs.existsSync(path.join(ROOT, relative));
});

if (!existingCandidate) {
  console.error("[ERROR] RuntimeDataBinding file not found in known locations.");
  console.error("Run:");
  console.error('  Get-ChildItem .\\src -Recurse -Filter "*RuntimeDataBinding*" | Select-Object FullName');
  process.exit(1);
}

content = content.replace(current, existingCandidate);

fs.writeFileSync(full, content, "utf8");

console.log(`[WRITTEN] ${file}`);
console.log(`[FIXED] ${current} -> ${existingCandidate}`);