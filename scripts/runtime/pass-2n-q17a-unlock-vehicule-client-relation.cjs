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
    "modules",
    "generated",
    "vehicules",
    "vehicules.module.ts"
  );

  backup(file, "q17a-unlock-client-relation");

  let content = read(file);

  const oldBlock = `    lockedFields: [
      "clientId",
    ],`;

  const newBlock = `    lockedFields: [
    ],`;

  content = replaceOnce(
    content,
    oldBlock,
    newBlock,
    "remove clientId from vehicules lockedFields"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q17A_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester vehicule edit -> client modifiable");
}

main();