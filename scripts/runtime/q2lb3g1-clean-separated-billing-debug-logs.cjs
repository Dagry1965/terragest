const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/runtime/actions/RuntimeActionEngine.ts",
];

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function write(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function removeConsoleBlockByMarker(content, marker) {
  const lines = content.split(/\r?\n/);
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.includes(marker)) {
      out.push(line);
      continue;
    }

    let start = out.length - 1;
    while (start >= 0 && !out[start].includes("console.")) {
      start--;
    }

    if (start >= 0) {
      out.splice(start, out.length - start);
    }

    while (i < lines.length && !lines[i].includes(");")) {
      i++;
    }
  }

  return out.join("\n");
}

let changed = 0;

for (const file of files) {
  let content = read(file);
  const before = content;

  content = removeConsoleBlockByMarker(content, "[Q2-L-B3-F6-F]");

  if (content !== before) {
    write(file, content);
    changed++;
    console.log("[UPDATED]", file);
  } else {
    console.log("[UNCHANGED]", file);
  }
}

console.log("[Q2-L-B3-G1] Changed files:", changed);