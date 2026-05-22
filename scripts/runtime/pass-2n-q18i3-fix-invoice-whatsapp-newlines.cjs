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
  if (!fs.existsSync(file)) return;

  const target = `${file}.bak-${suffix}`;

  if (!fs.existsSync(target)) {
    fs.copyFileSync(file, target);
    console.log(`[BACKUP] ${path.relative(root, target)}`);
  }
}

function main() {
  const file = p(
    "src",
    "components",
    "erp",
    "billing",
    "InvoiceDocumentActions.tsx"
  );

  backup(file, "q18i3-fix-invoice-whatsapp-newlines");

  let content = read(file);

  const before = content;

  content = content.replaceAll(
    `.join("\\\\n");`,
    `.join("\\n");`
  );

  if (content === before) {
    throw new Error("[Q18I3] Aucun join(\"\\\\n\") trouvé dans InvoiceDocumentActions.tsx");
  }

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18I3_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester WhatsApp facture");
}

main();