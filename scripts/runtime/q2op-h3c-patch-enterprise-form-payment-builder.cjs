const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-h3c-payment-builder`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Import generic builder.
 */
if (!source.includes("buildRuntimeFactureEncaissementCreateHref")) {
  source = source.replace(
    `import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";`,
    `import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";`
  );
}

/**
 * 2. Replace manual buildInvoicePaymentHref function.
 */
const start = source.indexOf("function buildInvoicePaymentHref(");
if (start === -1) {
  console.error("[PATCH_FAILED] buildInvoicePaymentHref not found.");
  process.exit(1);
}

const end = source.indexOf("\nasync function syncInterventionTotalsFromLines", start);
if (end === -1) {
  console.error("[PATCH_FAILED] syncInterventionTotalsFromLines boundary not found.");
  process.exit(1);
}

const replacement = `function buildInvoicePaymentHref(
  invoice: Record<string, unknown>
): string {
  const factureId =
    String(invoice.id ?? invoice._id ?? "");

  const montantTTC =
    Number(invoice.montantTTC ?? 0);

  const montantPaye =
    Number(invoice.montantPaye ?? 0);

  const resteAPayer =
    Number(invoice.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(
          montantTTC - montantPaye,
          0
        );

  return buildRuntimeFactureEncaissementCreateHref({
    factureId,
    clientId: invoice.clientId ? String(invoice.clientId) : undefined,
    vehiculeId: invoice.vehiculeId ? String(invoice.vehiculeId) : undefined,
    montant: montant > 0 ? montant : undefined,
    datePaiement: new Date()
      .toISOString()
      .split("T")[0],
    statut: "valide",
    returnTo: "/facturesauto/" + factureId + "/edit",
  });
}
`;

source =
  source.slice(0, start) +
  replacement +
  source.slice(end);

/**
 * 3. Required / forbidden checks.
 */
const builderPath = path.join(root, "src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts");
const builder = fs.existsSync(builderPath) ? fs.readFileSync(builderPath, "utf8") : "";
const combined = source + "\n" + builder;

const required = [
  "buildRuntimeFactureEncaissementCreateHref",
  "return buildRuntimeFactureEncaissementCreateHref",
  "parentModuleKey",
  "parentRecordId",
  "parentForeignKey",
  "lockFields",
];

for (const marker of required) {
  if (!combined.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbiddenInForm = [
  'return "/encaissementsauto/nouveau?" +',
  "new URLSearchParams();",
  'params.set(\n    "factureId"',
];

for (const marker of forbiddenInForm) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Manual href marker still remains in ERPEnterpriseForm:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-H3-C] ERPEnterpriseForm invoice payment href now uses RuntimeChildCreateHrefBuilder.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\\\scripts\\\\runtime\\\\q2op-h3a-audit-generic-runtime-payment-actions.cjs");
console.log("  git status --short");