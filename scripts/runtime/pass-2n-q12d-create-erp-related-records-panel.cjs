const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

fs.mkdirSync(path.dirname(file), { recursive: true });

const content = `"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type {
  ERPCompositionChild,
  ERPCompositionRelation,
  ERPModule,
} from "@/runtime/modules/ERPModule";

import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";

interface ERPRelatedRecordsPanelProps {
  parentModule: ERPModule;
  parentRecord: Record<string, unknown>;
  child: ERPCompositionChild;
  mode: "detail" | "edit";
}

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? "");
}

function formatMoney(value: unknown): string {
  const amount = Number(value ?? 0);

  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(amount) + " FCFA"
  );
}

function getAmount(record: Record<string, unknown>, field?: string): number {
  if (!field) return 0;

  const value = Number(record[field] ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function getLabelFromFields(
  record: Record<string, unknown>,
  fields: string[]
): string {
  const values = fields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null && String(value).trim() !== "")
    .map((value) => String(value).trim());

  return values.join(" - ");
}

function getFallbackRecordLabel(record: Record<string, unknown>): string {
  return String(
    record.designation ??
      record.nom ??
      record.label ??
      record.reference ??
      record.code ??
      record.id ??
      record._id ??
      "Enregistrement"
  );
}

function getChildRecordLabel(
  record: Record<string, unknown>,
  childModule?: ERPModule
): string {
  const visibleFields =
    childModule?.schema?.fields
      ?.filter((field) => field.list?.order !== undefined)
      ?.sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      ?.map((field) => field.key) ?? [];

  const label = getLabelFromFields(record, visibleFields.slice(0, 3));

  return label || getFallbackRecordLabel(record);
}

function buildCreateHref(
  child: ERPCompositionChild,
  parentRecordId: string,
  parentModuleKey: string,
  mode: "detail" | "edit"
): string {
  const params = new URLSearchParams();

  params.set(child.foreignKey, parentRecordId);
  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" + parentRecordId + (mode === "edit" ? "/edit" : "")
  );
  params.set("lockFields", child.foreignKey);

  return "/" + child.moduleKey + "/nouveau?" + params.toString();
}

function buildChildEditHref(
  child: ERPCompositionChild,
  record: Record<string, unknown>
): string {
  const id = getRecordId(record);

  if (!id) return "#";

  return "/" + child.moduleKey + "/" + id + "/edit";
}

async function resolveRelationLabels(
  records: Record<string, unknown>[],
  relations: ERPCompositionRelation[] = []
): Promise<Record<string, Record<string, string>>> {
  const resolved: Record<string, Record<string, string>> = {};

  await Promise.all(
    relations.map(async (relation) => {
      const module = allERPModules.find(
        (item) => item.metadata.key === relation.moduleKey
      );

      if (!module) return;

      const ids = Array.from(
        new Set(
          records
            .map((record) => String(record[relation.field] ?? ""))
            .filter(Boolean)
        )
      );

      if (ids.length === 0) return;

      const relatedRecords = await RuntimeDataBinding.list(module);

      const labelsById: Record<string, string> = {};

      relatedRecords.forEach((record) => {
        const id = getRecordId(record);

        if (!ids.includes(id)) return;

        labelsById[id] =
          getLabelFromFields(record, relation.labelFields) ||
          getFallbackRecordLabel(record);
      });

      resolved[relation.field] = labelsById;
    })
  );

  return resolved;
}

export function ERPRelatedRecordsPanel({
  parentModule,
  parentRecord,
  child,
  mode,
}: ERPRelatedRecordsPanelProps) {
  const parentRecordId = getRecordId(parentRecord);
  const parentModuleKey = parentModule.metadata.key;

  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [relationLabels, setRelationLabels] = useState<
    Record<string, Record<string, string>>
  >({});
  const [loading, setLoading] = useState(true);

  const childModule = useMemo(
    () =>
      allERPModules.find(
        (module) => module.metadata.key === child.moduleKey
      ),
    [child.moduleKey]
  );

  const createHref = useMemo(
    () =>
      buildCreateHref(
        child,
        parentRecordId,
        parentModuleKey,
        mode
      ),
    [child, parentRecordId, parentModuleKey, mode]
  );

  useEffect(() => {
    if (!parentRecordId || !childModule) {
      setRecords([]);
      setRelationLabels({});
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadRecords() {
      setLoading(true);

      try {
        const data = await RuntimeDataBinding.list(childModule);

        const related = data.filter(
          (record) =>
            String(record[child.foreignKey] ?? "") === parentRecordId &&
            String(record.statut ?? "") !== "annulee"
        );

        const labels = await resolveRelationLabels(
          related,
          child.relations ?? []
        );

        if (mounted) {
          setRecords(related);
          setRelationLabels(labels);
          setLoading(false);
        }
      } catch (error) {
        console.error("[ERP_RELATED_RECORDS_PANEL_ERROR]", error);

        if (mounted) {
          setRecords([]);
          setRelationLabels({});
          setLoading(false);
        }
      }
    }

    loadRecords();

    return () => {
      mounted = false;
    };
  }, [parentRecordId, childModule, child]);

  const total = records.reduce(
    (sum, record) => sum + getAmount(record, child.totalField),
    0
  );

  if (!parentRecordId || !childModule) {
    return null;
  }

  return (
    <section
      data-erp-related-records-panel={child.key}
      className="rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-bg)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-black text-[var(--erp-text)]">
            {child.title}
          </h2>

          <p className="mt-1 text-sm text-[var(--erp-text-muted)]">
            {loading
              ? "Chargement..."
              : child.totalField
                ? \`\${records.length} ligne(s) · total \${formatMoney(total)}\`
                : \`\${records.length} enregistrement(s)\`}
          </p>
        </div>

        <Link
          href={createHref}
          className="inline-flex items-center justify-center rounded-2xl bg-[var(--erp-primary)] px-5 py-3 text-sm font-black text-white transition hover:opacity-90"
        >
          {child.createLabel ?? "Ajouter"}
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {!loading && records.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--erp-border)] p-4 text-sm font-semibold text-[var(--erp-text-muted)]">
            Aucun enregistrement lié pour le moment.
          </div>
        ) : null}

        {records.map((record) => {
          const id = getRecordId(record);
          const label = getChildRecordLabel(record, childModule);
          const amount = child.totalField
            ? getAmount(record, child.totalField)
            : null;

          const relationParts = (child.relations ?? [])
            .map((relation) => {
              const relationId = String(record[relation.field] ?? "");
              const relationLabel = relationLabels[relation.field]?.[relationId];

              return relationLabel;
            })
            .filter(Boolean);

          return (
            <Link
              key={id || JSON.stringify(record)}
              href={buildChildEditHref(child, record)}
              className="flex flex-col gap-2 rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 transition hover:bg-[var(--erp-bg)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-black text-[var(--erp-text)]">
                  {label}
                </p>

                {relationParts.length > 0 ? (
                  <p className="mt-1 text-xs font-semibold text-[var(--erp-text-muted)]">
                    {relationParts.join(" · ")}
                  </p>
                ) : null}
              </div>

              {amount !== null ? (
                <p className="text-sm font-black text-[var(--erp-text)]">
                  {formatMoney(amount)}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
`;

const backup = fs.existsSync(file)
  ? `${file}.bak-q12d-related-records-panel`
  : null;

if (backup) {
  fs.writeFileSync(backup, fs.readFileSync(file, "utf8"), "utf8");
  console.log("BACKUP:", backup);
}

fs.writeFileSync(file, content, "utf8");

console.log("OK: ERPRelatedRecordsPanel générique créé.");