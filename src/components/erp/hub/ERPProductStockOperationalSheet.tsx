"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { RuntimeProductKpiEngine } from "@/runtime/kpi/RuntimeProductKpiEngine";

import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ProductHubSearchSuggestion = {
  id: string;
  label: string;
  code: string;
  type: string;
};

type ProductHubSearchState = {
  query: string;
  suggestions: ProductHubSearchSuggestion[];
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSelectProduct: (productId: string) => void;
};

type ERPProductStockOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
  productSearch?: ProductHubSearchState;
};

type ReturnParams = Record<string, string | null | undefined>;

function recordId(record: ERPRecordHubRecord | null | undefined): string {
  return String(record?.id ?? record?._id ?? "");
}

function text(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[],
  fallback = "-"
): string {
  if (!record) return fallback;

  for (const field of fields) {
    const value = record[field];

    if (value !== null && value !== undefined && String(value).trim() !== "") {
      return String(value);
    }
  }

  return fallback;
}

function numberValue(
  record: ERPRecordHubRecord | null | undefined,
  fields: string[],
  fallback = 0
): number {
  if (!record) return fallback;

  for (const field of fields) {
    const value = Number(record[field]);

    if (Number.isFinite(value)) {
      return value;
    }
  }

  return fallback;
}

function safeNumber(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(safeNumber(value));
}

function money(value: number): string {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(safeNumber(value)) + " FCFA"
  );
}

function formatDate(value: string): string {
  if (!value || value === "-") return "-";

  const raw = String(value).trim();

  if (!raw || raw.toLowerCase() === "undefined" || raw.toLowerCase() === "null") {
    return "-";
  }

  const numeric = Number(raw);

  if (Number.isFinite(numeric)) {
    const milliseconds = numeric > 100000000000 ? numeric : numeric * 1000;
    const date = new Date(milliseconds);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
  }

  const firestoreSecondsMatch = raw.match(/seconds[=:]\s*(\d+)/i);

  if (firestoreSecondsMatch) {
    const date = new Date(Number(firestoreSecondsMatch[1]) * 1000);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
  }

  const date = new Date(raw);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function href(
  moduleKey: string,
  record: ERPRecordHubRecord | null | undefined
): string {
  const id = recordId(record);

  return id ? "/" + moduleKey + "/" + id : "/" + moduleKey;
}

function queryHref(
  pathname: string,
  params: Record<string, string | null | undefined>
): string {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && String(value).trim() !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();

  return query ? pathname + "?" + query : pathname;
}

function withReturnTo(
  pathname: string,
  returnTo: string,
  params: ReturnParams = {}
): string {
  return queryHref(pathname, {
    ...params,
    returnTo,
  });
}

function movementType(record: ERPRecordHubRecord): "entree" | "sortie" | "autre" {
  const type = text(record, ["typeMouvement", "type", "sens"], "").toLowerCase();

  if (type.includes("entree") || type.includes("entrée")) return "entree";
  if (type.includes("sortie")) return "sortie";

  return "autre";
}

function movementLabel(record: ERPRecordHubRecord): string {
  const type = movementType(record);

  if (type === "entree") return "Entrée";
  if (type === "sortie") return "Sortie";

  return text(record, ["typeMouvement", "type", "sens"], "Mouvement");
}

function movementTone(record: ERPRecordHubRecord): string {
  const type = movementType(record);

  if (type === "entree") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (type === "sortie") {
    return "bg-orange-50 text-orange-700 ring-orange-200";
  }

  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function movementIcon(record: ERPRecordHubRecord): string {
  const type = movementType(record);

  if (type === "entree") return "↘";
  if (type === "sortie") return "↗";

  return "↕";
}

function sourceLabel(record: ERPRecordHubRecord): string {
  const sourceModule = text(record, ["sourceModule"], "");
  const type = movementType(record);

  if (sourceModule === "lignesinterventionauto") {
    if (type === "entree") {
      return "Réintégration intervention";
    }

    if (type === "sortie") {
      return "Sortie intervention";
    }

    return "Mouvement intervention";
  }

  if (sourceModule === "receptionsstockauto") {
    return "Réception fournisseur";
  }

  if (sourceModule === "mouvementsstockauto") {
    return "Mouvement stock";
  }

  return text(record, ["motif", "description"], "Mouvement stock");
}

function movementOriginLabel(record: ERPRecordHubRecord): string {
  const sourceModule = text(record, ["sourceModule"], "");

  if (sourceModule === "lignesinterventionauto") {
    return "Ligne intervention";
  }

  if (sourceModule === "receptionsstockauto") {
    return "Réception stock";
  }

  if (sourceModule === "commandesstockauto") {
    return "Commande fournisseur";
  }

  if (sourceModule === "stocksauto") {
    return "Stock";
  }

  return "Origine stock";
}

function movementSubtitle(record: ERPRecordHubRecord): string {
  const movementDate = formatDate(
    text(record, ["dateMouvement", "createdAt", "updatedAt", "date"], "-")
  );

  const origin = movementOriginLabel(record);

  if (movementDate === "-") {
    return origin;
  }

  return movementDate + " · " + origin;
}
function quantitySigned(record: ERPRecordHubRecord): string {
  const quantity = numberValue(record, ["quantite", "quantity"]);
  const type = movementType(record);

  if (quantity <= 0) return "-";

  if (type === "entree") return "+" + formatNumber(quantity);
  if (type === "sortie") return "-" + formatNumber(quantity);

  return formatNumber(quantity);
}

function humanStatusLabel(value: string): string {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return "-";
  }

  const lower = normalized.toLowerCase();

  const labels: Record<string, string> = {
    actif: "Actif",
    active: "Actif",
    disponible: "Disponible",
    stock_faible: "Stock faible",
    faible: "Stock faible",
    alerte: "Alerte stock",
    rupture: "Rupture stock",
    brouillon: "Brouillon",
    validee: "Validée",
    validée: "Validée",
    envoyee: "Envoyée",
    envoyée: "Envoyée",
    partielle: "Partielle",
    receptionnee: "Réceptionnée",
    réceptionnée: "Réceptionnée",
    annulee: "Annulée",
    annulée: "Annulée",
  };

  if (labels[lower]) {
    return labels[lower];
  }

  return normalized
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}
function isTechnicalId(value: string): boolean {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return false;
  }

  return /^[A-Za-z0-9_-]{16,}$/.test(raw);
}

