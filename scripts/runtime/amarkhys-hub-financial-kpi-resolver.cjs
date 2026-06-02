const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "runtime", "hub", "RuntimeClientOperationalHubLoader.ts");
const REPORT = path.join(ROOT, "docs", "audits", "AMARKHYS-HUB-FINANCIAL-KPI-RESOLVER.md");
const BACKUP = TARGET + ".bak-financial-kpi-resolver";

function fail(message) {
  console.error("[FAIL] " + message);
  process.exit(1);
}

function ok(message) {
  console.log("[OK] " + message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

console.log("[AMARKHYS-HUB-FINANCIAL-KPI-RESOLVER] Strengthen client operational financial KPIs");

if (!fs.existsSync(TARGET)) {
  fail("Missing target: " + TARGET);
}

const before = read(TARGET);
write(BACKUP, before);
ok("Backup written: " + path.relative(ROOT, BACKUP));

let after = before;

/**
 * 1. Add financial helper functions after isPaidInvoice().
 */
if (!after.includes("function isCancelledFinancialRecord(")) {
  const anchor = `function isPaidInvoice(record: ERPRecordHubRecord): boolean {
  const status = String(record.statut ?? record.status ?? record.etat ?? "")
    .trim()
    .toLowerCase();

  return [
    "payee",
    "pay\\u00e9e",
    "reglee",
    "r\\u00e9gl\\u00e9e",
    "soldee",
    "sold\\u00e9e",
  ].includes(status);
}
`;

  if (!after.includes(anchor)) {
    fail("isPaidInvoice anchor not found.");
  }

  const helpers = `${anchor}

function normalizeFinancialStatus(record: ERPRecordHubRecord): string {
  return String(record.statut ?? record.status ?? record.etat ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "");
}

function isCancelledFinancialRecord(record: ERPRecordHubRecord): boolean {
  const status = normalizeFinancialStatus(record);

  return [
    "annulee",
    "annule",
    "cancelled",
    "canceled",
    "supprimee",
    "removed",
  ].includes(status);
}

function isDraftFinancialRecord(record: ERPRecordHubRecord): boolean {
  const status = normalizeFinancialStatus(record);

  return [
    "brouillon",
    "draft",
  ].includes(status);
}

function invoiceTotalAmount(invoice: ERPRecordHubRecord): number {
  return readNumber(invoice, [
    "montantTTC",
    "totalTTC",
    "montantTotal",
    "total",
    "montant",
    "amount",
  ]);
}

function invoiceExplicitRemainingAmount(invoice: ERPRecordHubRecord): number {
  return readNumber(invoice, [
    "resteAPayer",
    "reste\\u00c0Payer",
    "resteARegler",
    "solde",
    "montantRestant",
    "balanceDue",
  ]);
}

function paymentAmount(payment: ERPRecordHubRecord): number {
  return readNumber(payment, [
    "montantEncaisse",
    "montantEncaiss\\u00e9",
    "montantPaye",
    "montantPay\\u00e9",
    "montant",
    "amount",
    "total",
  ]);
}

function invoiceLinkedPayments(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): ERPRecordHubRecord[] {
  const invoiceId = String(invoice.id ?? "");

  if (!invoiceId) {
    return [];
  }

  return payments.filter((payment) => {
    if (isCancelledFinancialRecord(payment)) {
      return false;
    }

    return [
      "factureId",
      "invoiceId",
      "factureAutoId",
      "facturesautoId",
    ].some((key) => String(payment[key] ?? "") === invoiceId);
  });
}

function invoicePaidAmount(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): number {
  return sumRecords(invoiceLinkedPayments(invoice, payments), [
    "montantEncaisse",
    "montantEncaiss\\u00e9",
    "montantPaye",
    "montantPay\\u00e9",
    "montant",
    "amount",
    "total",
  ]);
}

function invoiceRemainingAmount(
  invoice: ERPRecordHubRecord,
  payments: ERPRecordHubRecord[]
): number {
  if (isCancelledFinancialRecord(invoice)) {
    return 0;
  }

  if (isPaidInvoice(invoice)) {
    return 0;
  }

  const total = invoiceTotalAmount(invoice);
  const explicitRemaining = invoiceExplicitRemainingAmount(invoice);

  if (explicitRemaining > 0) {
    return Math.max(explicitRemaining, 0);
  }

  const paid = invoicePaidAmount(invoice, payments);

  return Math.max(total - paid, 0);
}
`;

  after = after.replace(anchor, helpers);
}

/**
 * 2. Replace financial calculation block inside enrichClientRoot.
 */
const oldBlock = `  const activeInterventions = interventions.filter((record) => !isClosedStatus(record));
  const unpaidInvoices = invoices.filter((record) => !isPaidInvoice(record));

  const revenueTotal = sumRecords(invoices, [
    "montantTTC",
    "totalTTC",
    "montantTotal",
    "total",
    "montant",
  ]);

  const unpaidInvoicesAmount = sumRecords(unpaidInvoices, [
    "montantTTC",
    "totalTTC",
    "montantTotal",
    "total",
    "montant",
    "resteAPayer",
    "reste\\u00c0Payer",
  ]);
`;

const newBlock = `  const activeInterventions = interventions.filter((record) => !isClosedStatus(record));

  const validInvoices = invoices.filter((record) => {
    return !isCancelledFinancialRecord(record) && !isDraftFinancialRecord(record);
  });

  const validPayments = payments.filter((record) => {
    return !isCancelledFinancialRecord(record);
  });

  const unpaidInvoices = validInvoices.filter((record) => {
    return invoiceRemainingAmount(record, validPayments) > 0;
  });

  const revenueTotal = validInvoices.reduce((total, invoice) => {
    return total + invoiceTotalAmount(invoice);
  }, 0);

  const paidTotal = validPayments.reduce((total, payment) => {
    return total + paymentAmount(payment);
  }, 0);

  const unpaidInvoicesAmount = validInvoices.reduce((total, invoice) => {
    return total + invoiceRemainingAmount(invoice, validPayments);
  }, 0);
`;

if (!after.includes(oldBlock)) {
  fail("Old financial calculation block not found.");
}

after = after.replace(oldBlock, newBlock);

/**
 * 3. Add paid/remaining fields into enriched root.
 */
if (!after.includes("paidTotal,")) {
  const anchor = `    revenueTotal,
    chiffreAffaires: revenueTotal,
    caCumule: revenueTotal,
`;

  const replacement = `    revenueTotal,
    chiffreAffaires: revenueTotal,
    caCumule: revenueTotal,

    paidTotal,
    montantEncaisse: paidTotal,
    montantEncaiss\\u00e9: paidTotal,

    remainingAmount: unpaidInvoicesAmount,
    resteAEncaisser: unpaidInvoicesAmount,
    reste\\u00c0Encaisser: unpaidInvoicesAmount,
`;

  if (!after.includes(anchor)) {
    fail("Revenue root fields anchor not found.");
  }

  after = after.replace(anchor, replacement);
}

/**
 * 4. Checks.
 */
const checks = [
  ["component changed", after !== before],
  ["cancelled financial helper added", after.includes("function isCancelledFinancialRecord")],
  ["draft financial helper added", after.includes("function isDraftFinancialRecord")],
  ["invoice total helper added", after.includes("function invoiceTotalAmount")],
  ["invoice remaining helper added", after.includes("function invoiceRemainingAmount")],
  ["payments used by invoice remaining", after.includes("invoicePaidAmount(record, validPayments)") || after.includes("invoiceRemainingAmount(record, validPayments)")],
  ["unpaid uses remaining", after.includes("invoiceRemainingAmount(record, validPayments) > 0")],
  ["revenue uses valid invoices", after.includes("const revenueTotal = validInvoices.reduce")],
  ["paid total exposed", after.includes("paidTotal," )],
  ["remaining exposed", after.includes("resteAEncaisser")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail("Checks failed: " + failed.map(([name]) => name).join(", "));
}

write(TARGET, after);
ok("Written: " + path.relative(ROOT, TARGET));

const report = [
  "# AMARKHYS-HUB-FINANCIAL-KPI-RESOLVER",
  "",
  "## Objectif",
  "",
  "Corriger les KPI financiers de la fiche client opérationnelle dans le loader runtime existant.",
  "",
  "## Correction",
  "",
  "- Les impayés ne sont plus une simple somme des montants TTC des factures non payées.",
  "- Les paiements liés aux factures sont pris en compte.",
  "- `resteAPayer` / `solde` / `montantRestant` sont prioritaires si renseignés.",
  "- Les factures annulées et brouillons sont exclues.",
  "- Les encaissements annulés sont exclus.",
  "- `paidTotal` et `remainingAmount` sont exposés dans `rootRecord`.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => "- " + (passed ? "OK" : "FAIL") + " — " + name),
  "",
].join("\\n");

write(REPORT, report);
ok("Report: " + path.relative(ROOT, REPORT));

console.log("[AMARKHYS-HUB-FINANCIAL-KPI-RESOLVER] DONE");
console.log("[NEXT] pnpm build");