const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/generic/GenericListPage.tsx",
].map((p) => path.join(ROOT, p));

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function printAround(file, pattern, before = 15, after = 50) {
  const content = read(file);
  const lines = content.split(/\r?\n/);
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) indexes.push(index);
  });

  console.log("");
  console.log("[FILE]", path.relative(ROOT, file));
  console.log(`[PATTERN] ${pattern}`);
  console.log(`[MATCHES] ${indexes.length}`);

  for (const index of indexes) {
    console.log("");
    console.log(`[AROUND LINE ${index + 1}]`);

    const start = Math.max(0, index - before);
    const end = Math.min(lines.length, index + after + 1);

    for (let i = start; i < end; i++) {
      console.log(String(i + 1).padStart(4, " ") + ": " + lines[i]);
    }
  }
}

console.log("");
console.log("[Q2-I-E-I-A] Inspect operational data resolver API");
console.log("");

for (const file of files) {
  console.log("");
  console.log("[SUMMARY]", path.relative(ROOT, file));
  const content = read(file);
  console.log(JSON.stringify({
    exists: fs.existsSync(file),
    hasRuntimeOperationalDataResolver: content.includes("RuntimeOperationalDataResolver"),
    hasResolve: content.includes("resolve"),
    hasList: content.includes("list"),
    hasLoad: content.includes("load"),
    hasRuntimeDataBinding: content.includes("RuntimeDataBinding"),
    hasExport: content.includes("export"),
  }, null, 2));

  printAround(file, "RuntimeOperationalDataResolver", 12, 45);
  printAround(file, "resolve", 12, 45);
  printAround(file, "list", 12, 45);
  printAround(file, "export", 8, 35);
}

console.log("");
console.log("[DONE] Send output if patch fails. Next: wire GenericListPage operational branch.");
