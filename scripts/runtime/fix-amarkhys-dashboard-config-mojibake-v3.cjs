const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

function fixMojibakeLine(line) {
  if (!/[Ãâ]/.test(line)) {
    return line;
  }

  try {
    return Buffer.from(line, "latin1").toString("utf8");
  } catch {
    return line;
  }
}

let content = fs.readFileSync(target, "utf8");

content = content
  .split(/\r?\n/)
  .map(fixMojibakeLine)
  .join("\n");

fs.writeFileSync(target, content, "utf8");

console.log("OK: AMARKHYS dashboard config mojibake fixed line by line.");