const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const formFieldPath = path.join(
  ROOT,
  "src/components/erp/forms/enterprise/ERPFormField.tsx"
);

const moduleFolders = [
  "src/runtime/modules/generated",
  "src/runtime/modules/definitions/generated",
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

const ignoredActionTypes = new Set([
  "primary",
  "secondary",
  "danger",
]);

const moduleFiles = moduleFolders.flatMap((folder) =>
  walk(path.join(ROOT, folder))
);

const usedTypes = new Map();

for (const file of moduleFiles) {
  const relative = path.relative(ROOT, file);
  const content = fs.readFileSync(file, "utf8");

  // Ignore action files for field type analysis.
  if (relative.endsWith(".actions.ts")) {
    continue;
  }

  const regex = /type\s*:\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const type = match[1];

    if (ignoredActionTypes.has(type)) {
      continue;
    }

    if (!usedTypes.has(type)) {
      usedTypes.set(type, new Set());
    }

    usedTypes.get(type).add(relative);
  }
}

const formField = fs.readFileSync(formFieldPath, "utf8");

function isExplicitlySupported(type) {
  const patterns = [
    `field.type === "${type}"`,
    `field.type === '${type}'`,
    `field.type !== "${type}"`,
    `field.type !== '${type}'`,
    `case "${type}"`,
    `case '${type}'`,
  ];

  return patterns.some((pattern) => formField.includes(pattern));
}

console.log("");
console.log("=== FORM FIELD TYPE SUPPORT MATRIX ===");
console.log("");

for (const [type, files] of [...usedTypes.entries()].sort()) {
  const supported = isExplicitlySupported(type);

  console.log(
    `${supported ? "OK      " : "CHECK   "} ${type} ${
      supported ? "explicitly supported" : "not explicitly detected in ERPFormField"
    }`
  );

  for (const file of [...files].slice(0, 8)) {
    console.log(`        - ${file}`);
  }

  if (files.size > 8) {
    console.log(`        ... +${files.size - 8} autres fichiers`);
  }

  console.log("");
}