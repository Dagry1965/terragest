const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const file = "src/components/erp/context/ERPContextBanner.tsx";

backup(file, ".bak-q20f-d-polish-ui");

const content = `"use client";

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
      return "border-emerald-200/80 bg-gradient-to-br from-emerald-50 to-white text-emerald-950";
    case "vehicle":
      return "border-cyan-200/80 bg-gradient-to-br from-cyan-50 to-white text-cyan-950";
    case "product":
      return "border-amber-200/80 bg-gradient-to-br from-amber-50 to-white text-amber-950";
    case "stock":
      return "border-orange-200/80 bg-gradient-to-br from-orange-50 to-white text-orange-950";
    case "invoice":
      return "border-violet-200/80 bg-gradient-to-br from-violet-50 to-white text-violet-950";
    case "workshop":
      return "border-sky-200/80 bg-gradient-to-br from-sky-50 to-white text-sky-950";
    default:
      return "border-slate-200/80 bg-gradient-to-br from-slate-50 to-white text-slate-950";
  }
}

function getToneDot(tone: string): string {
  switch (tone) {
    case "client":
      return "bg-emerald-500";
    case "vehicle":
      return "bg-cyan-500";
    case "product":
      return "bg-amber-500";
    case "stock":
      return "bg-orange-500";
    case "invoice":
      return "bg-violet-500";
    case "workshop":
      return "bg-sky-500";
    default:
      return "bg-slate-500";
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
    <section className="relative overflow-hidden rounded-[1.35rem] border border-[var(--erp-border)] bg-gradient-to-br from-white via-white to-emerald-50/35 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.055)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-200/25 blur-2xl" />

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.45)]" />

            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
              {config.title}
            </p>

            {mode ? (
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                {mode}
              </span>
            ) : null}
          </div>

          <h2 className="mt-1 text-base font-black text-[var(--erp-text)] sm:text-lg">
            Cette fiche est liée à
          </h2>
        </div>

        <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.key}
              className={
                "relative min-w-0 overflow-hidden rounded-2xl border px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.045)] " +
                getToneClasses(item.tone)
              }
            >
              <div className="flex items-start gap-3">
                <span
                  className={
                    "mt-1 h-2.5 w-2.5 shrink-0 rounded-full " +
                    getToneDot(item.tone)
                  }
                />

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-65">
                    {item.title}
                  </p>

                  <p className="mt-1 truncate text-sm font-black leading-6">
                    {item.value}
                  </p>

                  <p className="truncate text-xs font-semibold opacity-60">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
`;

write(file, content);

console.log("");
console.log("[Q20F_D_DONE] ERPContextBanner UI polished.");
console.log("");
console.log("Next:");
console.log("  pnpm build");