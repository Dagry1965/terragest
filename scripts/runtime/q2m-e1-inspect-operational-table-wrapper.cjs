const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalTable.tsx"
);

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split(/\r?\n/);

const patterns = [
  "overflow-hidden",
  "rounded-[1.7rem]",
  "shadow-[",
  "<table",
  "<thead",
  "<tbody",
];

console.log("");
console.log("[Q2-M-E1] Inspect current operational table wrapper");
console.log("");

for (const pattern of patterns) {
  console.log("");
  console.log("[PATTERN]", pattern);

  lines.forEach((line, index) => {
    if (line.includes(pattern)) {
      const start = Math.max(0, index - 8);
      const end = Math.min(lines.length, index + 12);

      console.log("[AROUND LINE " + (index + 1) + "]");

      for (let i = start; i < end; i++) {
        console.log(String(i + 1).padStart(4, " ") + ": " + lines[i]);
      }
    }
  });
}
