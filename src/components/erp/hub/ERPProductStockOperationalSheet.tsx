"use client";

import Link from "next/link";

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

function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function money(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(value) + " FCFA";
}

function formatDate(value: string): string {
  if (!value || value === "-") return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fr-FR").format(date);
}

function href(moduleKey: string, record: ERPRecordHubRecord | null | undefined): string {
  const id = recordId(record);

  return id ? "/" + moduleKey + "/" + id : "/" + moduleKey;
}

function movementTone(record: ERPRecordHubRecord): string {
  const type = text(record, ["typeMouvement", "type", "sens"], "").toLowerCase();

  if (type.includes("entree") || type.includes("entrée")) {
    return "bg-emerald-50 text-emerald-800 ring-emerald-200";
  }

  if (type.includes("sortie")) {
    return "bg-orange-50 text-orange-800 ring-orange-200";
  }

  return "bg-slate-50 text-slate-700 ring-slate-200";
}

function movementLabel(record: ERPRecordHubRecord): string {
  const type = text(record, ["typeMouvement", "type", "sens"], "mouvement");

  if (type === "entree") return "Entrée";
  if (type === "sortie") return "Sortie";

  return type;
}

function sourceLabel(record: ERPRecordHubRecord): string {
  const sourceModule = text(record, ["sourceModule"], "");

  if (sourceModule === "lignesinterventionauto") {
    return "Sortie liée à une intervention";
  }

  if (sourceModule === "receptionsstockauto") {
    return "Entrée liée à une réception";
  }

  return text(record, ["motif", "description", "sourceModule"], "Mouvement stock");
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
  action?: React.ReactNode;
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

function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50/70 px-5 py-4 text-sm font-semibold text-slate-500">
      {children}
    </div>
  );
}

function MiniFact({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string;
  tone?: "slate" | "emerald" | "orange" | "sky";
}) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
      : tone === "orange"
        ? "bg-orange-50 text-orange-800 ring-orange-200"
        : tone === "sky"
          ? "bg-sky-50 text-sky-800 ring-sky-200"
          : "bg-slate-50 text-slate-800 ring-slate-200";

  return (
    <div className={["rounded-2xl px-4 py-3 ring-1", toneClass].join(" ")}>
      <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-lg font-black">{value}</p>
    </div>
  );
}

function MovementCard({ movement }: { movement: ERPRecordHubRecord }) {
  const quantity = numberValue(movement, ["quantite", "quantity"]);
  const before = numberValue(movement, ["quantiteAvant", "stockAvant"], Number.NaN);
  const after = numberValue(movement, ["quantiteApres", "stockApres"], Number.NaN);

  return (
    <article className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={[
              "inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ring-1",
              movementTone(movement),
            ].join(" ")}
          >
            {movementLabel(movement)}
          </span>

          <h4 className="mt-3 text-sm font-black text-slate-950">
            {sourceLabel(movement)}
          </h4>

          <p className="mt-1 text-xs font-semibold text-slate-500">
            {formatDate(text(movement, ["dateMouvement", "createdAt", "date"], "-"))}
          </p>
        </div>

        <p className="text-right text-lg font-black text-slate-950">
          {quantity > 0 ? formatNumber(quantity) : "-"}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <MiniFact
          label="Avant"
          value={Number.isFinite(before) ? formatNumber(before) : "-"}
        />
        <MiniFact
          label="Après"
          value={Number.isFinite(after) ? formatNumber(after) : "-"}
          tone="emerald"
        />
      </div>

      <Link
        href={href("mouvementsstockauto", movement)}
        className="mt-4 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-white"
      >
        Voir mouvement
      </Link>
    </article>
  );
}

