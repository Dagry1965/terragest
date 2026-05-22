/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file, suffix) {
  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function main() {
  const file = p(
    "src",
    "runtime",
    "firestore",
    "FirestoreRuntimeMutation.ts"
  );

  backup(file, "q18a-skip-computed-missing-dependencies");

  let content = read(file);

  const oldBlock = `  for (const field of module.schema.fields) {
    if (!field.computed) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        nextData
      );

    nextData[field.key] =
      computedValue;
  }`;

  const newBlock = `  for (const field of module.schema.fields) {
    if (!field.computed) {
      continue;
    }

    if (
      !canComputeRuntimeField(
        field.computed.dependsOn,
        nextData
      )
    ) {
      continue;
    }

    const computedValue =
      RuntimeComputedEngine.compute(
        field.computed.formula,
        nextData
      );

    nextData[field.key] =
      computedValue;
  }`;

  content = replaceOnce(
    content,
    oldBlock,
    newBlock,
    "guard computed fields with dependsOn"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  refaire test encaissement facture");
}

main();
