const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  "src/components/erp/forms/enterprise/ERPFormSection.tsx",
  "src/runtime/modules/ERPModule.ts",
];

const moduleFolders = [
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions/generated",
];

const patterns = [
  "field.type",
  "type ===",
  "type:",
  "text",
  "number",
  "select",
  "textarea",
  "date",
  "relation",
  "boolean",
  "file",
  "document",
  "required",
  "placeholder",
  "defaultValue",
  "disabled",
  "lockFields",
  "errors",
  "value=",
  "onChange",
];

function walk(dir, output = []) {
  if (!fs.existsSync(dir)) return output;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, output);
      continue;
    }

    if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      output.push(full);
    }
  }

  return output;
}

const allFiles = [
  ...files.map((file) => path.join(ROOT, file)),
  ...moduleFolders.flatMap((folder) => walk(path.join(ROOT, folder))),
].filter((file) => fs.existsSync(file));

console.log("");
console.log("=== FORM FIELD UX AUDIT ===");
console.log("");

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          line: index + 1,
          pattern,
          text: line.trim(),
        });
        break;
      }
    }
  });

  if (hits.length > 0) {
    console.log("FILE:", path.relative(ROOT, file));

    for (const hit of hits.slice(0, 80)) {
      console.log(`  L${hit.line} ${hit.text}`);
    }

    if (hits.length > 80) {
      console.log(`  ... +${hits.length - 80} autres lignes`);
    }

    console.log("");
  }
}

console.log("");
console.log("=== FIELD TYPES USED IN MODULES ===");
console.log("");

const typeOccurrences = new Map();

for (const file of allFiles) {
  const relative = path.relative(ROOT, file);

  if (
    !relative.includes("src\\runtime\\modules\\generated") &&
    !relative.includes("src/runtime/modules/generated") &&
    !relative.includes("src\\runtime\\modules\\definitions\\generated") &&
    !relative.includes("src/runtime/modules/definitions/generated")
  ) {
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  const regex = /type\s*:\s*["']([^"']+)["']/g;

  let match;

  while ((match = regex.exec(content)) !== null) {
    const type = match[1];

    if (!typeOccurrences.has(type)) {
      typeOccurrences.set(type, []);
    }

    typeOccurrences.get(type).push(relative);
  }
}

for (const [type, locations] of [...typeOccurrences.entries()].sort()) {
  const uniqueLocations = [...new Set(locations)];

  console.log(`TYPE: ${type}`);
  for (const location of uniqueLocations.slice(0, 20)) {
    console.log(`  - ${location}`);
  }

  if (uniqueLocations.length > 20) {
    console.log(`  ... +${uniqueLocations.length - 20} autres fichiers`);
  }

  console.log("");
}