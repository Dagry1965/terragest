"use client";

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

type RelatedRecordsSortDirection = "asc" | "desc";

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

function normalizeRelatedStatusValue(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isRelatedStatusValue(value: unknown): boolean {
  // Q20H5E_B2_STATUS_BADGE
  const status = normalizeRelatedStatusValue(value);

  return [
    "brouillon",
    "draft",
    "validee",
    "valide",
    "retiree",
  ].includes(status);
}

function getRelatedStatusBadgeClass(value: unknown): string {
  const status = normalizeRelatedStatusValue(value);

  if (status === "validee" || status === "valide") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (status === "brouillon" || status === "draft") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (status === "retiree") {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getRecordStatusValue(record: Record<string, unknown>): string {
  // Q20H5E_B3_AMOUNT_STATUS_TONE
  return normalizeRelatedStatusValue(record.statut ?? record.status);
}

function getRelatedAmountBoxClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "border-emerald-200 bg-emerald-50";
  }

  if (status === "brouillon" || status === "draft") {
    return "border-amber-200 bg-amber-50";
  }

  if (status === "retiree") {
    return "border-slate-200 bg-slate-50";
  }

  return "border-slate-200 bg-slate-50";
}

function getRelatedAmountLabelClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "text-emerald-700";
  }

  if (status === "brouillon" || status === "draft") {
    return "text-amber-700";
  }

  if (status === "retiree") {
    return "text-slate-600";
  }

  return "text-slate-600";
}

function isRelatedRecordCountable(record: Record<string, unknown>): boolean {
  // Q20H5E_C_VALID_TOTAL_RIGHT
  // Le total visible du panneau ne compte que les lignes confirmées.
  const status = normalizeRelatedStatusValue(record.statut ?? record.status);

  return (
    (status === "validee" || status === "valide") &&
    !record.removedAt
  );
}

function getRelatedAmountValueClassByStatus(record: Record<string, unknown>): string {
  const status = getRecordStatusValue(record);

  if (status === "validee" || status === "valide") {
    return "text-emerald-950";
  }

  if (status === "brouillon" || status === "draft") {
    return "text-amber-950";
  }

  if (status === "retiree") {
    return "text-slate-700";
  }

  return "text-slate-950";
}

function formatRelatedStatusLabel(value: unknown): string {
  const status = normalizeRelatedStatusValue(value);

  if (status === "validee" || status === "valide") return "Validée";
  if (status === "brouillon" || status === "draft") return "Brouillon";
  if (status === "retiree") return "Retirée";

  return String(value ?? "");
}

