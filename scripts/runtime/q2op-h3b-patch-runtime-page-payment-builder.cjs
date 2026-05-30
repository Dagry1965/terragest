const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimePage.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-h3b-runtime-page-payment-builder`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Import the generic child create href builder.
 */
if (!source.includes("buildRuntimeFactureEncaissementCreateHref")) {
  source = source.replace(
    `import { ERPOperationalModulePage } from "@/components/erp/operational";`,
    `import { ERPOperationalModulePage } from "@/components/erp/operational";
import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";`
  );
}

/**
 * 2. Replace manual invoice payment href builder.
 */
const start = source.indexOf("function buildInvoicePaymentHref(");
if (start === -1) {
  console.error("[PATCH_FAILED] buildInvoicePaymentHref not found.");
  process.exit(1);
}

const end = source.indexOf("\nfunction getRuntimePageTypeLabel", start);
if (end === -1) {
  console.error("[PATCH_FAILED] getRuntimePageTypeLabel boundary not found.");
  process.exit(1);
}

const replacement = `function buildInvoicePaymentHref(
  record: Record<string, unknown>
): string {
  const factureId =
    String(record.id ?? record._id ?? "");

  const montantTTC =
    Number(record.montantTTC ?? 0);

  const montantPaye =
    Number(record.montantPaye ?? 0);

  const resteAPayer =
    Number(record.resteAPayer ?? 0);

  const montant =
    resteAPayer > 0
      ? resteAPayer
      : Math.max(montantTTC - montantPaye, 0);

  return buildRuntimeFactureEncaissementCreateHref({
    factureId,
    clientId: record.clientId ? String(record.clientId) : undefined,
    vehiculeId: record.vehiculeId ? String(record.vehiculeId) : undefined,
    montant: montant > 0 ? montant : undefined,
    datePaiement: new Date().toISOString().split("T")[0],
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
 * 3. Required and forbidden markers.
 */
const required = [
  "buildRuntimeFactureEncaissementCreateHref",
  "return buildRuntimeFactureEncaissementCreateHref",
  "parentModuleKey",
  "parentRecordId",
  "parentForeignKey",
];

const combined = source + fs.readFileSync(path.join(root, "src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts"), "utf8");

for (const marker of required) {
  if (!combined.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

const forbiddenInRuntimePage = [
  'return "/encaissementsauto/nouveau?" +',
  "new URLSearchParams();",
  'params.set(\n    "factureId"',
];

for (const marker of forbiddenInRuntimePage) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Manual href marker still remains in ERPRuntimePage:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-H3-B] ERPRuntimePage invoice payment href now uses RuntimeChildCreateHrefBuilder.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");