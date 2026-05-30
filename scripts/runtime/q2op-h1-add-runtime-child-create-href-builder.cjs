const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function ensureDir(relativePath) {
  fs.mkdirSync(full(relativePath), { recursive: true });
}

function write(relativePath, content) {
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  if (!fs.existsSync(source)) return;

  const target = `${source}.${suffix}`;
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

const builderPath = "src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts";
const invoicePaymentsPath = "src/components/erp/billing/InvoicePaymentsHistory.tsx";
const runtimeDetailsPath = "src/components/erp/runtime/ERPRuntimeDetails.tsx";

backup(builderPath, "bak-q2op-h1-child-create-href-builder");
backup(invoicePaymentsPath, "bak-q2op-h1-child-create-href-builder");
backup(runtimeDetailsPath, "bak-q2op-h1-child-create-href-builder");

const builderContent = `export type RuntimeChildCreateHrefBuilderInput = {
  childModuleKey: string;
  parentModuleKey: string;
  parentRecordId: string;
  parentForeignKey: string;
  prefill?: Record<string, unknown>;
  lockFields?: string[];
  returnTo?: string;
  returnLabel?: string;
};

function appendDefinedParam(
  params: URLSearchParams,
  key: string,
  value: unknown
): void {
  if (value === undefined || value === null) {
    return;
  }

  const text = String(value).trim();

  if (!text) {
    return;
  }

  params.set(key, text);
}

export function buildRuntimeChildCreateHref({
  childModuleKey,
  parentModuleKey,
  parentRecordId,
  parentForeignKey,
  prefill = {},
  lockFields = [],
  returnTo,
  returnLabel,
}: RuntimeChildCreateHrefBuilderInput): string {
  const cleanChildModuleKey = String(childModuleKey ?? "").trim();
  const cleanParentModuleKey = String(parentModuleKey ?? "").trim();
  const cleanParentRecordId = String(parentRecordId ?? "").trim();
  const cleanParentForeignKey = String(parentForeignKey ?? "").trim();

  if (!cleanChildModuleKey) {
    throw new Error("Runtime child create href requires childModuleKey.");
  }

  if (!cleanParentModuleKey) {
    throw new Error("Runtime child create href requires parentModuleKey.");
  }

  if (!cleanParentRecordId) {
    throw new Error("Runtime child create href requires parentRecordId.");
  }

  if (!cleanParentForeignKey) {
    throw new Error("Runtime child create href requires parentForeignKey.");
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(prefill)) {
    appendDefinedParam(params, key, value);
  }

  params.set(cleanParentForeignKey, cleanParentRecordId);
  params.set("parentModuleKey", cleanParentModuleKey);
  params.set("parentRecordId", cleanParentRecordId);
  params.set("parentForeignKey", cleanParentForeignKey);

  if (returnTo) {
    params.set("returnTo", returnTo);
  }

  if (returnLabel) {
    params.set("returnLabel", returnLabel);
  }

  const mergedLockFields = Array.from(
    new Set(
      [cleanParentForeignKey, ...lockFields]
        .map((field) => String(field ?? "").trim())
        .filter(Boolean)
    )
  );

  if (mergedLockFields.length > 0) {
    params.set("lockFields", mergedLockFields.join(","));
  }

  return "/" + cleanChildModuleKey + "/nouveau?" + params.toString();
}

export function buildRuntimeFactureEncaissementCreateHref({
  factureId,
  clientId,
  vehiculeId,
  montant,
  datePaiement,
  statut,
  returnTo,
}: {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
  montant?: unknown;
  datePaiement?: string;
  statut?: string;
  returnTo?: string;
}): string {
  return buildRuntimeChildCreateHref({
    childModuleKey: "encaissementsauto",
    parentModuleKey: "facturesauto",
    parentRecordId: factureId,
    parentForeignKey: "factureId",
    prefill: {
      factureId,
      clientId,
      vehiculeId,
      montant,
      datePaiement,
      statut,
    },
    lockFields: ["factureId", "clientId", "vehiculeId"],
    returnTo: returnTo ?? "/facturesauto/" + encodeURIComponent(factureId) + "/edit",
    returnLabel: "Retour facture",
  });
}
`;

write(builderPath, builderContent);

/**
 * Patch InvoicePaymentsHistory.
 */
let invoicePayments = fs.readFileSync(full(invoicePaymentsPath), "utf8");

if (!invoicePayments.includes("buildRuntimeFactureEncaissementCreateHref")) {
  invoicePayments = invoicePayments.replace(
    `import {
  PaymentReceiptActions,
} from "./PaymentReceiptActions";`,
    `import {
  PaymentReceiptActions,
} from "./PaymentReceiptActions";

import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";`
  );
}

const oldBuildCreatePaymentHrefRegex = /function buildCreatePaymentHref\(\{[\s\S]*?\n\}/m;

const nextBuildCreatePaymentHref = `function buildCreatePaymentHref({
  factureId,
  clientId,
  vehiculeId,
  montant,
}: {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
  montant?: unknown;
}): string {
  return buildRuntimeFactureEncaissementCreateHref({
    factureId,
    clientId,
    vehiculeId,
    montant,
    datePaiement: new Date().toISOString().slice(0, 10),
    statut: "valide",
    returnTo: buildInvoiceReturnTo(factureId),
  });
}`;

if (!oldBuildCreatePaymentHrefRegex.test(invoicePayments)) {
  console.error("[PATCH_FAILED] buildCreatePaymentHref not found in InvoicePaymentsHistory.");
  process.exit(1);
}

invoicePayments = invoicePayments.replace(
  oldBuildCreatePaymentHrefRegex,
  nextBuildCreatePaymentHref
);

invoicePayments = invoicePayments.replace(
  `const createPaymentHref =
    buildCreatePaymentHref({
      factureId,
      clientId,
      vehiculeId,
    });`,
  `const createPaymentHref =
    buildCreatePaymentHref({
      factureId,
      clientId,
      vehiculeId,
      montant: resteAPayer,
    });`
);

write(invoicePaymentsPath, invoicePayments);

/**
 * Patch ERPRuntimeDetails if it builds encaissement href manually.
 */
let runtimeDetails = fs.existsSync(full(runtimeDetailsPath))
  ? fs.readFileSync(full(runtimeDetailsPath), "utf8")
  : "";

if (runtimeDetails) {
  if (!runtimeDetails.includes("buildRuntimeFactureEncaissementCreateHref")) {
    runtimeDetails = runtimeDetails.replace(
      `import`,
      `import { buildRuntimeFactureEncaissementCreateHref } from "@/runtime/navigation/RuntimeChildCreateHrefBuilder";
import`
    );
  }

  const manualBuilderRegex =
    /function buildInvoicePaymentHref\([\s\S]*?\n\}/m;

  const nextRuntimeDetailsBuilder = `function buildInvoicePaymentHref(
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
    returnTo: "/facturesauto/" + factureId,
  });
}`;

  if (manualBuilderRegex.test(runtimeDetails)) {
    runtimeDetails = runtimeDetails.replace(manualBuilderRegex, nextRuntimeDetailsBuilder);
    write(runtimeDetailsPath, runtimeDetails);
  } else {
    console.log("[SKIP] buildInvoicePaymentHref not found in ERPRuntimeDetails.");
  }
}

const combined = builderContent + invoicePayments + runtimeDetails;

const required = [
  "buildRuntimeChildCreateHref",
  "buildRuntimeFactureEncaissementCreateHref",
  "parentModuleKey",
  "parentRecordId",
  "parentForeignKey",
  "lockFields",
  "parentModuleKey: \\"facturesauto\\"",
  "parentForeignKey: \\"factureId\\"",
];

for (const marker of required) {
  if (!combined.includes(marker)) {
    console.error("[PATCH_FAILED] Missing marker:", marker);
    process.exit(1);
  }
}

console.log("[Q2-OP-H1] Runtime child create href builder installed and payment links patched.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");