const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const startMarker = `      return {
        success: true,`;
const endMarker = `        record,
      };
    }`;

const searchStart = content.indexOf(`if (
        module?.metadata?.key === "lignesinterventionauto" &&
        action.key === "retirer-ligne"`);
if (searchStart === -1) {
  throw new Error("[FIX] Could not locate retirer-ligne block");
}

const start = content.indexOf(startMarker, searchStart);
const end = content.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("[FIX] Could not locate success return block");
}

const replacement = `      return {
        success: true,
        message: "Ligne retirée avec succès.",
        result,
        action,
        record,
      };`;

content =
  content.slice(0, start) +
  replacement +
  content.slice(end + endMarker.length);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] RuntimeActionEngine retirer-ligne return block repaired");