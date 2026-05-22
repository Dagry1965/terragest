const fs = require("fs");
const path = require("path");

const root = process.cwd();

function file(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(file(relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(file(relativePath), content, {
    encoding: "utf8",
  });

  console.log(`[WRITTEN] ${relativePath}`);
}

function backup(relativePath, suffix) {
  const source = file(relativePath);
  const target = file(`${relativePath}.bak-${suffix}`);

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relativePath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${relativePath}.bak-${suffix}`);
  }
}

function replaceRequired(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`Pattern not found: ${label}`);
  }

  return content.replace(from, to);
}

const target = "src/runtime/firestore/FirestoreRuntimeQuery.ts";
const suffix = "q19d2b-safe-context-detail-read";

backup(target, suffix);

let content = read(target);

content = replaceRequired(
  content,
  `    RuntimeContextEnforcer.assertRecordInContext(
      module,
      record
    );

    return record;`,
  `    if (
      !RuntimeContextEnforcer.isRecordInContext(
        module,
        record
      )
    ) {
      console.warn(
        "[RUNTIME_CONTEXT_DETAIL_DENIED]",
        {
          moduleKey:
            module.metadata?.key,
          recordId:
            id,
        }
      );

      return null;
    }

    return record;`,
  "replace detail context assert"
);

write(target, content);

console.log("");
console.log("[Q19D2B_DONE] Detail reads outside runtime context now return null instead of crashing.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Tester le même écran avec demo@amarkhys.com");