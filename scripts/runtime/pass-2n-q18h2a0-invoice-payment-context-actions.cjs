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

function replaceOnce(content, from, to, label) {
  if (!content.includes(from)) {
    throw new Error(`[${label}] pattern introuvable`);
  }

  return content.replace(from, to);
}

function main() {
  const file = p(
    "src",
    "components",
    "erp",
    "billing",
    "InvoicePaymentsHistory.tsx"
  );

  backup(file, "q18h2a0-invoice-payment-context-actions");

  let content = read(file);

  if (!content.includes(`import Link from "next/link";`)) {
    content = replaceOnce(
      content,
      `import { useEffect, useMemo, useState } from "react";`,
      `import Link from "next/link";
import { useEffect, useMemo, useState } from "react";`,
      "add Link import"
    );
  }

  if (!content.includes("clientId?: string;")) {
    content = replaceOnce(
      content,
      `interface InvoicePaymentsHistoryProps {
  factureId: string;
  montantTTC?: number;
}`,
      `interface InvoicePaymentsHistoryProps {
  factureId: string;
  montantTTC?: number;
  clientId?: string;
  vehiculeId?: string;
}`,
      "extend props with inherited context"
    );
  }

  if (!content.includes("function buildInvoiceReturnTo")) {
    content = replaceOnce(
      content,
      `function formatMode(
  value?: string
): string {`,
      `function buildInvoiceReturnTo(
  factureId: string
): string {
  return "/facturesauto/" + encodeURIComponent(factureId) + "/edit";
}

function buildCreatePaymentHref({
  factureId,
  clientId,
  vehiculeId,
}: {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
}): string {
  const params = new URLSearchParams();

  params.set("factureId", factureId);

  if (clientId) {
    params.set("clientId", clientId);
  }

  if (vehiculeId) {
    params.set("vehiculeId", vehiculeId);
  }

  params.set("parentModuleKey", "facturesauto");
  params.set("parentRecordId", factureId);
  params.set("parentForeignKey", "factureId");
  params.set("returnTo", buildInvoiceReturnTo(factureId));
  params.set("returnLabel", "Retour facture");
  params.set(
    "lockFields",
    ["factureId", "clientId", "vehiculeId"]
      .filter((field) =>
        field === "factureId" ||
        (field === "clientId" && clientId) ||
        (field === "vehiculeId" && vehiculeId)
      )
      .join(",")
  );

  return "/encaissementsauto/nouveau?" + params.toString();
}

function buildEditPaymentHref(
  paymentId: string | undefined,
  factureId: string
): string {
  if (!paymentId) {
    return "#";
  }

  const params = new URLSearchParams();

  params.set("returnTo", buildInvoiceReturnTo(factureId));
  params.set("returnLabel", "Retour facture");

  return (
    "/encaissementsauto/" +
    encodeURIComponent(paymentId) +
    "/edit?" +
    params.toString()
  );
}

function formatMode(
  value?: string
): string {`,
      "add parent child payment href helpers"
    );
  }

  content = replaceOnce(
    content,
    `function MobilePaymentCard({
  item,
  factureId,
}: {
  item: Encaissement;
  factureId: string;
}) {
  return (`,
    `function MobilePaymentCard({
  item,
  factureId,
}: {
  item: Encaissement;
  factureId: string;
}) {
  const editHref =
    buildEditPaymentHref(
      item.id,
      factureId
    );

  return (`,
    "add mobile edit href"
  );

  content = replaceOnce(
    content,
    `      <div className="mt-4 border-t border-slate-100 pt-4">
        <PaymentReceiptActions
          payment={item as Record<string, unknown>}
          factureId={factureId}
        />
      </div>`,
    `      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
        <Link
          href={editHref}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
        >
          Modifier ce paiement
        </Link>

        <PaymentReceiptActions
          payment={item as Record<string, unknown>}
          factureId={factureId}
        />
      </div>`,
    "add mobile edit action"
  );

  content = replaceOnce(
    content,
    `export function InvoicePaymentsHistory({
  factureId,
  montantTTC = 0,
}: InvoicePaymentsHistoryProps) {`,
    `export function InvoicePaymentsHistory({
  factureId,
  montantTTC = 0,
  clientId,
  vehiculeId,
}: InvoicePaymentsHistoryProps) {`,
    "destructure inherited context props"
  );

  if (!content.includes("const createPaymentHref =")) {
    content = replaceOnce(
      content,
      `  const resteAPayer =
    Math.max(
      Number(montantTTC ?? 0) - totalValide,
      0
    );`,
      `  const resteAPayer =
    Math.max(
      Number(montantTTC ?? 0) - totalValide,
      0
    );

  const createPaymentHref =
    buildCreatePaymentHref({
      factureId,
      clientId,
      vehiculeId,
    });`,
      "add create payment href"
    );
  }

  content = replaceOnce(
    content,
    `        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600">`,
    `        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <Link
            href={createPaymentHref}
            className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D]"
          >
            Ajouter un paiement
          </Link>

          <label className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600">`,
    "add create payment button"
  );

  content = replaceOnce(
    content,
    `                    <div>
                      <PaymentStatusBadge statut={item.statut} />
                    </div>

                    <div>
                      <PaymentReceiptActions`,
    `                    <div>
                      <PaymentStatusBadge statut={item.statut} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link
                        href={buildEditPaymentHref(item.id, factureId)}
                        className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white transition hover:bg-slate-800"
                      >
                        Modifier
                      </Link>

                      <PaymentReceiptActions`,
    "add desktop edit button"
  );

  write(file, content);

  console.log(`[WRITTEN] ${path.relative(root, file)}`);
  console.log("");
  console.log("[Q18H2A0_DONE]");
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  tester facture -> ajouter/modifier paiement");
}

main();