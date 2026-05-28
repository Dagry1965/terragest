const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const componentPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

if (!fs.existsSync(componentPath)) {
  console.log("[FAIL] File not found");
  process.exit(1);
}

const content = fs.readFileSync(componentPath, "utf8");
const lines = content.split(/\r?\n/);

function printAround(pattern, before = 20, after = 35) {
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) {
      indexes.push(index);
    }
  });

  console.log("");
  console.log(`[PATTERN] ${pattern}`);
  console.log(`[MATCHES] ${indexes.length}`);

  for (const index of indexes) {
    console.log("");
    console.log(`[AROUND LINE ${index + 1}]`);

    const start = Math.max(0, index - before);
    const end = Math.min(lines.length, index + after + 1);

    for (let i = start; i < end; i++) {
      const no = String(i + 1).padStart(4, " ");
      console.log(`${no}: ${lines[i]}`);
    }
  }
}

console.log("");
console.log("[Q2-F-D-B3] Inspect loading block exact shape");
console.log("[FILE]", path.relative(ROOT, componentPath));
console.log("[LINES]", lines.length);

printAround("loadChildGroup", 25, 45);
printAround("setGroups", 25, 45);
printAround("loadedGroups", 25, 45);
printAround("cancelled", 25, 45);

console.log("");
console.log("[DONE] Send this output before patching B3.");
