/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(...parts) {
  return path.join(root, ...parts);
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

  backup(file, "q18i3b-fix-invoice-whatsapp-newlines");

  let content = fs.readFileSync(file, "utf8");
  const before = content;

  // Remplace le join qui fabrique des caractères visibles \n
  // par un join avec vrais retours ligne.
  content = content.replace(
    /\.join\(["']\\\\n["']\);/g,
    `.join("\\n");`
  );

  if (content === before) {
    console.log("[INFO] Aucun join avec \\\\n littéral trouvé.");
    console.log("[INFO] Vérification du contenu autour de buildShareText recommandée.");
  } else {
    fs.writeFileSync(file, content, "utf8");
    console.log(`[WRITTEN] ${path.relative(root, file)}`);
  }

  console.log("");
  console.log("[Q18I3B_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester WhatsApp facture");
}

main();