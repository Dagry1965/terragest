const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const target = path.join(
  ROOT,
  "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts"
);

if (!fs.existsSync(target)) {
  throw new Error("Target file not found: " + target);
}

const source = fs.readFileSync(target, "utf8");

const keyMarker = 'key: "mouvements-stock-reception"';
const keyIndex = source.indexOf(keyMarker);

if (keyIndex === -1) {
  throw new Error('Child key not found: mouvements-stock-reception');
}

const afterKey = source.slice(keyIndex);
const displayPattern = /displayIn:\s*\[\s*"detail"\s*,\s*"edit"\s*\]/;

const match = afterKey.match(displayPattern);

if (!match || match.index === undefined) {
  if (/displayIn:\s*\[\s*\]/.test(afterKey.slice(0, 800))) {
    console.log("[OK] Panel already hidden: displayIn is already empty.");
    process.exit(0);
  }

  throw new Error('displayIn ["detail", "edit"] not found after mouvements-stock-reception.');
}

const absoluteDisplayIndex = keyIndex + match.index;

const next =
  source.slice(0, absoluteDisplayIndex) +
  "displayIn: []" +
  source.slice(absoluteDisplayIndex + match[0].length);

fs.writeFileSync(target, next, "utf8");

console.log("[OK] Reception stock generated movements panel hidden from detail/edit.");
console.log("Updated:", path.relative(ROOT, target));