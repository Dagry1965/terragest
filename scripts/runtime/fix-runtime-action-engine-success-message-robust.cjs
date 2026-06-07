const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const lines = content.split(/\r?\n/);

let fixedCount = 0;

const fixedLines = lines.map((line) => {
  const trimmed = line.trim();

  // Any broken message line containing "Ligne retir..." should become a clean TS string.
  if (
    trimmed.startsWith("message:") &&
    line.includes("Ligne retir")
  ) {
    fixedCount++;
    const indent = line.match(/^\s*/)?.[0] ?? "";
    return `${indent}message: "Ligne retirée avec succès.",`;
  }

  return line;
});

content = fixedLines.join("\n");

// Extra safety: if the broken string spans weird tokens on one line after message,
// replace from message: "Ligne retir... until the next comma at line level is not reliable.
// So this regex handles a remaining single-line corrupted message.
content = content.replace(
  /^(\s*)message:\s*"Ligne retir.*succ.*",\s*$/gm,
  `$1message: "Ligne retirée avec succès.",`
);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
  console.log("[FIXED MESSAGE LINES]", fixedCount);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[FIX] RuntimeActionEngine success message robust repair done");