function cleanBusinessText(value: string, fallback = "-"): string {
  const raw = String(value ?? "").trim();

  if (!raw || raw === "-") {
    return fallback;
  }

  if (isTechnicalId(raw)) {
    return fallback;
  }

  return raw;
}

function supplierLabel(record: ERPRecordHubRecord): string {
  return cleanBusinessText(
    text(
      record,
      [
        "fournisseurLabel",
        "fournisseurNom",
        "nomFournisseur",
        "supplierName",
        "supplierLabel",
        "fournisseur",
      ],
      ""
    ),
    "Fournisseur non renseigné"
  );
}

function orderDateLabel(record: ERPRecordHubRecord): string {
  const value = formatDate(
    text(
      record,
      [
        "dateCommande",
        "dateEmission",
        "dateDocument",
        "createdAt",
        "updatedAt",
      ],
      "-"
    )
  );

  return value === "-" ? "Date non renseignée" : value;
}

function orderedQuantityLabel(record: ERPRecordHubRecord): string {
  const quantity = numberValue(
    record,
    [
      "quantiteCommandee",
      "productLineQuantity",
      "quantite",
      "quantity",
    ],
    Number.NaN
  );

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return "Quantité non renseignée";
  }

  return formatNumber(quantity) + " unité" + (quantity > 1 ? "s" : "");
}

function amountLabel(record: ERPRecordHubRecord): string {
  const amount = numberValue(
    record,
    [
      "productLineAmountTTC",
      "montantTTC",
      "totalTTC",
      "montantHT",
      "productLineAmountHT",
      "total",
    ],
    Number.NaN
  );

  if (!Number.isFinite(amount) || amount <= 0) {
    return "";
  }

  return money(amount);
}

function orderSubtitle(record: ERPRecordHubRecord): string {
  return supplierLabel(record) + " · " + orderDateLabel(record);
}

function orderQuantityOrAmount(record: ERPRecordHubRecord): string {
  const quantity = orderedQuantityLabel(record);
  const amount = amountLabel(record);

  if (amount) {
    return quantity + " · " + amount;
  }

  return quantity;
}


function latestOrderLabel(records: ERPRecordHubRecord[]): string {
  const first = records[0];

  if (!first) {
    return "Aucune commande";
  }

  return text(first, ["numeroCommande", "numero", "code", "displayLabel"], "Commande");
}

function latestReceptionLabel(records: ERPRecordHubRecord[]): string {
  const first = records[0];

  if (!first) {
    return "Aucune réception";
  }

  return receptionSubtitle(first);
}

function mainSupplierLabel(records: ERPRecordHubRecord[]): string {
  const first = records.find((record) => supplierLabel(record) !== "Fournisseur non renseigné");

  if (!first) {
    return "Fournisseur non renseigné";
  }

  return supplierLabel(first);
}

function totalOrderedQuantity(records: ERPRecordHubRecord[]): string {
  const total = records.reduce((sum, record) => {
    return sum + numberValue(record, ["quantiteCommandee", "productLineQuantity", "quantite"], 0);
  }, 0);

  if (total <= 0) {
    return "Quantité non renseignée";
  }

  return formatNumber(total) + " unité" + (total > 1 ? "s" : "");
}

