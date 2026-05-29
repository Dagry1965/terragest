const fs = require("fs");
const path = require("path");

const root = process.cwd();

function write(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });

  if (fs.existsSync(fullPath)) {
    const backup = fullPath + ".bak-q2ob-safe";
    if (!fs.existsSync(backup)) {
      fs.writeFileSync(backup, fs.readFileSync(fullPath, "utf8"), "utf8");
      console.log("[BACKUP] " + path.relative(root, backup));
    }
  }

  fs.writeFileSync(fullPath, content.trimStart(), "utf8");
  console.log("[WRITTEN] " + relativePath);
}

console.log("[Q2-OB] Installing safe Record Hub foundation");
console.log("[ROOT] " + root);

write("src/runtime/hub/RuntimeHubTypes.ts", `
export type ERPRecordHubDisplayMode =
  | "cards"
  | "table"
  | "timeline"
  | "compact-list";

export type ERPRecordHubLayoutMode =
  | "wide"
  | "split"
  | "stacked";

export type ERPRecordHubSectionLayout =
  | "collapsible-list"
  | "cards"
  | "table"
  | "timeline";

export type ERPRecordHubRecord = Record<string, unknown> & {
  id?: string;
};

export type ERPRecordHubActionKind =
  | "open-record"
  | "create-record"
  | "open-document"
  | "custom";

export type ERPRecordHubActionConfig = {
  key: string;
  label: string;
  kind: ERPRecordHubActionKind;
  moduleKey?: string;
  hrefTemplate?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
};

export type ERPRecordHubSearchConfig = {
  placeholder?: string;
  filterFields?: string[];
  searchFields?: string[];
};

export type ERPRecordHubHeaderConfig = {
  titleFields: string[];
  subtitleFields?: string[];
  badgeFields?: string[];
  avatarField?: string;
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubKpiConfig = {
  key: string;
  label: string;
  source?: "count" | "sum" | "computed" | "static";
  moduleKey?: string;
  foreignKey?: string;
  field?: string;
  format?: "number" | "currency" | "date" | "text";
};

export type ERPRecordHubPrimaryCollectionConfig = {
  moduleKey: string;
  foreignKey: string;
  label?: string;
  defaultDisplayMode?: ERPRecordHubDisplayMode;
  displayModes?: Record<string, ERPRecordHubDisplayMode>;
  displayModeSourceField?: string;
  cardFields?: string[];
  tableFields?: string[];
  labelFields?: string[];
  subtitleFields?: string[];
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubRelatedSectionConfig = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout?: ERPRecordHubSectionLayout;
  fields?: string[];
  labelFields?: string[];
  subtitleFields?: string[];
  actions?: ERPRecordHubActionConfig[];
};

export type ERPRecordHubConfig = {
  enabled: boolean;
  key: string;
  label: string;
  rootModule: string;
  layout?: ERPRecordHubLayoutMode;
  search?: ERPRecordHubSearchConfig;
  header: ERPRecordHubHeaderConfig;
  kpis?: ERPRecordHubKpiConfig[];
  primaryCollection: ERPRecordHubPrimaryCollectionConfig;
  selectedRecordDetails?: ERPRecordHubRelatedSectionConfig[];
};

export type ERPRecordHubRuntimeContext = {
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  moduleKey?: string;
  recordId?: string;
};

export type ERPRecordHubResolvedLayout = {
  layout: ERPRecordHubLayoutMode;
  primaryDisplayMode: ERPRecordHubDisplayMode;
  selectedDetailsLayout: "side-panel" | "bottom-sections";
};

export type ERPRecordHubResolvedKpi = {
  key: string;
  label: string;
  value: string | number;
  format?: ERPRecordHubKpiConfig["format"];
};

export type ERPRecordHubRelationDescriptor = {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  layout: ERPRecordHubSectionLayout;
};

export type ERPRecordHubResolveInput = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
  selectedPrimaryRecord?: ERPRecordHubRecord | null;
  context?: ERPRecordHubRuntimeContext;
};

export type ERPRecordHubResolveResult = {
  config: ERPRecordHubConfig;
  layout: ERPRecordHubResolvedLayout;
  kpis: ERPRecordHubResolvedKpi[];
  relations: ERPRecordHubRelationDescriptor[];
};
`);

