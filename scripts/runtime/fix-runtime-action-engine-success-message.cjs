const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const lines = content.split(/\r?\n/);

const fixed = lines.map((line) => {
  if (
    line.includes("message:") &&
    line.includes("Ligne retir") &&
    line.includes("succ")
  ) {
    return `        message: "Ligne retirée avec succès.",`;
  }

  return line;
});

content = fixed.join("\n");

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] RuntimeActionEngine success message repaired");