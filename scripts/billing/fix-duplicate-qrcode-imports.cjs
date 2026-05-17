const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const target = path.join(
  ROOT,
  "src/components/erp/billing/InvoiceDocumentActions.tsx"
);

if (!fs.existsSync(target)) {
  throw new Error("InvoiceDocumentActions.tsx introuvable");
}

let content = fs.readFileSync(target, "utf8");

const lines = content.split(/\r?\n/);

let hasQRCode = false;
let hasReactHooks = false;

const cleaned = lines.filter((line) => {
  const trimmed = line.trim();

  if (trimmed === `import QRCode from "qrcode";`) {
    if (hasQRCode) {
      return false;
    }

    hasQRCode = true;
    return true;
  }

  if (trimmed === `import { useEffect, useState } from "react";`) {
    if (hasReactHooks) {
      return false;
    }

    hasReactHooks = true;
    return true;
  }

  return true;
});

content = cleaned.join("\n");

fs.writeFileSync(target, content, "utf8");

console.log("OK imports QRCode / React hooks dédupliqués.");