write("src/runtime/hub/RuntimeHubConfigResolver.ts", `
import type { ERPRecordHubConfig } from "./RuntimeHubTypes";

export type RuntimeHubConfigSource = {
  key?: string;
  label?: string;
  metadata?: {
    operationalHub?: ERPRecordHubConfig;
  };
  operationalHub?: ERPRecordHubConfig;
};

export class RuntimeHubConfigResolver {
  static resolve(source: RuntimeHubConfigSource | null | undefined): ERPRecordHubConfig | null {
    if (!source) {
      return null;
    }

    const config = source.operationalHub ?? source.metadata?.operationalHub ?? null;

    if (!config || config.enabled !== true) {
      return null;
    }

    return config;
  }

  static assertValid(config: ERPRecordHubConfig): void {
    if (!config.key) {
      throw new Error("RuntimeHubConfigResolver: hub config key is required.");
    }

    if (!config.rootModule) {
      throw new Error("RuntimeHubConfigResolver: rootModule is required.");
    }

    if (!config.header?.titleFields?.length) {
      throw new Error("RuntimeHubConfigResolver: header.titleFields is required.");
    }

    if (!config.primaryCollection?.moduleKey || !config.primaryCollection?.foreignKey) {
      throw new Error("RuntimeHubConfigResolver: primaryCollection.moduleKey and foreignKey are required.");
    }
  }
}
`);

write("src/runtime/hub/RuntimeHubLayoutResolver.ts", `
import type {
  ERPRecordHubConfig,
  ERPRecordHubDisplayMode,
  ERPRecordHubRecord,
  ERPRecordHubResolvedLayout,
} from "./RuntimeHubTypes";

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export class RuntimeHubLayoutResolver {
  static resolvePrimaryDisplayMode(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubDisplayMode {
    const primary = config.primaryCollection;
    const fallback: ERPRecordHubDisplayMode = primary.defaultDisplayMode ?? "table";

    if (!primary.displayModes || !primary.displayModeSourceField || !rootRecord) {
      return fallback;
    }

    const sourceValue = asString(rootRecord[primary.displayModeSourceField]);

    if (!sourceValue) {
      return fallback;
    }

    return primary.displayModes[sourceValue] ?? fallback;
  }

  static resolve(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedLayout {
    const layout = config.layout ?? "wide";
    const primaryDisplayMode = this.resolvePrimaryDisplayMode(config, rootRecord);

    return {
      layout,
      primaryDisplayMode,
      selectedDetailsLayout: layout === "split" ? "side-panel" : "bottom-sections",
    };
  }
}
`);

write("src/runtime/hub/RuntimeHubKpiResolver.ts", `
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
  ERPRecordHubResolvedKpi,
} from "./RuntimeHubTypes";

export class RuntimeHubKpiResolver {
  static resolveStatic(
    config: ERPRecordHubConfig,
    rootRecord?: ERPRecordHubRecord | null
  ): ERPRecordHubResolvedKpi[] {
    const kpis = config.kpis ?? [];

    return kpis.map((kpi) => {
      if (kpi.source === "static" && kpi.field && rootRecord) {
        const value = rootRecord[kpi.field];

        return {
          key: kpi.key,
          label: kpi.label,
          value: typeof value === "string" || typeof value === "number" ? value : "—",
          format: kpi.format,
        };
      }

      return {
        key: kpi.key,
        label: kpi.label,
        value: "—",
        format: kpi.format,
      };
    });
  }
}
`);

write("src/runtime/hub/RuntimeHubRelationResolver.ts", `
import type {
  ERPRecordHubConfig,
  ERPRecordHubRelationDescriptor,
} from "./RuntimeHubTypes";

export class RuntimeHubRelationResolver {
  static resolve(config: ERPRecordHubConfig): ERPRecordHubRelationDescriptor[] {
    return (config.selectedRecordDetails ?? []).map((section) => ({
      key: section.key,
      label: section.label,
      moduleKey: section.moduleKey,
      foreignKey: section.foreignKey,
      layout: section.layout ?? "collapsible-list",
    }));
  }
}
`);

write("src/runtime/hub/RuntimeHubEngine.ts", `
import type {
  ERPRecordHubResolveInput,
  ERPRecordHubResolveResult,
} from "./RuntimeHubTypes";
import { RuntimeHubConfigResolver } from "./RuntimeHubConfigResolver";
import { RuntimeHubLayoutResolver } from "./RuntimeHubLayoutResolver";
import { RuntimeHubKpiResolver } from "./RuntimeHubKpiResolver";
import { RuntimeHubRelationResolver } from "./RuntimeHubRelationResolver";

export class RuntimeHubEngine {
  static resolve(input: ERPRecordHubResolveInput): ERPRecordHubResolveResult {
    RuntimeHubConfigResolver.assertValid(input.config);

    const layout = RuntimeHubLayoutResolver.resolve(input.config, input.rootRecord);
    const kpis = RuntimeHubKpiResolver.resolveStatic(input.config, input.rootRecord);
    const relations = RuntimeHubRelationResolver.resolve(input.config);

    return {
      config: input.config,
      layout,
      kpis,
      relations,
    };
  }
}
`);