function getAmount(record: Record<string, unknown>, field?: string): number {
  if (!field) return 0;

  const value = Number(record[field] ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function getBusinessSortCandidates(
  record: Record<string, unknown>,
  childModuleKey?: string
): unknown[] {
  if (childModuleKey === "encaissementsauto") {
    return [
      record.datePaiement,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (
    childModuleKey === "echeancespaiementauto" ||
    childModuleKey === "echeancesauto"
  ) {
    return [
      record.dateEcheance,
      record.datePrevue,
      record.datePaiement,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "rendezvous") {
    return [
      [
        record.dateRendezVous,
        record.heureRendezVous,
      ]
        .filter(Boolean)
        .join(" "),
      record.startAt,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "interventionsauto") {
    return [
      record.dateIntervention,
      record.createdAt,
      record.id,
      record._id,
    ];
  }

  if (childModuleKey === "lignesinterventionauto") {
    return [
      record.ordreLigne,
      record.createdAt,
      record.createdOn,
      record.id,
      record._id,
    ];
  }

  return [
    record.createdAt,
    record.createdOn,
    record.dateCreation,
    record.datePaiement,
    record.dateFacture,
    record.dateIntervention,
    record.dateRendezVous,
    record.dateEcheance,
    record.updatedAt,
    record.id,
    record._id,
  ];
}

function getRecordSortValue(
  record: Record<string, unknown>,
  childModuleKey?: string
): string {
  const value =
    getBusinessSortCandidates(
      record,
      childModuleKey
    ).find(
      (candidate) =>
        candidate !== undefined &&
        candidate !== null &&
        String(candidate).trim() !== ""
    ) ?? "";

  return String(value);
}

function sortRelatedRecords(
  records: Record<string, unknown>[],
  direction: RelatedRecordsSortDirection,
  childModuleKey?: string
): Record<string, unknown>[] {
  return [...records].sort((left, right) => {
    const comparison =
      getRecordSortValue(left, childModuleKey).localeCompare(
        getRecordSortValue(right, childModuleKey),
        "fr",
        {
          numeric: true,
          sensitivity: "base",
        }
      );

    return direction === "asc"
      ? comparison
      : -comparison;
  });
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

function formatRelatedFieldValue(field: string, value: unknown): string {
  const text = String(value ?? "").trim();

  if (!text) return "";

  const normalized = text.toLowerCase();

  const statusLabels: Record<string, string> = {
    actif: "Actif",
    active: "Actif",
    prospect: "Prospect",
    inactif: "Inactif",
    inactive: "Inactif",
    entretien: "Entretien requis",
    immobilise: "Immobilisé",
    immobilisé: "Immobilisé",
    archive: "Archivé",
    brouillon: "Brouillon",
    validee: "Validée",
    validée: "Validée",
    facturee: "Facturée",
    facturée: "Facturée",
    annulee: "Annulée",
    annulée: "Annulée",
  };

  if (field.toLowerCase().includes("kilometrage")) {
    const amount = Number(value ?? 0);
    return Number.isFinite(amount)
      ? amount.toLocaleString("fr-FR") + " km"
      : text;
  }

  return statusLabels[normalized] ?? text;
}

function getConfiguredRecordLabel(
  record: Record<string, unknown>,
  fields?: string[]
): string {
  if (!fields || fields.length === 0) return "";

  return fields
    .map((field) => formatRelatedFieldValue(field, record[field]))
    .filter((value) => value && !looksLikeTechnicalId(value))
    .join(" ")
    .trim();
}

function getConfiguredSubtitleParts(
  record: Record<string, unknown>,
  fields?: string[]
): string[] {
  if (!fields || fields.length === 0) return [];

  return fields
    .map((field) => formatRelatedFieldValue(field, record[field]))
    .filter((value) => value && !looksLikeTechnicalId(value));
}

function looksLikeTechnicalId(value: unknown): boolean {
  const text = String(value ?? "").trim();

  if (!text) return false;

  // Firestore-like ids / technical ids often contain mixed case letters + numbers
  // and are not meaningful labels for end users.
  if (/^[A-Za-z0-9_-]{16,}$/.test(text)) {
    return true;
  }

  return false;
}

function isTechnicalField(field: string): boolean {
  const key = field.toLowerCase();

  return (
    key === "id" ||
    key === "_id" ||
    key.endsWith("id") ||
    key.includes("uuid") ||
    key.includes("technical") ||
    key.includes("foreignkey")
  );
}

function formatBusinessValue(value: unknown): string {
  const text = String(value ?? "").trim();

  const labels: Record<string, string> = {
    piece: "Pièce",
    main_oeuvre: "Main d’œuvre",
    service: "Service",
    remise: "Remise",
    brouillon: "Brouillon",
    validee: "Validée",
    facturee: "Facturée",
    annulee: "Annulée",
  };

  return labels[text] ?? text;
}

function getBusinessLabelFromRecord(
  record: Record<string, unknown>,
  preferredFields: string[]
): string {
  const values = preferredFields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null)
    .map(formatBusinessValue)
    .filter((value) => value.trim() !== "")
    .filter((value) => !looksLikeTechnicalId(value));

  return values.join(" - ");
}

function getChildRecordLabel(
  record: Record<string, unknown>,
  childModule?: ERPModule
): string {
  const priorityLabel = getBusinessLabelFromRecord(record, [
    "designation",
    "libelle",
    "nom",
    "titre",
    "reference",
    "code",
    "typeLigne",
    "type",
  ]);

  if (priorityLabel) {
    return priorityLabel;
  }

  const visibleFields =
    childModule?.schema?.fields
      ?.filter((field) => field.list?.order !== undefined)
      ?.sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      ?.map((field) => field.key)
      ?.filter((field) => !isTechnicalField(field)) ?? [];

  const label = getBusinessLabelFromRecord(record, visibleFields.slice(0, 3));

  return label || "Enregistrement lié";
}

function getParentValueForPrefill(
  parentRecord: Record<string, unknown>,
  parentRecordId: string,
  sourceField: string
): unknown {
  if (
    sourceField === "id" ||
    sourceField === "_id" ||
    sourceField === "$id"
  ) {
    return parentRecordId;
  }

  return parentRecord[sourceField];
}

function buildCreateHref(
  child: ERPCompositionChild,
  parentRecord: Record<string, unknown>,
  parentRecordId: string,
  parentModuleKey: string,
  mode: "detail" | "edit"
): string {
  const params = new URLSearchParams();

  params.set(child.foreignKey, parentRecordId);

  const prefillFromParent =
    child.prefillFromParent ?? {};

  Object.entries(prefillFromParent).forEach(
    ([targetField, sourceField]) => {
      const value =
        getParentValueForPrefill(
          parentRecord,
          parentRecordId,
          sourceField
        );

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
      ) {
        params.set(
          targetField,
          String(value)
        );
      }
    }
  );

  // Q15E_PARENT_CHILD_CONTEXT
  // Transport générique du contexte parent vers la création enfant.
  params.set("parentModuleKey", parentModuleKey);
  params.set("parentRecordId", parentRecordId);
  params.set("parentForeignKey", child.foreignKey);

  params.set(
    "returnTo",
    "/" + parentModuleKey + "/" +
      parentRecordId +
      (mode === "edit" ? "/edit" : "")
  );

  const lockFields =
    child.lockFields?.length
      ? child.lockFields
      : [child.foreignKey];

  params.set(
    "lockFields",
    Array.from(new Set(lockFields)).join(",")
  );

  return "/" + child.moduleKey + "/nouveau?" + params.toString();
}

function buildChildEditHref(
  child: ERPCompositionChild,
  record: Record<string, unknown>,
  parentModule: ERPModule,
  parentRecord: Record<string, unknown>,
  mode: "detail" | "edit"
): string {
  const id = getRecordId(record);

  if (!id) return "#";

  const parentId = getRecordId(parentRecord);
  const params = new URLSearchParams();

  if (parentId) {
    params.set(
      "returnTo",
      "/" +
        parentModule.metadata.key +
        "/" +
        parentId +
        (mode === "edit" ? "/edit" : "")
    );

    params.set("returnLabel", "Retour");
  }

  const query = params.toString();

  return (
    "/" +
    child.moduleKey +
    "/" +
    encodeURIComponent(id) +
    "/edit" +
    (query ? "?" + query : "")
  );
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
  const [sortDirection, setSortDirection] =
    useState<RelatedRecordsSortDirection>("asc");

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
        parentRecord,
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

    const moduleForLoad = childModule;

    let mounted = true;

    async function loadRecords() {
      setLoading(true);

      try {
        const data = await RuntimeDataBinding.list(moduleForLoad);

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

  const activeRecords =
    // Q20H5F_HIDE_REMOVED_RELATED_RECORDS
    // Les lignes retirées restent en base pour audit,
    // mais ne sont plus affichées comme lignes actives.
    records.filter((record) => !record.removedAt);

  const sortedRecords = useMemo(
    () =>
      sortRelatedRecords(
        activeRecords,
        sortDirection,
        child.moduleKey
      ),
    [activeRecords, sortDirection, child.moduleKey]
  );

  const total = activeRecords.reduce(
    (sum, record) =>
      isRelatedRecordCountable(record)
        ? sum + getAmount(record, child.totalField)
        : sum,
    0
  );

  if (!parentRecordId || !childModule) {
    return null;
  }

  return (
    <section
      data-erp-related-records-panel={child.key}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.07)]"
    >
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
            {child.title}
          </h2>

          <p className="mt-1 text-sm font-semibold text-slate-600">
            {loading
              ? "Chargement..."
              : child.badgeLabel
                ? `${activeRecords.length} ${child.badgeLabel}`
                : child.totalField
                  ? `${activeRecords.length} ligne(s)`
                  : `${activeRecords.length} enregistrement(s)`}
          </p>

          {child.description ? (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {child.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {child.totalField ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-right shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700">
                Total lignes validées
              </p>
              <p className="mt-1 whitespace-nowrap text-base font-black text-emerald-950">
                {formatMoney(total)}
              </p>
            </div>
          ) : null}

          <label className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">
            Trier :
            <select
              value={sortDirection}
              onChange={(event) =>
                setSortDirection(
                  event.target.value as RelatedRecordsSortDirection
                )
              }
              className="bg-transparent text-xs font-black text-slate-900 outline-none"
            >
              <option value="asc">Ancien → récent</option>
              <option value="desc">Récent → ancien</option>
            </select>
          </label>

          {(child.allowCreate ?? child.mode !== "readonly") ? (
            <Link
              href={createHref}
              className="inline-flex items-center justify-center rounded-2xl bg-[#009B7D] px-5 py-3 text-sm font-black text-white shadow-[0_10px_22px_rgba(0,155,125,0.24)] transition hover:-translate-y-0.5 hover:bg-[#007F6D] hover:shadow-[0_16px_30px_rgba(0,127,109,0.28)] active:translate-y-0"
            >
              {child.createLabel ?? "Ajouter"}
            </Link>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 bg-white p-4 sm:p-5">
        {!loading && activeRecords.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm font-semibold text-slate-500">
            Aucun enregistrement lié pour le moment.
          </div>
        ) : null}

        {sortedRecords.map((record) => {
          const id = getRecordId(record);
          const configuredLabel = getConfiguredRecordLabel(record, child.labelFields);
            const label = configuredLabel || getChildRecordLabel(record, childModule);
            const configuredSubtitleParts = getConfiguredSubtitleParts(
              record,
              child.subtitleFields
            );
          const amount = child.totalField
            ? getAmount(record, child.totalField)
            : null;

          const amountBoxClass =
            getRelatedAmountBoxClassByStatus(record);

          const amountLabelClass =
            getRelatedAmountLabelClassByStatus(record);

          const amountValueClass =
            getRelatedAmountValueClassByStatus(record);

          const relationParts = (child.relations ?? [])
            .map((relation) => {
              const relationId = String(record[relation.field] ?? "");
              const relationLabel = relationLabels[relation.field]?.[relationId];

              if (!relationLabel || looksLikeTechnicalId(relationLabel)) {
                return null;
              }

              return relationLabel;
            })
            .filter(Boolean);

          return (
            <Link
              key={id || JSON.stringify(record)}
              href={buildChildEditHref(
                child,
                record,
                parentModule,
                parentRecord,
                mode
              )}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#009B7D]/40 hover:bg-emerald-50/30 hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                  {label}
                </p>

                {configuredSubtitleParts.length > 0 || relationParts.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                    {[...configuredSubtitleParts, ...relationParts].map((part) => {
                      const isStatus = isRelatedStatusValue(part);

                      return (
                        <span
                          key={part}
                          className={[
                            "rounded-full border px-3 py-1 font-black",
                            isStatus
                              ? getRelatedStatusBadgeClass(part)
                              : "border-slate-200 bg-slate-100 text-slate-600",
                          ].join(" ")}
                        >
                          {isStatus
                            ? formatRelatedStatusLabel(part)
                            : part}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {amount !== null ? (
                <div
                  className={[
                    "rounded-2xl border px-4 py-3 text-right",
                    amountBoxClass,
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-xs font-black uppercase tracking-wide",
                      amountLabelClass,
                    ].join(" ")}
                  >
                    Montant
                  </p>
                  <p
                    className={[
                      "mt-1 whitespace-nowrap text-base font-black",
                      amountValueClass,
                    ].join(" ")}
                  >
                    {formatMoney(amount)}
                  </p>
                </div>
              ) : child.openLabel ? (
                <span className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition group-hover:bg-slate-800">
                  {child.openLabel}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
