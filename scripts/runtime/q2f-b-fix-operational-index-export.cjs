const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const indexPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "index.ts"
);

if (!fs.existsSync(indexPath)) {
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(indexPath, "", "utf8");
}

let content = fs.readFileSync(indexPath, "utf8");

const exportLine = 'export * from "./RuntimeOperationalChildrenResolver";';

if (!content.includes(exportLine)) {
  content = content.trimEnd();

  if (content.length > 0) {
    content += "\n";
  }

  content += exportLine + "\n";

  fs.writeFileSync(indexPath, content, "utf8");
  console.log("[WRITTEN] src/runtime/operational/index.ts");
} else {
  console.log("[OK] Export already present");
}

const updated = fs.readFileSync(indexPath, "utf8");

console.log("");
console.log("[Q2-F-B-FIX] operational index export");
console.log(updated.includes(exportLine) ? "[OK] RuntimeOperationalChildrenResolver exported" : "[FAIL] Export missing");

if (!updated.includes(exportLine)) {
  process.exit(1);
}

console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2f-b-create-runtime-operational-children-resolver.cjs");
console.log("  pnpm build");