write("src/runtime/hub/index.ts", `
export * from "./RuntimeHubTypes";
export * from "./RuntimeHubConfigResolver";
export * from "./RuntimeHubLayoutResolver";
export * from "./RuntimeHubKpiResolver";
export * from "./RuntimeHubRelationResolver";
export * from "./RuntimeHubEngine";
`);

write("src/components/erp/hub/ERPRecordHubPage.tsx", `
"use client";

import { useMemo, useState } from "react";
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";
import { RuntimeHubEngine } from "@/runtime/hub";
import { ERPRecordHubHeader } from "./ERPRecordHubHeader";
import { ERPRecordHubKpiStrip } from "./ERPRecordHubKpiStrip";
import { ERPRecordHubPrimaryCollection } from "./ERPRecordHubPrimaryCollection";
import { ERPRecordHubSelectedDetails } from "./ERPRecordHubSelectedDetails";

export type ERPRecordHubPageProps = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
  primaryRecords?: ERPRecordHubRecord[];
  relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
};

export function ERPRecordHubPage({
  config,
  rootRecord = null,
  primaryRecords = [],
  relatedRecordsBySection = {},
}: ERPRecordHubPageProps) {
  const [selectedPrimaryRecordId, setSelectedPrimaryRecordId] = useState<string | null>(
    primaryRecords[0]?.id ?? null
  );

  const selectedPrimaryRecord = useMemo(() => {
    return primaryRecords.find((record) => record.id === selectedPrimaryRecordId) ?? null;
  }, [primaryRecords, selectedPrimaryRecordId]);

  const resolved = useMemo(() => {
    return RuntimeHubEngine.resolve({
      config,
      rootRecord,
      selectedPrimaryRecord,
    });
  }, [config, rootRecord, selectedPrimaryRecord]);

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <ERPRecordHubHeader config={config} rootRecord={rootRecord} />
        <ERPRecordHubKpiStrip kpis={resolved.kpis} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <ERPRecordHubPrimaryCollection
            config={config.primaryCollection}
            displayMode={resolved.layout.primaryDisplayMode}
            records={primaryRecords}
            selectedRecordId={selectedPrimaryRecordId}
            onSelectRecord={setSelectedPrimaryRecordId}
          />

          <ERPRecordHubSelectedDetails
            sections={resolved.relations}
            selectedRecord={selectedPrimaryRecord}
            relatedRecordsBySection={relatedRecordsBySection}
          />
        </div>
      </div>
    </section>
  );
}
`);

write("src/components/erp/hub/ERPRecordHubHeader.tsx", `
import type {
  ERPRecordHubConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

function readFields(record: ERPRecordHubRecord | null | undefined, fields: string[] = []): string {
  if (!record) return "—";

  const values = fields
    .map((field) => record[field])
    .filter((value): value is string | number => typeof value === "string" || typeof value === "number");

  return values.length > 0 ? values.join(" · ") : "—";
}

export type ERPRecordHubHeaderProps = {
  config: ERPRecordHubConfig;
  rootRecord?: ERPRecordHubRecord | null;
};

export function ERPRecordHubHeader({ config, rootRecord = null }: ERPRecordHubHeaderProps) {
  const title = readFields(rootRecord, config.header.titleFields);
  const subtitle = readFields(rootRecord, config.header.subtitleFields);
  const badges = config.header.badgeFields ?? [];

  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
            {config.label}
          </p>
          <h1 className="mt-2 truncate text-2xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {badges.map((field) => (
            <span
              key={field}
              className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {String(rootRecord?.[field] ?? field)}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
`);

write("src/components/erp/hub/ERPRecordHubKpiStrip.tsx", `
import type { ERPRecordHubResolvedKpi } from "@/runtime/hub";

export type ERPRecordHubKpiStripProps = {
  kpis: ERPRecordHubResolvedKpi[];
};

export function ERPRecordHubKpiStrip({ kpis }: ERPRecordHubKpiStripProps) {
  if (kpis.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <article key={kpi.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{kpi.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{String(kpi.value)}</p>
        </article>
      ))}
    </div>
  );
}
`);

