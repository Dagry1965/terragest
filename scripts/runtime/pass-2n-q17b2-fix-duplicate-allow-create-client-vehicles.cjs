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

function main() {
  const file = p(
    "src",
    "runtime",
    "modules",
    "generated",
    "clientsauto",
    "clientsauto.module.ts"
  );

  backup(file, "q17b2-fix-duplicate-allow-create");

  let content = read(file);

  content = content.replace(
    `        mode: "readonly",
        allowCreate: true,
        allowCreate: false,`,
    `        mode: "readonly",
        allowCreate: true,`
  );

  content = content.replace(
    `        createLabel: "Ajouter un véhicule",`,
    `        createLabel: "Ajouter un véhicule à ce client",`
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q17B2_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();