function RelatedCard({
  record,
  moduleKey,
  title,
  fields,
  actionLabel,
}: {
  record: ERPRecordHubRecord;
  moduleKey: string;
  title: string;
  fields: Array<[string, string[]]>;
  actionLabel: string;
}) {
  return (
    <article className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-sm font-black text-slate-950">{title}</h4>

      <div className="mt-4 grid gap-3">
        {fields.map(([label, fieldList]) => (
          <div key={label}>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
              {label}
            </p>
            <p className="mt-1 text-sm font-bold text-slate-800">
              {text(record, fieldList)}
            </p>
          </div>
        ))}
      </div>

      <Link
        href={href(moduleKey, record)}
        className="mt-4 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700 transition hover:bg-white"
      >
        {actionLabel}
      </Link>
    </article>
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

  const productName = text(
    rootRecord,
    ["displayLabel", "nom", "designation", "libelle", "référence"],
    "Produit"
  );

  const productCode = text(rootRecord, ["reference", "code", "sku"], "-");
  const productType = text(rootRecord, ["typeArticle", "typeProduit", "categorie"], "Article");
  const productStatus = text(rootRecord, ["statut", "status"], "actif");

  const stockTotal =
    numberValue(rootRecord, ["stockTotal", "quantiteTotale", "currentStock"], Number.NaN);

  const computedStockTotal = primaryRecords.reduce((total, stock) => {
    return total + numberValue(stock, ["quantite", "quantiteDisponible", "currentStock"]);
  }, 0);

  const displayedStockTotal = Number.isFinite(stockTotal)
    ? stockTotal
    : computedStockTotal;

  const selectedQuantity = numberValue(
    selectedStock,
    ["quantite", "quantiteDisponible", "currentStock"]
  );
  const selectedThreshold = numberValue(selectedStock, ["seuilAlerte", "alertThreshold"]);
  const selectedStatus = text(selectedStock, ["statut", "status"], "disponible");
  const unitSalePrice = numberValue(rootRecord, ["prixVente", "prixVenteHT", "prixUnitaire"]);
  const estimatedValue = displayedStockTotal * unitSalePrice;

  const kpis = [
    {
      label: "Stock disponible",
      value: formatNumber(displayedStockTotal),
      alert: selectedThreshold > 0 && displayedStockTotal <= selectedThreshold,
    },
    {
      label: "Stocks / emplacements",
      value: String(primaryRecords.length),
      alert: false,
    },
    {
      label: "Commandes ouvertes",
      value: String(commandes.length),
      alert: commandes.length > 0,
    },
    {
      label: "Mouvements récents",
      value: String(movements.length),
      alert: false,
    },
  ];

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1680px] space-y-8">
        <header className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-gradient-to-br from-emerald-50 to-sky-50 text-5xl ring-1 ring-emerald-100">
                📦
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">
                  Fiche produit / stock opérationnelle
                </p>

                <h1 className="mt-2 text-3xl font-black text-slate-950">
                  {productName}
                </h1>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 ring-1 ring-slate-200">
                    Réf. {productCode}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 ring-1 ring-emerald-200">
                    {productType}
                  </span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-sky-700 ring-1 ring-sky-200">
                    {productStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={href("produitsauto", rootRecord) + "/edit"}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              >
                Ouvrir produit
              </Link>

              <Link
                href="/produitsauto"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
              >
                Liste produits
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <article
              key={item.label}
              className={[
                "min-h-[112px] rounded-[1.75rem] px-5 py-5 shadow-sm ring-1 transition",
                item.alert ? "bg-orange-50/70 ring-orange-200" : "bg-white ring-slate-200",
              ].join(" ")}
            >
              <p
                className={[
                  "text-[10px] font-black uppercase tracking-[0.14em]",
                  item.alert ? "text-orange-700" : "text-slate-500",
                ].join(" ")}
              >
                {item.label}
              </p>
              <p className="mt-4 text-2xl font-black text-slate-950">{item.value}</p>
            </article>
          ))}
        </section>

        <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <main className="space-y-8">
            <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
              <SectionTitle
                title="Stock sélectionné"
                subtitle="Lecture opérationnelle du stock principal lié au produit."
              />

              {selectedStock ? (
                <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <article className="rounded-[1.75rem] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-700">
                          Emplacement
                        </p>
                        <h3 className="mt-2 text-2xl font-black text-slate-950">
                          {text(selectedStock, ["emplacement", "nom", "displayLabel"], "Stock")}
                        </h3>
                        <p className="mt-2 text-sm font-semibold text-slate-500">
                          {text(selectedStock, ["typeStock", "type"], "Stock opérationnel")}
                        </p>
                      </div>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-black ring-1",
                          stockStatusClass(selectedStatus),
                        ].join(" ")}
                      >
                        {selectedStatus}
                      </span>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <MiniFact
                        label="Disponible"
                        value={formatNumber(selectedQuantity)}
                        tone="emerald"
                      />
                      <MiniFact
                        label="Seuil alerte"
                        value={selectedThreshold > 0 ? formatNumber(selectedThreshold) : "-"}
                        tone="orange"
                      />
                      <MiniFact
                        label="Valeur estimée"
                        value={estimatedValue > 0 ? money(estimatedValue) : "-"}
                        tone="sky"
                      />
                      <MiniFact
                        label="Produit"
                        value={productCode}
                      />
                    </div>
                  </article>

                  <article className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                    <SectionTitle
                      title="Parcours produit"
                      subtitle="Ce produit peut être consommé par une intervention puis réapprovisionné par réception."
                    />

                    <div className="grid gap-3">
                      {[
                        ["Produit", productName],
                        ["Stock", formatNumber(displayedStockTotal) + " disponible"],
                        ["Sorties", movements.filter((movement) => movementLabel(movement).toLowerCase().includes("sortie")).length + " mouvement(s)"],
                        ["Entrées", movements.filter((movement) => movementLabel(movement).toLowerCase().includes("entrée") || movementLabel(movement).toLowerCase().includes("entree")).length + " mouvement(s)"],
                        ["Réceptions", receptions.length + " réception(s)"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                            {label}
                          </p>
                          <p className="mt-1 text-sm font-black text-slate-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              ) : (
                <EmptyCard>Aucun stock lié à ce produit.</EmptyCard>
              )}
            </section>

            <section className="rounded-[2.25rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:p-8">
              <SectionTitle
                title="Parcours opérationnel produit — stock — mouvements — achats"
                subtitle="Lecture des entrées, sorties, commandes et réceptions associées au produit."
              />

              <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)]">
                <div>
                  <SectionTitle
                    title="Mouvements du stock"
                    subtitle="Sorties intervention, entrées réception et réintégrations."
                  />

                  {movements.length === 0 ? (
                    <EmptyCard>Aucun mouvement stock lié à ce produit.</EmptyCard>
                  ) : (
                    <div className="grid gap-4">
                      {movements.slice(0, 8).map((movement) => (
                        <MovementCard key={recordId(movement)} movement={movement} />
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <SectionTitle
                      title="Commandes fournisseur"
                      subtitle="Une commande est une intention d’achat : elle ne modifie pas le stock."
                    />

                    {commandes.length === 0 ? (
                      <EmptyCard>Aucune commande ouverte pour ce produit.</EmptyCard>
                    ) : (
                      <div className="grid gap-4">
                        {commandes.slice(0, 4).map((commande) => (
                          <RelatedCard
                            key={recordId(commande)}
                            record={commande}
                            moduleKey="commandesstockauto"
                            title={text(commande, ["numeroCommande", "code", "displayLabel"], "Commande fournisseur")}
                            fields={[
                              ["Statut", ["statut", "status"]],
                              ["Fournisseur", ["fournisseurLabel", "fournisseurId"]],
                              ["Montant", ["montantTTC", "montantHT", "total"]],
                            ]}
                            actionLabel="Ouvrir commande"
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <SectionTitle
                      title="Réceptions stock"
                      subtitle="Une réception validée crée une entrée stock et met à jour le stock."
                    />

                    {receptions.length === 0 ? (
                      <EmptyCard>Aucune réception liée à ce produit.</EmptyCard>
                    ) : (
                      <div className="grid gap-4">
                        {receptions.slice(0, 4).map((reception) => (
                          <RelatedCard
                            key={recordId(reception)}
                            record={reception}
                            moduleKey="receptionsstockauto"
                            title={text(reception, ["numeroReception", "code", "displayLabel"], "Réception stock")}
                            fields={[
                              ["Statut", ["statut", "status"]],
                              ["Quantité reçue", ["quantiteRecue", "quantite", "quantity"]],
                              ["Date réception", ["dateReception", "createdAt"]],
                              ["Mouvement", ["mouvementStockId", "stockMovementId"]],
                            ]}
                            actionLabel="Ouvrir réception"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </main>

          <aside className="space-y-6">
            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Navigation rapide" />

              <div className="grid gap-3">
                {[
                  ["📦 Fiche produit complète", href("produitsauto", rootRecord) + "/edit"],
                  ["🏬 Stock sélectionné", href("stocksauto", selectedStock)],
                  ["↕️ Mouvements stock", "/mouvementsstockauto"],
                  ["🧾 Commandes fournisseur", "/commandesstockauto"],
                  ["✅ Réceptions stock", "/receptionsstockauto"],
                ].map(([label, link], index) => (
                  <Link
                    key={label}
                    href={link}
                    className={[
                      "rounded-2xl px-4 py-3 text-sm font-black transition",
                      index === 0
                        ? "bg-slate-950 text-white hover:bg-slate-800"
                        : "bg-slate-100 text-slate-700 hover:bg-white hover:ring-1 hover:ring-slate-200",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Dossier stock sélectionné" />

              {selectedStock ? (
                <div className="grid gap-3">
                  <MiniFact
                    label="Emplacement"
                    value={text(selectedStock, ["emplacement", "nom"], "Stock")}
                  />
                  <MiniFact
                    label="Disponible"
                    value={formatNumber(selectedQuantity)}
                    tone="emerald"
                  />
                  <MiniFact
                    label="Seuil"
                    value={selectedThreshold > 0 ? formatNumber(selectedThreshold) : "-"}
                    tone="orange"
                  />
                  <MiniFact
                    label="Mouvements"
                    value={String(movements.length)}
                    tone="sky"
                  />
                </div>
              ) : (
                <EmptyCard>Aucun stock sélectionné.</EmptyCard>
              )}
            </section>

            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <SectionTitle title="Bénéfices métier" />

              <div className="grid gap-3">
                {[
                  "Stock produit lisible en un coup d’œil",
                  "Sorties intervention et entrées réception traçables",
                  "Mouvements stock comme preuve d’audit",
                  "Commandes sans impact stock avant réception",
                  "Vision produit exploitable en démonstration",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-400">
                Runtime
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Les données proviennent du loader produit/stock existant. Les moteurs stock ne sont pas modifiés.
              </p>
              <p className="mt-3 text-xs font-bold text-slate-400">
                Config : {String(config?.key ?? "product-stock-hub")}
              </p>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}