write("src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx", `
import type {
  ERPRecordHubDisplayMode,
  ERPRecordHubPrimaryCollectionConfig,
  ERPRecordHubRecord,
} from "@/runtime/hub";

function readRecordLabel(record: ERPRecordHubRecord, fields: string[] = []): string {
  const values = fields
    .map((field) => record[field])
    .filter((value): value is string | number => typeof value === "string" || typeof value === "number");

  if (values.length > 0) return values.join(" · ");

  return String(record.id ?? "Élément");
}

export type ERPRecordHubPrimaryCollectionProps = {
  config: ERPRecordHubPrimaryCollectionConfig;
  displayMode: ERPRecordHubDisplayMode;
  records: ERPRecordHubRecord[];
  selectedRecordId?: string | null;
  onSelectRecord?: (recordId: string | null) => void;
};

export function ERPRecordHubPrimaryCollection({
  config,
  displayMode,
  records,
  selectedRecordId = null,
  onSelectRecord,
}: ERPRecordHubPrimaryCollectionProps) {
  const title = config.label ?? "Relation principale";

  if (records.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
        Aucun élément lié à afficher pour {title}.
      </section>
    );
  }

  if (displayMode === "cards") {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
          <span className="text-xs text-slate-500">{records.length} élément(s)</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {records.map((record) => {
            const isSelected = record.id === selectedRecordId;

            return (
              <button
                key={record.id ?? readRecordLabel(record, config.labelFields)}
                type="button"
                onClick={() => onSelectRecord?.(record.id ?? null)}
                className={[
                  "rounded-2xl border p-4 text-left shadow-sm transition",
                  isSelected
                    ? "border-emerald-300 bg-emerald-50"
                    : "border-slate-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40",
                ].join(" ")}
              >
                <p className="text-sm font-semibold text-slate-950">
                  {readRecordLabel(record, config.labelFields ?? config.cardFields)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {readRecordLabel(record, config.subtitleFields)}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
        <span className="text-xs text-slate-500">{records.length} élément(s)</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <tbody className="divide-y divide-slate-100 bg-white">
            {records.map((record) => {
              const isSelected = record.id === selectedRecordId;

              return (
                <tr
                  key={record.id ?? readRecordLabel(record, config.labelFields)}
                  className={isSelected ? "bg-emerald-50" : "hover:bg-slate-50"}
                >
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => onSelectRecord?.(record.id ?? null)}
                      className="text-left font-medium text-slate-950 hover:text-emerald-700"
                    >
                      {readRecordLabel(record, config.labelFields ?? config.tableFields)}
                    </button>
                    <p className="mt-1 text-xs text-slate-500">
                      {readRecordLabel(record, config.subtitleFields)}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
`);

write("src/components/erp/hub/ERPRecordHubSelectedDetails.tsx", `
import type {
  ERPRecordHubRecord,
  ERPRecordHubRelationDescriptor,
} from "@/runtime/hub";

function readFallbackLabel(record: ERPRecordHubRecord): string {
  const preferredFields = ["nom", "name", "label", "code", "immatriculation", "numero", "titre"];

  for (const field of preferredFields) {
    const value = record[field];

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }

  return String(record.id ?? "Élément lié");
}

export type ERPRecordHubSelectedDetailsProps = {
  sections: ERPRecordHubRelationDescriptor[];
  selectedRecord?: ERPRecordHubRecord | null;
  relatedRecordsBySection?: Record<string, ERPRecordHubRecord[]>;
};

export function ERPRecordHubSelectedDetails({
  sections,
  selectedRecord = null,
  relatedRecordsBySection = {},
}: ERPRecordHubSelectedDetailsProps) {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Détails contextuels
        </p>
        <h2 className="mt-2 text-lg font-semibold text-slate-950">
          {selectedRecord ? readFallbackLabel(selectedRecord) : "Aucune sélection"}
        </h2>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const records = relatedRecordsBySection[section.key] ?? [];

          return (
            <section key={section.key} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-950">{section.label}</h3>
                <span className="text-xs text-slate-500">{records.length}</span>
              </div>

              {records.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">Aucun élément lié à afficher.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {records.map((record) => (
                    <article key={record.id ?? readFallbackLabel(record)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                      <p className="font-medium text-slate-900">{readFallbackLabel(record)}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
`);

write("src/components/erp/hub/index.ts", `
export * from "./ERPRecordHubPage";
export * from "./ERPRecordHubHeader";
export * from "./ERPRecordHubKpiStrip";
export * from "./ERPRecordHubPrimaryCollection";
export * from "./ERPRecordHubSelectedDetails";
`);

console.log("[Q2-OB] Safe foundation install completed");