function totalReceivedQuantity(records: ERPRecordHubRecord[]): string {
  const total = records.reduce((sum, record) => {
    return sum + numberValue(record, ["quantiteRecue", "quantitéReçue", "quantite", "quantity"], 0);
  }, 0);

  if (total <= 0) {
    return "Aucune réception";
  }

  return formatNumber(total) + " unité" + (total > 1 ? "s" : "");
}

function receptionSubtitle(record: ERPRecordHubRecord): string {
  const date = formatDate(
    text(
      record,
      [
        "dateReception",
        "dateRéception",
        "createdAt",
        "updatedAt",
      ],
      "-"
    )
  );

  const quantity = numberValue(
    record,
    [
      "quantiteRecue",
      "quantitéReçue",
      "quantite",
      "quantity",
    ],
    Number.NaN
  );

  const dateLabel = date === "-" ? "Date non renseignée" : date;
  const quantityLabel =
    Number.isFinite(quantity) && quantity > 0
      ? formatNumber(quantity) + " unité" + (quantity > 1 ? "s" : "")
      : "Quantité non renseignée";

  return dateLabel + " · " + quantityLabel;
}
function statusPillClass(status: string): string {
  const normalized = status.toLowerCase();

  if (
    normalized.includes("valide") ||
    normalized.includes("validée") ||
    normalized.includes("actif") ||
    normalized.includes("confirm")
  ) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  if (
    normalized.includes("brouillon") ||
    normalized.includes("cours") ||
    normalized.includes("partiel")
  ) {
    return "bg-orange-50 text-orange-700 ring-orange-200";
  }

  if (normalized.includes("annul")) {
    return "bg-red-50 text-red-700 ring-red-200";
  }

  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function stockStatusClass(status: string): string {
  const normalized = status.toLowerCase();

  if (normalized.includes("rupture")) {
    return "bg-red-50 text-red-700 ring-red-200";
  }

  if (normalized.includes("faible") || normalized.includes("alerte")) {
    return "bg-orange-50 text-orange-700 ring-orange-200";
  }

  if (normalized.includes("actif") || normalized.includes("disponible")) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }

  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-950">
          {title}
        </h3>

        {subtitle ? (
          <p className="mt-2 text-sm font-medium text-slate-500">{subtitle}</p>
        ) : null}
      </div>

      {action}
    </div>
  );
}

