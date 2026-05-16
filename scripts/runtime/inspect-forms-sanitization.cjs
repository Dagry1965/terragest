const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const folders = [
  "src/components/erp/forms",
  "src/components/erp/runtime",
  "src/components/erp/generic",
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions",
  "src/app",
];

const textPatterns = [
  "ERPEnterpriseForm",
  "ERPFormField",
  "RuntimeValidationEngine",
  "RuntimeDataBinding.create",
  "RuntimeDataBinding.update",
  "defaultValue",
  "value=",
  "onChange",
  "workflowActions",
  "requestSubmit",
  "RuntimeActionEngine.execute",
  "CrÃ",
  "Ã©",
  "Ã¨",
  "Ã",
  "relation",
];

const technicalIdFields = new Set([
  "id",
  "_id",
  "uid",
  "tenantId",
  "workspaceId",
  "moduleId",
  "userId",
  "createdById",
  "updatedById",
]);

const idFieldRegexes = [
  /\b([A-Za-z_][A-Za-z0-9_]*Id)\b/g,
  /\b([A-Za-z_][A-Za-z0-9_]*IDs)\b/g,
  /\b([A-Za-z_][A-Za-z0-9_]*Ids)\b/g,
  /\b([A-Za-z_][A-Za-z0-9_]*_id)\b/g,
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, files);
      continue;
    }

    if (
      entry.name.endsWith(".ts") ||
      entry.name.endsWith(".tsx")
    ) {
      files.push(full);
    }
  }

  return files;
}

const files = folders.flatMap((folder) => walk(path.join(ROOT, folder)));

const relationCandidates = new Map();
const technicalIds = new Map();

console.log("");
console.log("=== FORM RUNTIME SANITIZATION AUDIT ===");
console.log("");

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of textPatterns) {
      if (line.includes(pattern)) {
        hits.push({
          line: index + 1,
          pattern,
          text: line.trim(),
        });
      }
    }

    for (const regex of idFieldRegexes) {
      let match;

      while ((match = regex.exec(line)) !== null) {
        const field = match[1];

        const targetMap =
          technicalIdFields.has(field)
            ? technicalIds
            : relationCandidates;

        if (!targetMap.has(field)) {
          targetMap.set(field, []);
        }

        targetMap.get(field).push({
          file: path.relative(ROOT, file),
          line: index + 1,
          text: line.trim(),
        });
      }
    }
  });

  if (hits.length > 0) {
    console.log("FILE:", path.relative(ROOT, file));

    for (const hit of hits) {
      console.log(`  L${hit.line} [${hit.pattern}] ${hit.text}`);
    }

    console.log("");
  }
}

console.log("");
console.log("=== RELATION FIELD CANDIDATES xxxId / xxxIds / xxx_id ===");
console.log("");

for (const [field, locations] of relationCandidates.entries()) {
  console.log(`FIELD: ${field}`);

  for (const location of locations.slice(0, 12)) {
    console.log(`  ${location.file}:${location.line} ${location.text}`);
  }

  if (locations.length > 12) {
    console.log(`  ... +${locations.length - 12} autres occurrences`);
  }

  console.log("");
}

console.log("");
console.log("=== TECHNICAL ID FIELDS ===");
console.log("");

for (const [field, locations] of technicalIds.entries()) {
  console.log(`FIELD: ${field}`);

  for (const location of locations.slice(0, 8)) {
    console.log(`  ${location.file}:${location.line} ${location.text}`);
  }

  if (locations.length > 8) {
    console.log(`  ... +${locations.length - 8} autres occurrences`);
  }

  console.log("");
}