const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const erpModuleRel = "src/runtime/modules/ERPModule.ts";
const rdvRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const pageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";

const erpModuleFile = path.join(ROOT, erpModuleRel);
const rdvFile = path.join(ROOT, rdvRel);
const pageFile = path.join(ROOT, pageRel);
const tableFile = path.join(ROOT, tableRel);

for (const file of [erpModuleFile, rdvFile, pageFile, tableFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

function backup(file, suffix) {
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, file + suffix));
}

/**
 * 1. Étendre metadata operational.table proprement.
 */
{
  backup(erpModuleFile, ".bak-q2a-e4-operational-table-config");

  let content = fs.readFileSync(erpModuleFile, "utf8");

  if (!content.includes("export interface ERPOperationalChildTotalConfig")) {
    const marker = "export interface ERPOperationalTableConfig";
    const index = content.indexOf(marker);

    if (index < 0) {
      throw new Error("Point insertion introuvable: ERPOperationalTableConfig");
    }

    const types = `
export interface ERPOperationalChildTotalConfig {
  key: string;
  label: string;
  moduleKey: string;
  foreignKey: string;
  totalField: string;
  currency?: string;
}

`;

    content = content.slice(0, index) + types + content.slice(index);
  }

  if (!content.includes("relationLabelFields?: Record<string, string[]>;")) {
    content = content.replace(
      /export interface ERPOperationalTableConfig \{([\s\S]*?)enableDensityToggle\?: boolean;/,
      `export interface ERPOperationalTableConfig {$1enableDensityToggle?: boolean;
  hiddenFields?: string[];
  relationLabelFields?: Record<string, string[]>;
  childTotals?: ERPOperationalChildTotalConfig[];`
    );
  }

  if (!content.includes("childTotals?: ERPOperationalChildTotalConfig[];")) {
    throw new Error("ERPOperationalTableConfig.childTotals non ajouté.");
  }

  fs.writeFileSync(erpModuleFile, content, "utf8");
  console.log("[WRITTEN]", erpModuleRel);
}

/**
 * 2. Config rendezvous.table :
 * - retirer codeRendezVous
 * - retirer consumedByInterventionId
 * - ajouter labels relationnels client/véhicule
 * - ajouter Montant total depuis interventionsauto.coutTotal
 */
{
  backup(rdvFile, ".bak-q2a-e4-rendezvous-operational-table");

  let content = fs.readFileSync(rdvFile, "utf8");

  // Sécurité : réparer les champs importants si un script précédent les avait touchés.
  content = content.replace(
    /businessCode:\s*\{\s*field:\s*\r?\n\s*prefix:\s*"RDV",/,
    `businessCode: {
      field: "codeRendezVous",
      prefix: "RDV",`
  );

  content = content.replace(
    /key:\s*\r?\n\s*label:\s*"Code rendez-vous",/,
    `key: "codeRendezVous",
          label: "Code rendez-vous",`
  );

  const operationalIndex = content.indexOf("operational:");
  const tableIndex = content.indexOf("table:", operationalIndex);
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);

  if (operationalIndex < 0 || tableIndex < 0 || rightPanelIndex < 0) {
    throw new Error("Bloc operational.table/rightPanel introuvable.");
  }

  const beforeTable = content.slice(0, tableIndex);
  const afterRightPanel = content.slice(rightPanelIndex);

  const tableBlock = `table: {
      title: "Liste des rendez-vous",
      description: "Rendez-vous issus du runtime ERP.",
      fields: [
        "clientId",
        "vehiculeId",
        "dateRendezVous",
        "heureRendezVous",
        "typeService",
        "statut",
      ],
      hiddenFields: [
        "codeRendezVous",
        "consumedByInterventionId",
      ],
      relationLabelFields: {
        clientId: ["nom", "prenom", "telephone"],
        vehiculeId: ["immatriculation", "modele"],
      },
      childTotals: [
        {
          key: "montantTotalIntervention",
          label: "Montant total",
          moduleKey: "interventionsauto",
          foreignKey: "rendezVousId",
          totalField: "coutTotal",
          currency: "FCFA",
        },
      ],
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
    },
    `;

  content = beforeTable + tableBlock + afterRightPanel;

  const newTableStart = content.indexOf("table:", operationalIndex);
  const newRightPanel = content.indexOf("rightPanel:", newTableStart);
  const tableSlice = content.slice(newTableStart, newRightPanel);

  const problems = [];

  if (tableSlice.includes('"codeRendezVous"') && !tableSlice.includes("hiddenFields")) {
    problems.push("codeRendezVous encore visible dans table.fields");
  }

  if (tableSlice.includes('"consumedByInterventionId"') && !tableSlice.includes("hiddenFields")) {
    problems.push("consumedByInterventionId encore visible dans table.fields");
  }

  if (!tableSlice.includes("childTotals")) {
    problems.push("childTotals absent");
  }

  if (!content.includes('field: "codeRendezVous"')) {
    problems.push("businessCode.field perdu");
  }

  if (!content.includes('key: "codeRendezVous"')) {
    problems.push("schema key codeRendezVous perdu");
  }

  if (problems.length > 0) {
    console.log("[FAIL]");
    for (const problem of problems) console.log(" - " + problem);
    process.exit(1);
  }

  fs.writeFileSync(rdvFile, content, "utf8");
  console.log("[WRITTEN]", rdvRel);
}

/**
 * 3. Remonter vraiment la page opérationnelle.
 */
{
  backup(pageFile, ".bak-q2a-e4-lift-page-top");

  let content = fs.readFileSync(pageFile, "utf8");

  content = content
    .replace('className="-mt-8 space-y-3"', 'className="-mt-20 space-y-3"')
    .replace('className="-mt-16 space-y-3"', 'className="-mt-20 space-y-3"')
    .replace('className="-mt-3 space-y-4"', 'className="-mt-20 space-y-3"')
    .replace('className="space-y-5"', 'className="-mt-20 space-y-3"')
    .replace("p-4 lg:p-4", "p-3 lg:p-4")
    .replace("mt-2 flex flex-col gap-1", "mt-1 flex flex-col gap-1")
    .replace("mt-3 flex flex-wrap gap-2", "mt-2 flex flex-wrap gap-2");

  fs.writeFileSync(pageFile, content, "utf8");
  console.log("[WRITTEN]", pageRel);
}

/**
 * 4. Table opérationnelle enrichie :
 * - relation labels
 * - montant total enfants
 * - hidden fields
 * - Fragment key
 */
{
  backup(tableFile, ".bak-q2a-e4-table-relation-labels-child-totals");

  const content = `"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";

type OperationalColumn =
  | {
      kind: "field";
      key: string;
      field: ERPModuleField;
    }
  | {
      kind: "childTotal";
      key: string;
      label: string;
      currency?: string;
    };

type ERPOperationalTableProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function getField(module: ERPModule, key: string): ERPModuleField | undefined {
  return module.schema.fields.find((field) => field.key === key);
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

function isOperationalColumnHidden(
  module: ERPModule,
  fieldKey: string
): boolean {
  const tableConfig = module.operational?.table as
    | {
        hiddenFields?: string[];
        hiddenOperationalFields?: string[];
      }
    | undefined;

  const hiddenFields =
    tableConfig?.hiddenFields ??
    tableConfig?.hiddenOperationalFields ??
    [];

  if (hiddenFields.includes(fieldKey)) {
    return true;
  }

  return false;
}

function getRelationLabelFields(
  module: ERPModule,
  fieldKey: string,
  targetModule?: ERPModule
): string[] {
  const tableConfig = module.operational?.table as
    | {
        relationLabelFields?: Record<string, string[]>;
      }
    | undefined;

  const configured = tableConfig?.relationLabelFields?.[fieldKey];

  if (configured?.length) {
    return configured;
  }

  const composition = targetModule?.composition as
    | {
        labelFields?: string[];
      }
    | undefined;

  if (composition?.labelFields?.length) {
    return composition.labelFields;
  }

  return (
    targetModule?.schema.fields
      .filter((field) => field.list?.visible || field.list?.order !== undefined)
      .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      .map((field) => field.key)
      .slice(0, 3) ?? []
  );
}

function buildRelationLabel(
  record: Record<string, unknown>,
  fields: string[]
): string {
  return fields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null && String(value).trim() !== "")
    .map((value) => String(value).trim())
    .join(" · ");
}

function getStatusBadgeClass(value: unknown): string {
  const status = String(value ?? "").toLowerCase();

  if (["confirme", "validee", "payee"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (["en_cours", "diagnostic", "partiel"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (["annule", "annulee", "retard"].includes(status)) {
    return "border-red-200 bg-red-50 text-red-800";
  }

  if (["termine", "terminee"].includes(status)) {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-800";
}

function formatMoney(value: unknown, currency?: string): string {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return "0" + (currency ? " " + currency : "");
  }

  return amount.toLocaleString("fr-FR") + (currency ? " " + currency : "");
}

export function ERPOperationalTable({
  module,
  data,
}: ERPOperationalTableProps) {
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [relationLabels, setRelationLabels] = useState<Record<string, Record<string, string>>>({});
  const [childTotals, setChildTotals] = useState<Record<string, Record<string, number>>>({});

  const tableConfig = module.operational?.table;
  const hasExpandableChildren = Boolean(module.composition?.children?.length);

  const fieldKeys = tableConfig?.fields?.length
    ? tableConfig.fields
    : module.schema.fields
        .filter((field) => field.list?.visible)
        .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
        .map((field) => field.key);

  const fieldColumns = useMemo(
    () =>
      fieldKeys
        .filter((key) => !isOperationalColumnHidden(module, key))
        .map((key) => ({
          kind: "field" as const,
          key,
          field: getField(module, key),
        }))
        .filter(
          (column): column is Extract<OperationalColumn, { kind: "field" }> =>
            Boolean(column.field)
        ),
    [fieldKeys.join("|"), module]
  );

  const childTotalColumns = useMemo(
    () =>
      ((tableConfig as { childTotals?: Array<{ key: string; label: string; currency?: string }> } | undefined)
        ?.childTotals ?? []
      ).map((total) => ({
        kind: "childTotal" as const,
        key: total.key,
        label: total.label,
        currency: total.currency,
      })),
    [tableConfig]
  );

  const columns: OperationalColumn[] = useMemo(
    () => [...fieldColumns, ...childTotalColumns],
    [fieldColumns, childTotalColumns]
  );

  useEffect(() => {
    let mounted = true;

    async function loadRelationLabels() {
      const relationFields = fieldColumns.filter(
        (column) => column.field.relation?.module
      );

      if (relationFields.length === 0) {
        setRelationLabels({});
        return;
      }

      const next: Record<string, Record<string, string>> = {};

      await Promise.all(
        relationFields.map(async (column) => {
          const targetModuleKey = column.field.relation?.module;

          if (!targetModuleKey) return;

          const targetModule = getModule(targetModuleKey);

          if (!targetModule) return;

          const records = await RuntimeDataBinding.list(targetModule);
          const fields = getRelationLabelFields(module, column.key, targetModule);
          const labels: Record<string, string> = {};

          records.forEach((record) => {
            const id = getRecordId(record);

            if (!id) return;

            labels[id] =
              buildRelationLabel(record, fields) ||
              String(record.nom ?? record.label ?? id);
          });

          next[column.key] = labels;
        })
      );

      if (mounted) {
        setRelationLabels(next);
      }
    }

    loadRelationLabels();

    return () => {
      mounted = false;
    };
  }, [fieldColumns, module]);

  useEffect(() => {
    let mounted = true;

    async function loadChildTotals() {
      const totalsConfig =
        (tableConfig as
          | {
              childTotals?: Array<{
                key: string;
                moduleKey: string;
                foreignKey: string;
                totalField: string;
              }>;
            }
          | undefined)?.childTotals ?? [];

      if (totalsConfig.length === 0) {
        setChildTotals({});
        return;
      }

      const next: Record<string, Record<string, number>> = {};

      await Promise.all(
        totalsConfig.map(async (config) => {
          const childModule = getModule(config.moduleKey);

          if (!childModule) return;

          const children = await RuntimeDataBinding.list(childModule);
          const totalsByParent: Record<string, number> = {};

          children
            .filter(isVisibleRuntimeRecord)
            .forEach((child) => {
              const parentId = String(child[config.foreignKey] ?? "").trim();

              if (!parentId) return;

              totalsByParent[parentId] =
                (totalsByParent[parentId] ?? 0) +
                Number(child[config.totalField] ?? 0);
            });

          next[config.key] = totalsByParent;
        })
      );

      if (mounted) {
        setChildTotals(next);
      }
    }

    loadChildTotals();

    return () => {
      mounted = false;
    };
  }, [tableConfig]);

  function openRecord(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) {
      return;
    }

    router.push("/" + module.metadata.key + "/" + id + "/edit");
  }

  function toggleExpanded(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) return;

    setExpandedRows((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  function renderCell(column: OperationalColumn, record: Record<string, unknown>) {
    if (column.kind === "childTotal") {
      const recordId = getRecordId(record);
      const value = childTotals[column.key]?.[recordId] ?? 0;

      return (
        <span className="font-black text-[#10251C]">
          {formatMoney(value, column.currency)}
        </span>
      );
    }

    const value = record[column.key];
    const isStatus = column.key === "statut" || column.key === "status";
    const relationLabel = relationLabels[column.key]?.[String(value ?? "")];

    if (isStatus) {
      return (
        <span
          className={[
            "inline-flex rounded-full border px-3 py-1 text-xs font-black",
            getStatusBadgeClass(value),
          ].join(" ")}
        >
          <ERPRuntimeFieldValue
            field={column.field}
            value={value}
          />
        </span>
      );
    }

    if (relationLabel) {
      return (
        <span className="font-semibold text-[#10251C]">
          {relationLabel}
        </span>
      );
    }

    return (
      <ERPRuntimeFieldValue
        field={column.field}
        value={value}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-slate-50 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#10251C]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
          {data.length} ligne(s)
        </div>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80">
              {hasExpandableChildren ? (
                <th className="w-12 px-4 py-3.5" />
              ) : null}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500"
                >
                  {column.kind === "field" ? column.field.label : column.label}
                </th>
              ))}

              <th className="whitespace-nowrap px-5 py-3.5 text-right text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => {
              const recordId = getRecordId(record);
              const expanded = Boolean(expandedRows[recordId]);

              return (
                <Fragment key={recordId}>
                  <tr
                    onClick={() => openRecord(record)}
                    className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/45"
                  >
                    {hasExpandableChildren ? (
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleExpanded(record);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
                          aria-label={expanded ? "Replier" : "Déplier"}
                        >
                          {expanded ? "−" : "+"}
                        </button>
                      </td>
                    ) : null}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#10251C]"
                      >
                        {renderCell(column, record)}
                      </td>
                    ))}

                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          openRecord(record);
                        }}
                        className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:bg-slate-50"
                      >
                        Ouvrir
                      </button>
                    </td>
                  </tr>

                  {expanded ? (
                    <tr className="border-b border-slate-100">
                      <td
                        colSpan={columns.length + (hasExpandableChildren ? 2 : 1)}
                        className="bg-slate-50 px-5 py-4"
                      >
                        <ERPOperationalExpandedChildren
                          parentModule={module}
                          parentRecord={record}
                        />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
`;

  fs.writeFileSync(tableFile, content, "utf8");
  console.log("[WRITTEN]", tableRel);
}

console.log("");
console.log("[DONE] Q2-A-E4 table opérationnelle enrichie.");
console.log("");
console.log("Next:");
console.log("pnpm build");
