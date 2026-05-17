const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, { encoding: "utf8" });
  console.log(`UPDATED ${path.relative(root, file)}`);
}

function ensureFunction(content) {
  if (content.includes("function formatPaymentStatus(")) {
    return content;
  }

  const helper = `
function formatPaymentStatus(value) {
  const status = String(value || "").trim();

  const labels = {
    en_attente: "En attente",
    partiel: "Paiement partiel",
    paye: "Payé",
  };

  return labels[status] || status || "En attente";
}
`;

  const firstFunctionIndex = content.search(/function\s+[A-Za-z0-9_]+\s*\(/);

  if (firstFunctionIndex !== -1) {
    return content.slice(0, firstFunctionIndex) + helper + "\n" + content.slice(firstFunctionIndex);
  }

  const exportIndex = content.search(/export\s+default|export\s+function|export\s+async\s+function/);

  if (exportIndex !== -1) {
    return content.slice(0, exportIndex) + helper + "\n" + content.slice(exportIndex);
  }

  return helper + "\n" + content;
}

function patchPublicInvoicePage() {
  const file = path.join(root, "src", "app", "facture", "[token]", "page.tsx");

  if (!fs.existsSync(file)) {
    console.error(`MISSING ${file}`);
    process.exitCode = 1;
    return;
  }

  let content = read(file);
  const before = content;

  content = ensureFunction(content);

  content = content.replaceAll(
    "{invoice.statutPaiement}",
    "{formatPaymentStatus(invoice.statutPaiement)}"
  );

  content = content.replaceAll(
    "{facture.statutPaiement}",
    "{formatPaymentStatus(facture.statutPaiement)}"
  );

  content = content.replaceAll(
    "String(invoice.statutPaiement || \"\")",
    "formatPaymentStatus(invoice.statutPaiement)"
  );

  content = content.replaceAll(
    "String(facture.statutPaiement || \"\")",
    "formatPaymentStatus(facture.statutPaiement)"
  );

  content = content.replace(
    /statutPaiement\s*\|\|\s*"en_attente"/g,
    'formatPaymentStatus(statutPaiement || "en_attente")'
  );

  if (content !== before) {
    write(file, content);
  } else {
    console.log(`UNCHANGED ${path.relative(root, file)}`);
  }
}

function patchInvoiceDocumentActions() {
  const file = path.join(root, "src", "components", "erp", "billing", "InvoiceDocumentActions.tsx");

  if (!fs.existsSync(file)) {
    console.error(`MISSING ${file}`);
    process.exitCode = 1;
    return;
  }

  let content = read(file);
  const before = content;

  content = ensureFunction(content);

  content = content.replaceAll(
    "${invoice.statutPaiement || \"en_attente\"}",
    "${formatPaymentStatus(invoice.statutPaiement)}"
  );

  content = content.replaceAll(
    "${facture.statutPaiement || \"en_attente\"}",
    "${formatPaymentStatus(facture.statutPaiement)}"
  );

  content = content.replaceAll(
    "invoice.statutPaiement || \"en_attente\"",
    "formatPaymentStatus(invoice.statutPaiement)"
  );

  content = content.replaceAll(
    "facture.statutPaiement || \"en_attente\"",
    "formatPaymentStatus(facture.statutPaiement)"
  );

  content = content.replaceAll(
    "String(invoice.statutPaiement || \"\")",
    "formatPaymentStatus(invoice.statutPaiement)"
  );

  content = content.replaceAll(
    "String(facture.statutPaiement || \"\")",
    "formatPaymentStatus(facture.statutPaiement)"
  );

  content = content.replace(
    /statutPaiement:\s*invoice\.statutPaiement\s*\|\|\s*"en_attente"/g,
    "statutPaiement: formatPaymentStatus(invoice.statutPaiement)"
  );

  content = content.replace(
    /statutPaiement:\s*facture\.statutPaiement\s*\|\|\s*"en_attente"/g,
    "statutPaiement: formatPaymentStatus(facture.statutPaiement)"
  );

  if (content !== before) {
    write(file, content);
  } else {
    console.log(`UNCHANGED ${path.relative(root, file)}`);
  }
}

patchPublicInvoicePage();
patchInvoiceDocumentActions();

console.log("DONE fix invoice payment status labels");