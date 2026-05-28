const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, results);
      continue;
    }

    if (/\.(ts|tsx)$/.test(full)) results.push(full);
  }

  return results;
}

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function printAround(file, pattern, before = 8, after = 35) {
  const content = read(file);
  const lines = content.split(/\r?\n/);
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) indexes.push(index);
  });

  if (indexes.length === 0) return;

  console.log("");
  console.log("[FILE]", path.relative(ROOT, file));

  for (const index of indexes) {
    console.log("");
    console.log(`[AROUND LINE ${index + 1}] ${pattern}`);

    const start = Math.max(0, index - before);
    const end = Math.min(lines.length, index + after + 1);

    for (let i = start; i < end; i++) {
      console.log(String(i + 1).padStart(4, " ") + ": " + lines[i]);
    }
  }
}

console.log("");
console.log("[Q2-I-B2-A] Inspect ERPOperationalBrandingConfig contract");
console.log("");

const srcFiles = walk(path.join(ROOT, "src"));

for (const file of srcFiles) {
  const content = read(file);

  if (
    content.includes("ERPOperationalBrandingConfig") ||
    content.includes("branding:") ||
    content.includes("operational:")
  ) {
    if (content.includes("ERPOperationalBrandingConfig")) {
      printAround(file, "ERPOperationalBrandingConfig", 8, 45);
    }

    if (
      file.includes("rendezvous.module.ts") ||
      file.includes("interventionsauto.module.ts") ||
      file.includes("facturesauto.module.ts") ||
      file.includes("clientsauto.module.ts")
    ) {
      printAround(file, "operational:", 5, 30);
      printAround(file, "branding:", 5, 25);
      printAround(file, "rightPanel:", 5, 35);
    }
  }
}

console.log("");
console.log("[DONE] Send the output if the next fix still fails.");