function EmptyPanel({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex min-h-[205px] flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-slate-100">
        {icon}
      </div>
      <p className="mt-4 max-w-[240px] text-sm font-semibold text-slate-500">
        {text}
      </p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sublabel,
  icon,
  tone = "white",
}: {
  label: string;
  value: string;
  sublabel?: string;
  icon?: string;
  tone?: "green" | "white" | "orange";
}) {
  const isGreen = tone === "green";
  const isOrange = tone === "orange";

  return (
    <article
      className={[
        "min-h-[132px] rounded-[1.75rem] px-5 py-5 shadow-sm ring-1 transition",
        isGreen
          ? "bg-emerald-600 text-white ring-emerald-500"
          : "bg-white text-slate-950 ring-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p
            className={[
              "text-[10px] font-black uppercase tracking-[0.16em]",
              isGreen ? "text-emerald-50" : "text-slate-500",
            ].join(" ")}
          >
            {label}
          </p>

          <p
            className={[
              "mt-4 text-3xl font-black tracking-tight",
              isOrange ? "text-orange-500" : "",
            ].join(" ")}
          >
            {value}
          </p>

          {sublabel ? (
            <p
              className={[
                "mt-1 text-xs font-bold",
                isGreen ? "text-emerald-50/90" : "text-slate-400",
              ].join(" ")}
            >
              {sublabel}
            </p>
          ) : null}
        </div>

        {icon ? (
          <div
            className={[
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl",
              isGreen
                ? "bg-white/15 text-white"
                : isOrange
                  ? "bg-orange-50 text-orange-500"
                  : "bg-emerald-50 text-emerald-700",
            ].join(" ")}
          >
            {icon}
          </div>
        ) : null}
      </div>
    </article>
  );
}

function FlowNode({
  icon,
  title,
  subtitle,
  faded = false,
  tone = "green",
}: {
  icon: string;
  title: string;
  subtitle?: string;
  faded?: boolean;
  tone?: "green" | "orange" | "slate";
}) {
  const toneClass =
    tone === "orange"
      ? "text-orange-600 ring-orange-100"
      : tone === "slate"
        ? "text-slate-500 ring-slate-100"
        : "text-emerald-700 ring-emerald-100";

  return (
    <div
      className={[
        "flex min-h-[64px] items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1",
        toneClass,
        faded ? "opacity-55" : "",
      ].join(" ")}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-lg">
        {icon}
      </span>

      <div>
        <p className="text-sm font-black text-slate-900">{title}</p>
        {subtitle ? (
          <p className="mt-0.5 text-xs font-semibold text-slate-400">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}


type OrderLineDeliveryItem = Record<string, unknown>;

function orderLineDeliveryItems(rootRecord: ERPRecordHubRecord | null): OrderLineDeliveryItem[] {
  if (!rootRecord) {
    return [];
  }

  const value = (rootRecord as Record<string, unknown>).productOrderLineDeliveryCascade;

  return Array.isArray(value) ? (value as OrderLineDeliveryItem[]) : [];
}

function orderLineDeliveryText(record: OrderLineDeliveryItem, key: string, fallback = "-"): string {
  const raw = String(record[key] ?? "").trim();

  return raw || fallback;
}

function orderLineDeliveryNumberValue(record: OrderLineDeliveryItem, key: string): number {
  const value = Number(record[key] ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function orderLineDeliveryArray(record: OrderLineDeliveryItem, key: string): OrderLineDeliveryItem[] {
  const value = record[key];

  return Array.isArray(value) ? (value as OrderLineDeliveryItem[]) : [];
}

function orderLineQuantityLabel(value: number): string {
  if (!Number.isFinite(value) || value <= 0) {
    return "0 unité";
  }

  return formatNumber(value) + " unité" + (value > 1 ? "s" : "");
}

function orderLineDeliveryStatusLabel(status: string): string {
  if (status === "en_attente") {
    return "En attente";
  }

  if (status === "partiellement_livree") {
    return "Partiellement livrée";
  }

  if (status === "totalement_livree") {
    return "Totalement livrée";
  }

  return humanStatusLabel(status);
}

function orderLineDeliveryStatusClass(status: string): string {
  if (status === "en_attente") {
    return "rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-black text-orange-700 ring-1 ring-orange-100";
  }

  if (status === "partiellement_livree") {
    return "rounded-full bg-blue-50 px-3 py-1.5 text-[11px] font-black text-blue-700 ring-1 ring-blue-100";
  }

  if (status === "totalement_livree") {
    return "rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-black text-emerald-700 ring-1 ring-emerald-100";
  }

  return statusPillClass(status);
}

function OrderLinesDeliveryPanel({ items }: { items: OrderLineDeliveryItem[] }) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-7">
      <SectionTitle
        title="Lignes de commande du produit"
        subtitle="Lignes où ce produit apparaît, avec leurs livraisons associées."
      />

      {items.length === 0 ? (
        <EmptyPanel icon="📄" text="Aucune ligne de commande liée à ce produit." />
      ) : (
        <div className="space-y-3">
          <div className="grid items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white xl:grid-cols-[44px_1fr_1fr_1fr_1fr]">
            <span />
            <span>Date ligne commande</span>
            <span>Quantité commandée</span>
            <span>Montant</span>
            <span>Statut livraison</span>
          </div>

          {items.map((line) => {
            const lineId = orderLineDeliveryText(line, "id", orderLineDeliveryText(line, "title", "ligne"));
            const receptions = orderLineDeliveryArray(line, "receptions");
            const status = orderLineDeliveryText(line, "deliveryStatus", "en_attente");

            return (
              <details
                key={lineId}
                className="group rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-sm open:ring-1 open:ring-emerald-100"
              >
                <summary className="cursor-pointer list-none">
                  <div className="grid items-center gap-3 xl:grid-cols-[44px_1fr_1fr_1fr_1fr]">
                    <div className="flex items-center justify-center">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-base font-black text-emerald-700 ring-1 ring-emerald-200 group-open:hidden">
                        +
                      </span>
                      <span className="hidden h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-base font-black text-white group-open:inline-flex">
                        −
                      </span>
                    </div>

                    <div>
                      <p className="truncate text-xs font-black text-slate-900">
                        {formatDate(orderLineDeliveryText(line, "dateCommande", ""))}
                      </p>
                      <p className="mt-1 truncate text-[11px] font-bold text-slate-500">
                        {orderLineDeliveryText(line, "orderTitle", "Commande fournisseur")}
                      </p>
                    </div>

                    <p className="truncate text-xs font-black text-slate-900">
                      {orderLineQuantityLabel(orderLineDeliveryNumberValue(line, "quantityOrdered"))}
                    </p>

                    <p className="truncate text-xs font-black text-slate-900">
                      {money(orderLineDeliveryNumberValue(line, "amount"))}
                    </p>

                    <div className="flex items-center justify-start">
                      <span className={orderLineDeliveryStatusClass(status)}>
                        {orderLineDeliveryStatusLabel(status)}
                      </span>
                    </div>
                  </div>
                </summary>

                <div className="mt-4 space-y-3 border-t border-slate-200 pt-4">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Ligne de commande
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-900">
                      {orderLineDeliveryText(line, "title", "Ligne de commande")}
                    </p>
                    <p className="mt-1 text-xs font-bold text-slate-500">
                      Fournisseur : {orderLineDeliveryText(line, "supplierLabel", "Fournisseur non renseigné")}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
                    <div className="mb-3 grid items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 xl:grid-cols-[1fr_1fr]">
                      <span>Date livraison</span>
                      <span>Quantité livrée</span>
                    </div>

                    {receptions.length === 0 ? (
                      <p className="rounded-2xl bg-orange-50 px-4 py-3 text-xs font-bold text-orange-700 ring-1 ring-orange-100">
                        Aucune livraison rattachée à cette ligne.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {receptions.map((reception) => {
                          const receptionId = orderLineDeliveryText(
                            reception,
                            "id",
                            orderLineDeliveryText(reception, "dateLivraison", "livraison")
                          );

                          return (
                            <div
                              key={receptionId}
                              className="grid items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-xs ring-1 ring-emerald-100 xl:grid-cols-[1fr_1fr]"
                            >
                              <p className="font-black text-emerald-900">
                                {formatDate(orderLineDeliveryText(reception, "dateLivraison", ""))}
                              </p>
                              <p className="font-black text-emerald-700">
                                {orderLineQuantityLabel(orderLineDeliveryNumberValue(reception, "quantityDelivered"))}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}


function productOperationalSummary({
  rootRecord,
  stocks,
  mouvements,
}: {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
}) {
  return RuntimeProductKpiEngine.compute({
    rootRecord,
    stocks,
    mouvements,
    orderLineDeliveryItems: orderLineDeliveryItems(rootRecord),
  });
}

function OperationalSummaryCard({
  title,
  icon,
  primary,
  secondary,
  tone = "slate",
}: {
  title: string;
  icon: string;
  primary: string;
  secondary: string;
  tone?: "emerald" | "blue" | "orange" | "slate";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-100"
      : tone === "blue"
        ? "bg-blue-50 text-blue-800 ring-blue-100"
        : tone === "orange"
          ? "bg-orange-50 text-orange-800 ring-orange-100"
          : "bg-slate-50 text-slate-800 ring-slate-100";

  return (
    <div className={"rounded-[1.5rem] p-5 ring-1 " + toneClass}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.16em] opacity-70">
          {title}
        </p>
        <span className="text-2xl">{icon}</span>
      </div>

      <p className="text-2xl font-black tracking-tight">{primary}</p>
      <p className="mt-2 text-xs font-bold opacity-75">{secondary}</p>
    </div>
  );
}

function ProductOperationalSummary({
  rootRecord,
  stocks,
  mouvements,
}: {
  rootRecord: ERPRecordHubRecord | null;
  stocks: ERPRecordHubRecord[];
  mouvements: ERPRecordHubRecord[];
}) {
  const summary = productOperationalSummary({ rootRecord, stocks, mouvements });

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-7">
      <SectionTitle
        title="Synthèse opérationnelle du produit"
        subtitle="Lecture métier immédiate : approvisionnement, stock, utilisation atelier et potentiel produit."
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <OperationalSummaryCard
          title="Approvisionnement"
          icon="🚚"
          primary={orderLineQuantityLabel(summary.deliveredQuantity) + " livrées"}
          secondary={
            "Commandé " +
            orderLineQuantityLabel(summary.orderedQuantity) +
            " · Reste " +
            orderLineQuantityLabel(summary.remainingQuantity)
          }
          tone={summary.remainingQuantity > 0 ? "orange" : "emerald"}
        />

        <OperationalSummaryCard
          title="Stock"
          icon="📦"
          primary={orderLineQuantityLabel(summary.stockQuantity)}
          secondary={
            summary.alertThreshold > 0
              ? "Seuil " + orderLineQuantityLabel(summary.alertThreshold) + " · " + summary.stockState
              : summary.stockState
          }
          tone={summary.stockState === "OK" ? "emerald" : "orange"}
        />

        <OperationalSummaryCard
          title="Atelier"
          icon="🔧"
          primary={orderLineQuantityLabel(summary.workshopQuantity)}
          secondary={
            summary.lastExitDate
              ? "Dernière sortie " + formatDate(summary.lastExitDate)
              : "Aucune sortie atelier récente"
          }
          tone="blue"
        />

        <OperationalSummaryCard
          title="Performance"
          icon="⭐"
          primary={summary.performance}
          secondary="Basé sur commandes, livraisons et sorties"
          tone={
            summary.performance === "Produit phare"
              ? "emerald"
              : summary.performance === "Produit courant"
                ? "blue"
                : "slate"
          }
        />
      </div>
    </section>
  );
}

function ProductFlowDiagram() {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-7">
      <SectionTitle
        title="Parcours produit / flux stock"
        subtitle="Lecture visuelle du cycle produit : entrée, stock, sortie, intervention et vente future."
      />

      <div className="relative rounded-[1.8rem] bg-slate-50/70 p-5 ring-1 ring-slate-100">
        <div className="mx-auto flex max-w-[1120px] flex-col items-center">
          <div className="z-10 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-900 shadow-sm ring-1 ring-emerald-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-700">
              📦
            </span>
            Produit
          </div>

          <div className="h-8 w-px bg-emerald-200" />

          <div className="h-px w-full max-w-[760px] bg-emerald-200" />

          <div className="grid w-full max-w-[1040px] gap-8 pt-7 md:grid-cols-2">
            <div className="flex flex-col items-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                <span>↘</span>
                Entrée
              </div>

              <div className="grid w-full gap-3">
                <FlowNode icon="🚚" title="Commande" />
                <FlowNode icon="📄" title="Ligne de commande" />
                <FlowNode icon="📥" title="Ligne de réception" tone="orange" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 ring-1 ring-emerald-200">
                <span>📦</span>
                Stock
              </div>

              <div className="grid w-full gap-3">
                <FlowNode icon="↗" title="Sortie" />
                <FlowNode
                  icon="🔧"
                  title="Intervention"
                  subtitle="Ligne d’intervention"
                />
                <FlowNode
                  icon="🛒"
                  title="Vente"
                  subtitle="Boutique"
                  faded
                  tone="slate"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovementRow({
  movement,
  returnTo,
  returnParams,
}: {
  movement: ERPRecordHubRecord;
  returnTo: string;
  returnParams: ReturnParams;
}) {
  const type = movementType(movement);
  const quantity = quantitySigned(movement);
  const movementHref = withReturnTo(
    href("mouvementsstockauto", movement),
    returnTo,
    {
      ...returnParams,
      selectedMovementId: recordId(movement),
    }
  );

  return (
    <Link
      href={movementHref}
      className="group flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100 transition hover:bg-white hover:shadow-sm"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ring-1",
            movementTone(movement),
          ].join(" ")}
        >
          {movementIcon(movement)}
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-900">
            {sourceLabel(movement)}
          </p>
          <p className="mt-0.5 truncate text-xs font-semibold text-slate-400">
            {movementSubtitle(movement)}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p
          className={[
            "text-sm font-black",
            type === "entree"
              ? "text-emerald-600"
              : type === "sortie"
                ? "text-orange-600"
                : "text-slate-700",
          ].join(" ")}
        >
          {quantity}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
          unités
        </p>
      </div>
    </Link>
  );
}

function CompactRelatedRow({
  record,
  moduleKey,
  title,
  subtitle,
  quantity,
  status,
  returnTo,
  returnParams,
}: {
  record: ERPRecordHubRecord;
  moduleKey: string;
  title: string;
  subtitle: string;
  quantity?: string;
  status?: string;
  returnTo: string;
  returnParams: ReturnParams;
}) {
  const link = withReturnTo(href(moduleKey, record), returnTo, returnParams);

  return (
    <Link
      href={link}
      className="block rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100 transition hover:bg-white hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-slate-900">{title}</p>
          <p className="mt-1 truncate text-xs font-semibold text-slate-400">
            {subtitle}
          </p>
        </div>

        {status ? (
          <span
            className={[
              "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ring-1",
              statusPillClass(status),
            ].join(" ")}
          >
            {status}
          </span>
        ) : null}
      </div>

      {quantity ? (
        <p className="mt-3 text-sm font-black text-slate-700">{quantity}</p>
      ) : null}
    </Link>
  );
}

function DashboardPanel({
  title,
  icon,
  children,
  footerHref,
  footerLabel,
}: {
  title: string;
  icon: string;
  children: ReactNode;
  footerHref: string;
  footerLabel: string;
}) {
  return (
    <section className="flex min-h-[360px] flex-col rounded-[1.9rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-700 ring-1 ring-emerald-100">
            {icon}
          </span>
          <h3 className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-900">
            {title}
          </h3>
        </div>

        <span className="text-xl font-black text-slate-300">⋮</span>
      </div>

      <div className="flex-1 space-y-3">{children}</div>

      <Link
        href={footerHref}
        className="mt-5 inline-flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-700 ring-1 ring-emerald-100 transition hover:bg-white"
      >
        {footerLabel}
        <span>→</span>
      </Link>
    </section>
  );
}

export function ERPProductStockOperationalSheet({
  config,
  rootRecord,
  primaryRecords,
  relatedRecordsBySection,
  productSearch,
}: ERPProductStockOperationalSheetProps) {
  const selectedStock = primaryRecords[0] ?? null;
  const movements = relatedRecordsBySection.mouvements ?? [];
  const commandes = relatedRecordsBySection.commandes ?? [];
  const receptions = relatedRecordsBySection.receptions ?? [];

  const productHubReturnTo = queryHref("/produitsauto/hub", {
    productId: recordId(rootRecord),
    selectedStockId: recordId(selectedStock),
  });

  const productHubReturnParams = {
    productId: recordId(rootRecord),
    selectedStockId: recordId(selectedStock),
  };

  const productName = text(
    rootRecord,
    ["displayLabel", "nom", "designation", "libelle", "reference", "code"],
    "Produit"
  );

  const productCode = text(rootRecord, ["reference", "code", "sku"], "-");
  const productType = text(rootRecord, ["typeArticle", "typeProduit", "categorie"], "Article");
  const productStatus = text(rootRecord, ["statut", "status"], "actif");

  const rootStockTotal = numberValue(
    rootRecord,
    ["stockTotal", "quantiteTotale", "currentStock"],
    Number.NaN
  );

  const computedStockTotal = primaryRecords.reduce((total, stock) => {
    return total + numberValue(stock, ["quantite", "quantiteDisponible", "currentStock"]);
  }, 0);

  const displayedStockTotal = Number.isFinite(rootStockTotal)
    ? rootStockTotal
    : computedStockTotal;

  const unitSalePrice = numberValue(rootRecord, ["prixVente", "prixVenteHT", "prixUnitaire"]);
  const estimatedValue = displayedStockTotal * unitSalePrice;

  const entryMovements = movements.filter((movement) => movementType(movement) === "entree");
  const exitMovements = movements.filter((movement) => movementType(movement) === "sortie");

  const selectedQuantity = numberValue(
    selectedStock,
    ["quantite", "quantiteDisponible", "currentStock"]
  );
  const selectedThreshold = numberValue(selectedStock, ["seuilAlerte", "alertThreshold"]);
  const selectedStatus = text(selectedStock, ["statut", "status"], "actif");

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1920px] space-y-6">
        <header className="flex flex-col gap-4 rounded-[2rem] bg-white px-6 py-5 shadow-sm ring-1 ring-slate-200 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">
              Fiche produit / stock opérationnelle
            </p>

            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              {productName}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                Réf. {productCode}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">
                {productType}
              </span>
              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-black ring-1",
                  statusPillClass(productStatus),
                ].join(" ")}
              >
                {productStatus}
              </span>
            </div>
          </div>

          {productSearch ? (
            <div className="relative w-full xl:max-w-[460px]">
              <label className="sr-only" htmlFor="product-hub-search">
                Rechercher un produit
              </label>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 ring-1 ring-transparent transition focus-within:border-emerald-200 focus-within:bg-white focus-within:ring-emerald-100">
                <span className="text-lg">🔎</span>
                <input
                  id="product-hub-search"
                  value={productSearch.query}
                  onChange={(event) => productSearch.onQueryChange(event.target.value)}
                  placeholder="Rechercher un produit..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                />
                {productSearch.isLoading ? (
                  <span className="text-xs font-black text-slate-400">...</span>
                ) : null}
              </div>

              {productSearch.query.trim().length >= 2 ? (
                <div className="absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                  {productSearch.suggestions.length === 0 ? (
                    <p className="px-4 py-4 text-sm font-bold text-slate-500">
                      Aucun produit trouvé.
                    </p>
                  ) : (
                    <div className="max-h-[320px] overflow-auto p-2">
                      {productSearch.suggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => productSearch.onSelectProduct(item.id)}
                          className="flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition hover:bg-emerald-50"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-black text-slate-900">
                              {item.label}
                            </span>
                            <span className="mt-1 block truncate text-xs font-bold text-slate-500">
                              Réf. {item.code} · {item.type}
                            </span>
                          </span>
                          <span className="text-sm font-black text-emerald-700">Ouvrir</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Link
              href={withReturnTo(
                href("produitsauto", rootRecord),
                productHubReturnTo,
                productHubReturnParams
              )}
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              Ouvrir fiche
            </Link>

            <Link
              href={withReturnTo(
                href("produitsauto", rootRecord) + "/edit",
                productHubReturnTo,
                productHubReturnParams
              )}
              className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
            >
              Éditer
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard
            label="Stock actuel"
            value={formatNumber(displayedStockTotal)}
            sublabel="unités"
            icon="📦"
            tone="green"
          />
          <KpiCard
            label="Valeur stock"
            value={estimatedValue > 0 ? money(estimatedValue).replace(" FCFA", "") : "-"}
            sublabel="FCFA"
            icon="💰"
          />
          <KpiCard
            label="Entrées récentes"
            value={String(entryMovements.length)}
            sublabel="entrées"
            icon="↘"
          />
          <KpiCard
            label="Sorties récentes"
            value={String(exitMovements.length)}
            sublabel="sorties"
            icon="↗"
          />
          <KpiCard
            label="Commandes en cours"
            value={String(commandes.length)}
            icon="🛒"
            tone="orange"
          />
        </section>



        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <main className="space-y-6">
            <ProductOperationalSummary rootRecord={rootRecord} stocks={primaryRecords} mouvements={movements} />

            <OrderLinesDeliveryPanel items={orderLineDeliveryItems(rootRecord)} />

            <section className="grid gap-5 xl:grid-cols-2 2xl:grid-cols-4">
              <DashboardPanel
                title="Mouvements de stock"
                icon="↕"
                footerHref={withReturnTo(
                  "/mouvementsstockauto",
                  productHubReturnTo,
                  productHubReturnParams
                )}
                footerLabel="Voir tous les mouvements"
              >
                {movements.length === 0 ? (
                  <EmptyPanel icon="↕" text="Aucun mouvement lié à ce produit." />
                ) : (
                  movements.slice(0, 4).map((movement) => (
                    <MovementRow
                      key={recordId(movement)}
                      movement={movement}
                      returnTo={productHubReturnTo}
                      returnParams={productHubReturnParams}
                    />
                  ))
                )}
              </DashboardPanel>

              <DashboardPanel
                title="Commandes fournisseurs"
                icon="🧾"
                footerHref={withReturnTo(
                  "/commandesstockauto",
                  productHubReturnTo,
                  productHubReturnParams
                )}
                footerLabel="Voir toutes les commandes"
              >
                {commandes.length === 0 ? (
                  <EmptyPanel icon="🧾" text="Aucune commande fournisseur liée à ce produit." />
                ) : (
                  commandes.slice(0, 3).map((commande) => (
                    <CompactRelatedRow
                      key={recordId(commande)}
                      record={commande}
                      moduleKey="commandesstockauto"
                      title={text(commande, ["numeroCommande", "numero", "code", "displayLabel"], "Commande fournisseur")}
                      subtitle={orderSubtitle(commande)}
                      quantity={orderQuantityOrAmount(commande)}
                      status={text(commande, ["statut", "status"], "")}
                      returnTo={productHubReturnTo}
                      returnParams={productHubReturnParams}
                    />
                  ))
                )}
              </DashboardPanel>

              <DashboardPanel
                title="Réceptions stock"
                icon="📥"
                footerHref={withReturnTo(
                  "/receptionsstockauto",
                  productHubReturnTo,
                  productHubReturnParams
                )}
                footerLabel="Voir toutes les réceptions"
              >
                {receptions.length === 0 ? (
                  <EmptyPanel icon="📥" text="Aucune réception liée à ce produit." />
                ) : (
                  receptions.slice(0, 3).map((reception) => (
                    <CompactRelatedRow
                      key={recordId(reception)}
                      record={reception}
                      moduleKey="receptionsstockauto"
                      title={text(reception, ["numeroReception", "numero", "code", "displayLabel"], "Réception stock")}
                      subtitle={receptionSubtitle(reception)}
                      quantity={text(reception, ["numeroCommande", "commandeNumero", "commandeCode"], "")}
                      status={text(reception, ["statut", "status"], "")}
                      returnTo={productHubReturnTo}
                      returnParams={productHubReturnParams}
                    />
                  ))
                )}
              </DashboardPanel>

              <DashboardPanel
                title="Sorties vers interventions / ventes"
                icon="🔧"
                footerHref={withReturnTo(
                  "/lignesinterventionauto",
                  productHubReturnTo,
                  productHubReturnParams
                )}
                footerLabel="Voir toutes les sorties"
              >
                {exitMovements.length === 0 ? (
                  <EmptyPanel icon="🔧" text="Aucune sortie intervention ou vente liée à ce produit." />
                ) : (
                  exitMovements.slice(0, 3).map((movement) => (
                    <MovementRow
                      key={recordId(movement)}
                      movement={movement}
                      returnTo={productHubReturnTo}
                      returnParams={productHubReturnParams}
                    />
                  ))
                )}
              </DashboardPanel>
            </section>
          </main>

          <aside className="space-y-5">
            <section className="rounded-[1.9rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Liens rapides" />

              <div className="grid gap-3">
                {[
                  ["Mouvements de stock", String(movements.length), "/mouvementsstockauto"],
                  ["Commandes fournisseurs", String(commandes.length), "/commandesstockauto"],
                  ["Réceptions stock", String(receptions.length), "/receptionsstockauto"],
                  ["Sorties interventions / ventes", String(exitMovements.length), "/lignesinterventionauto"],
                ].map(([label, count, link]) => (
                  <Link
                    key={label}
                    href={withReturnTo(link, productHubReturnTo, productHubReturnParams)}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-700 ring-1 ring-slate-100 transition hover:bg-white hover:shadow-sm"
                  >
                    <span>{label}</span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700 ring-1 ring-emerald-100">
                      {count}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <footer className="flex items-center justify-center gap-2 pb-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200">
            A
          </span>
          AMARKHYS ERP · Gestion intelligente des opérations
        </footer>
      </div>
    </section>
  );
}