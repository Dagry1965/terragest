"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

type ERPProductStockOperationalSheetProps = {
  config: ERPRecordHubConfig;
  rootRecord: ERPRecordHubRecord | null;
  primaryRecords: ERPRecordHubRecord[];
  relatedRecordsBySection: Record<string, ERPRecordHubRecord[]>;
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

  if (sourceModule === "lignesinterventionauto") {
    return "Sortie intervention";
  }

  if (sourceModule === "receptionsstockauto") {
    return "Réception fournisseur";
  }

  return text(record, ["motif", "description", "sourceModule"], "Mouvement stock");
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
            {text(movement, ["numero", "code", "sourceId"], "Mouvement")} ·{" "}
            {formatDate(text(movement, ["dateMouvement", "createdAt", "date"], "-"))}
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
            <ProductFlowDiagram />

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
                      subtitle={text(commande, ["fournisseurLabel", "fournisseurId"], "Fournisseur")}
                      quantity={text(commande, ["montantTTC", "montantHT", "total"], "")}
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
                      subtitle={formatDate(text(reception, ["dateReception", "createdAt"], "-"))}
                      quantity={text(reception, ["quantiteRecue", "quantite", "quantity"], "") + " unités"}
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
              <SectionTitle title="Dossier sélectionné" />

              {selectedStock ? (
                <div>
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">
                        Stock
                      </p>
                      <h3 className="mt-2 text-lg font-black text-slate-950">
                        {text(selectedStock, ["emplacement", "nom", "displayLabel"], "Stock")}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {text(selectedStock, ["typeStock", "type"], "Stock opérationnel")}
                      </p>
                    </div>

                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-black ring-1",
                        stockStatusClass(selectedStatus),
                      ].join(" ")}
                    >
                      {humanStatusLabel(selectedStatus)}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    {[
                      ["Emplacement", text(selectedStock, ["emplacement", "nom"], "-")],
                      ["Stock disponible", formatNumber(selectedQuantity) + " unités"],
                      ["Stock réservé", text(selectedStock, ["stockReserve", "reservedStock"], "0 unité")],
                      ["Stock en transit", text(selectedStock, ["stockTransit", "transitStock"], "0 unité")],
                      ["Stock minimum", selectedThreshold > 0 ? formatNumber(selectedThreshold) + " unités" : "-"],
                      ["Dernière MAJ", formatDate(text(selectedStock, ["updatedAt", "updated_at", "modifiedAt", "lastUpdate", "dateMiseAJour", "createdAt"], "-"))],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100"
                      >
                        <p className="text-xs font-black text-slate-500">{label}</p>
                        <p className="text-right text-xs font-black text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyPanel icon="📦" text="Aucun stock sélectionné." />
              )}
            </section>

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