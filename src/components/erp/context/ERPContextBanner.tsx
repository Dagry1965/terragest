"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ERPModule,
} from "@/runtime/modules/ERPModule";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding/RuntimeDataBinding";

import {
  allERPModules,
} from "@/runtime/modules/definitions/coreModules";

type RuntimeRecord = Record<string, unknown>;

interface RuntimeContextBannerItemConfig {
  relationField?: string;
  field?: string;
  moduleKey?: string;
  labelFields?: string[];
  title?: string;
  icon?: string;
  tone?: string;
}

interface RuntimeContextBannerConfig {
  title?: string;
  items?: RuntimeContextBannerItemConfig[];
}

interface RuntimeCompositionWithContext {
  contextBanner?: RuntimeContextBannerConfig;
  relations?: RuntimeContextBannerItemConfig[];
  breadcrumbs?: RuntimeContextBannerItemConfig[];
}

interface ERPContextBannerProps {
  module: ERPModule;
  record?: RuntimeRecord;
  mode?: string;
}

interface ResolvedContextItem {
  key: string;
  title: string;
  value: string;
  subtitle: string;
  tone: string;
}

function asText(value: unknown): string {
  return String(value ?? "").trim();
}

function getRecordId(record: RuntimeRecord): string {
  return asText(record.id ?? record._id);
}

function getModule(moduleKey?: string): ERPModule | undefined {
  if (!moduleKey) {
    return undefined;
  }

  return allERPModules.find(
    (candidate) => candidate.metadata.key === moduleKey
  );
}

function formatFieldLabel(field: string): string {
  const labels: Record<string, string> = {
    clientId: "Client",
    vehiculeId: "Véhicule",
    rendezVousId: "Rendez-vous",
    interventionId: "Intervention",
    factureId: "Facture",
    produitId: "Produit",
    stockId: "Stock",
    fournisseurId: "Fournisseur",
    commandeId: "Commande",
    receptionId: "Réception",
  };

  return labels[field] ?? field;
}

function guessTone(field: string, moduleKey?: string): string {
  const source =
    field + " " + (moduleKey ?? "");

  if (source.includes("client")) {
    return "client";
  }

  if (source.includes("vehicule")) {
    return "vehicle";
  }

  if (source.includes("produit")) {
    return "product";
  }

  if (source.includes("stock")) {
    return "stock";
  }

  if (source.includes("facture")) {
    return "invoice";
  }

  if (source.includes("intervention")) {
    return "workshop";
  }

  return "default";
}

function getToneClasses(tone: string): string {
  switch (tone) {
    case "client":
      return "border-emerald-200 bg-emerald-50 text-emerald-950";
    case "vehicle":
      return "border-cyan-200 bg-cyan-50 text-cyan-950";
    case "product":
      return "border-amber-200 bg-amber-50 text-amber-950";
    case "stock":
      return "border-orange-200 bg-orange-50 text-orange-950";
    case "invoice":
      return "border-violet-200 bg-violet-50 text-violet-950";
    case "workshop":
      return "border-sky-200 bg-sky-50 text-sky-950";
    default:
      return "border-slate-200 bg-slate-50 text-slate-950";
  }
}

function pickLabelFields(
  config: RuntimeContextBannerItemConfig,
  targetModule?: ERPModule
): string[] {
  if (config.labelFields?.length) {
    return config.labelFields;
  }

  const composition =
    targetModule?.composition as
      | { labelFields?: string[] }
      | undefined;

  if (composition?.labelFields?.length) {
    return composition.labelFields;
  }

  return [
    "nom",
    "prenom",
    "reference",
    "code",
    "codeClient",
    "immatriculation",
    "marque",
    "modele",
    "numeroFacture",
    "typeIntervention",
    "dateIntervention",
    "statut",
  ];
}

function buildLabel(
  record: RuntimeRecord,
  fields: string[]
): string {
  const values =
    fields
      .map((field) => asText(record[field]))
      .filter(Boolean);

  return values.join(" • ");
}

function uniqueItems(
  items: RuntimeContextBannerItemConfig[]
): RuntimeContextBannerItemConfig[] {
  const seen =
    new Set<string>();

  return items.filter((item) => {
    const field =
      item.relationField ?? item.field ?? "";

    const key =
      field + "::" + (item.moduleKey ?? "");

    if (!field || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function getContextConfig(module: ERPModule): {
  title: string;
  items: RuntimeContextBannerItemConfig[];
} {
  const composition =
    module.composition as RuntimeCompositionWithContext | undefined;

  const explicit =
    composition?.contextBanner;

  if (explicit?.items?.length) {
    return {
      title: explicit.title ?? "Contexte métier",
      items: explicit.items,
    };
  }

  const relations =
    composition?.relations ?? [];

  const breadcrumbs =
    composition?.breadcrumbs ?? [];

  return {
    title: "Contexte métier",
    items: uniqueItems([
      ...breadcrumbs,
      ...relations,
    ]),
  };
}

export function ERPContextBanner({
  module,
  record,
  mode,
}: ERPContextBannerProps) {
  const [
    items,
    setItems,
  ] = useState<ResolvedContextItem[]>([]);

  const config =
    useMemo(
      () => getContextConfig(module),
      [module]
    );

  useEffect(() => {
    let mounted = true;

    async function resolve() {
      if (!record || !config.items.length) {
        setItems([]);
        return;
      }

      const nextItems: ResolvedContextItem[] =
        [];

      for (const item of config.items) {
        const relationField =
          item.relationField ?? item.field ?? "";

        const relationId =
          asText(record[relationField]);

        if (!relationField || !relationId) {
          continue;
        }

        const targetModule =
          getModule(item.moduleKey);

        if (!targetModule) {
          continue;
        }

        try {
          const relatedRecord =
            await RuntimeDataBinding.detail(
              targetModule,
              relationId
            );

          if (!relatedRecord) {
            continue;
          }

          const labelFields =
            pickLabelFields(
              item,
              targetModule
            );

          const value =
            buildLabel(
              relatedRecord,
              labelFields
            ) ||
            getRecordId(relatedRecord) ||
            relationId;

          const subtitle =
            targetModule.metadata.label ??
            item.moduleKey ??
            formatFieldLabel(relationField);

          nextItems.push({
            key: relationField + "::" + relationId,
            title:
              item.title ??
              formatFieldLabel(relationField),
            value,
            subtitle,
            tone:
              item.tone ??
              guessTone(
                relationField,
                item.moduleKey
              ),
          });
        } catch (error) {
          console.warn(
            "[ERP_CONTEXT_BANNER_RELATION_ERROR]",
            relationField,
            error
          );
        }
      }

      if (mounted) {
        setItems(nextItems);
      }
    }

    resolve();

    return () => {
      mounted = false;
    };
  }, [
    config,
    record,
  ]);

  if (!record || items.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[var(--erp-border)] bg-white p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--erp-text-muted)]">
            {config.title}
          </p>

          <h2 className="mt-1 text-lg font-black text-[var(--erp-text)]">
            De qui / de quoi parle cette fiche ?
          </h2>
        </div>

        {mode ? (
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-emerald-700">
            {mode}
          </span>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.key}
            className={
              "rounded-2xl border p-4 " +
              getToneClasses(item.tone)
            }
          >
            <p className="text-[11px] font-black uppercase tracking-[0.16em] opacity-70">
              {item.title}
            </p>

            <p className="mt-2 text-sm font-black leading-6">
              {item.value}
            </p>

            <p className="mt-1 text-xs font-semibold opacity-65">
              {item.subtitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
