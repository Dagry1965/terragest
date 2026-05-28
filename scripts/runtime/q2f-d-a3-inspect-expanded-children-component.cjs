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
  console.log("[FAIL] File not found:", path.relative(ROOT, componentPath));
  process.exit(1);
}

const content = fs.readFileSync(componentPath, "utf8");
const lines = content.split(/\r?\n/);

function printWindow(title, matcher, before = 8, after = 20) {
  const index = lines.findIndex((line) => line.includes(matcher));

  console.log("");
  console.log(`[SECTION] ${title}`);

  if (index < 0) {
    console.log(`[MISS] ${matcher}`);
    return;
  }

  const start = Math.max(0, index - before);
  const end = Math.min(lines.length, index + after + 1);

  for (let i = start; i < end; i++) {
    const no = String(i + 1).padStart(4, " ");
    console.log(`${no}: ${lines[i]}`);
  }
}

console.log("");
console.log("[Q2-F-D-A3] Inspect actual expanded children component");
console.log("");
console.log("[FILE]", path.relative(ROOT, componentPath));
console.log("[LINES]", lines.length);
console.log("");

printWindow("Imports", "import ", 0, 30);
printWindow("RuntimeDataBinding.list usage", "RuntimeDataBinding.list", 15, 35);
printWindow("useEffect usage", "useEffect", 10, 45);
printWindow("composition children usage", "children", 15, 35);
printWindow("return JSX start", "return", 8, 50);

console.log("");
console.log("[DONE] Send this output before Q2-F-D-B wiring.");
