const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimeDetails.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-h1c-runtime-details-payment-link`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (!source.includes("buildRuntimeFactureEncaissementCreateHref")) {
  source = source.replace(
    `"use client";`,
    `"use client";

import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";`
  );
}

const start = source.indexOf("function buildInvoicePaymentHref(");
if (start === -1) {
  console.error("[PATCH_FAILED] buildInvoicePaymentHref not found.");
  process.exit(1);
}

const nextFunctionStart = source.indexOf("\nfunction getInvoiceAmountSummary", start);
if (nextFunctionStart === -1) {
  console.error("[PATCH_FAILED] getInvoiceAmountSummary boundary not found.");
  process.exit(1);
}

const replacement = `function buildInvoicePaymentHref(
  data: Record<string, unknown>
): string {
  const factureId = String(data.id ?? data._id ?? "");

  const montantTTC = Number(data.montantTTC ?? 0);
  const montantPaye = Number(data.montantPaye ?? 0);
  const resteAPayer = Number(data.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(montantTTC - montantPaye, 0);

  return buildRuntimeFactureEncaissementCreateHref({
    factureId,
    clientId: data.clientId ? String(data.clientId) : undefined,
    vehiculeId: data.vehiculeId ? String(data.vehiculeId) : undefined,
    montant,
    datePaiement: new Date().toISOString().slice(0, 10),
    statut: "valide",
    returnTo: "/facturesauto/" + factureId + "/edit",
  });
}
`;

source =
  source.slice(0, start) +
  replacement +
  source.slice(nextFunctionStart);

const required = [
  "buildRuntimeFactureEncaissementCreateHref",
  "return buildRuntimeFactureEncaissementCreateHref",
  "factureId",
  "clientId",
  "vehiculeId",
  "montant",
  "datePaiement",
  "statut",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-H1C] ERPRuntimeDetails payment link now uses RuntimeChildCreateHrefBuilder.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");