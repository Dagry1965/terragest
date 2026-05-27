"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type { ERPModule } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { RuntimeSchedulingEngine } from "@/runtime/scheduling";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";

import { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";
type RuntimePlanningRecord = Record<string, unknown>;
type RuntimeRelationLabelMap = Record<string, string>;

interface ERPSchedulingPlanningViewProps {
  module: ERPModule;
  initialDate?: string;
}

function toDateOnly(value?: string) {
  if (value) {
    return value;
  }

  return formatLocalDateOnly(new Date());
}

function formatLocalDateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function asString(value: unknown) {
  return String(value ?? "").trim();
}

function getRecordId(record: RuntimePlanningRecord) {
  return asString(record.id ?? record._id);
}

function getModuleKey(module: ERPModule) {
  return (
    module.metadata?.key ||
    (module as { key?: string }).key ||
    ""
  );
}

function getCreateHref(module: ERPModule) {
  const moduleKey = getModuleKey(module);

  return (
    module.metadata?.routes?.create ||
    (module as { routes?: { create?: string; new?: string } }).routes?.create ||
    (module as { routes?: { create?: string; new?: string } }).routes?.new ||
    `/${moduleKey}/nouveau`
  );
}

function buildPlanningCreateHref(params: {
  module: ERPModule;
  dateOnly: string;
  slot: {
    start: string;
    end: string;
    label?: string;
  };
  schedulingConfig: NonNullable<ERPModule["scheduling"]>;
}) {
  const {
    module,
    dateOnly,
    slot,
    schedulingConfig,
  } = params;

  const searchParams =
    new URLSearchParams();

  searchParams.set(
    schedulingConfig.dateField,
    dateOnly
  );

  searchParams.set(
    schedulingConfig.timeField,
    slot.start
  );

  if (schedulingConfig.startField) {
    searchParams.set(
      schedulingConfig.startField,
      `${dateOnly}T${slot.start}:00`
    );
  }

  if (schedulingConfig.endField) {
    searchParams.set(
      schedulingConfig.endField,
      `${dateOnly}T${slot.end}:00`
    );
  }

  return `${getCreateHref(module)}?${searchParams.toString()}`;
}

function getRelationLabelKey(
  fieldKey: string,
  value: string
) {
  return fieldKey + "::" + value;
}

function getRelationModuleKey(
  field: ERPModule["schema"]["fields"][number]
) {
  const relation =
    field.relation as
      | string
      | {
          module?: string;
          moduleKey?: string;
          collection?: string;
        }
      | undefined;

  if (!relation) {
    return "";
  }

  if (typeof relation === "string") {
    return relation;
  }

  return (
    relation.module ??
    relation.moduleKey ??
    relation.collection ??
    ""
  );
}

function getContextRelationLabelFields(
  module: ERPModule,
  fieldKey: string
): string[] | null {
  const contextBanner =
    module.composition?.contextBanner as
      | {
          items?: Array<{
            relationField?: string;
            labelFields?: string[];
          }>;
        }
      | undefined;

  const item =
    contextBanner?.items?.find(
      (entry) => entry.relationField === fieldKey
    );

  return Array.isArray(item?.labelFields)
    ? item.labelFields
    : null;
}

function formatRelationRecordLabel(
  record: RuntimePlanningRecord,
  labelFields?: string[]
) {
  const fields =
    labelFields && labelFields.length > 0
      ? labelFields
      : [
          "nom",
          "prenom",
          "label",
          "name",
          "code",
          "telephone",
          "immatriculation",
          "marque",
          "modele",
          "email",
        ];

  const parts =
    fields
      .map((field) => asString(record[field]))
      .filter(Boolean);

  return parts.join(" · ");
}

function isLikelyTechnicalId(value: string) {
  return /^[A-Za-z0-9_-]{12,}$/.test(value);
}

async function buildPlanningRelationLabels(params: {
  module: ERPModule;
  records: RuntimePlanningRecord[];
}) {
  // Q22E8B_PLANNING_RELATION_LABELS
  // Planning labels must display business labels, not raw relation IDs.
  // This is generic: every relation field can be resolved from metadata.
  const { module, records } = params;

  const relationFields =
    module.schema.fields.filter((field) =>
      Boolean(field.relation)
    );

  const labelMap: RuntimeRelationLabelMap = {};

  for (const field of relationFields) {
    const relationModuleKey =
      getRelationModuleKey(field);

    if (!relationModuleKey) {
      continue;
    }

    const relationModule =
      allERPModules.find(
        (item) => item.metadata.key === relationModuleKey
      );

    if (!relationModule) {
      continue;
    }

    const ids =
      Array.from(
        new Set(
          records
            .map((record) => asString(record[field.key]))
            .filter(Boolean)
        )
      );

    if (ids.length === 0) {
      continue;
    }

    try {
      const relatedRecords =
        await RuntimeDataBinding.list(relationModule);

      const wantedIds =
        new Set(ids);

      const labelFields =
        getContextRelationLabelFields(module, field.key) ??
        relationModule.composition?.labelFields;

      for (const relatedRecord of relatedRecords) {
        const relatedId =
          getRecordId(relatedRecord);

        if (!wantedIds.has(relatedId)) {
          continue;
        }

        const label =
          formatRelationRecordLabel(
            relatedRecord,
            labelFields
          );

        if (label) {
          labelMap[
            getRelationLabelKey(field.key, relatedId)
          ] = label;
        }
      }
    } catch (error) {
      console.error(
        "[PLANNING_RELATION_LABELS_ERROR]",
        field.key,
        relationModuleKey,
        error
      );
    }
  }

  return labelMap;
}

function formatRecordLabel(
  record: RuntimePlanningRecord,
  module: ERPModule,
  relationLabels: RuntimeRelationLabelMap = {}
) {
  const labelFields =
    module.composition?.labelFields ?? [
      "nom",
      "titre",
      "code",
      "clientNom",
      "vehiculeImmatriculation",
      "statut",
    ];

  const parts =
    labelFields
      .map((field) => {
        const rawValue =
          asString(record[field]);

        if (!rawValue) {
          return "";
        }

        const relationLabel =
          relationLabels[
            getRelationLabelKey(field, rawValue)
          ];

        if (relationLabel) {
          return relationLabel;
        }

        return isLikelyTechnicalId(rawValue)
          ? ""
          : rawValue;
      })
      .filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" · ");
  }

  return "Réservation";
}

function addDays(dateOnly: string, amount: number) {
  const date = new Date(`${dateOnly}T00:00:00`);
  date.setDate(date.getDate() + amount);

  return formatLocalDateOnly(date);
}

function buildPlanningDateTime(dateOnly: string, timeOnly: string) {
  return new Date(`${dateOnly}T${timeOnly}:00`);
}

function toPlanningTimestamp(value: unknown) {
  const text = asString(value);

  if (!text) {
    return Number.NaN;
  }

  const timestamp = new Date(text).getTime();

  return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

function planningRangesOverlap(
  leftStart: number,
  leftEnd: number,
  rightStart: number,
  rightEnd: number
) {
  if (
    !Number.isFinite(leftStart) ||
    !Number.isFinite(leftEnd) ||
    !Number.isFinite(rightStart) ||
    !Number.isFinite(rightEnd)
  ) {
    return false;
  }

  return leftStart < rightEnd && rightStart < leftEnd;
}


function formatReadableDate(dateOnly: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateOnly}T00:00:00`));
}

export function ERPSchedulingPlanningView({
  module,
  initialDate,
}: ERPSchedulingPlanningViewProps) {
  const effectiveSchedulingConfig = useMemo(
    () =>
      RuntimeSchedulingSettingsResolver.resolve({
        module,
        context: {
          tenantId: "runtime",
          moduleKey: module.metadata.key,
        },
      }),
    [module]
  );

  const schedulingConfig = useMemo(
    () =>
      effectiveSchedulingConfig.enabled
        ? effectiveSchedulingConfig
        : null,
    [effectiveSchedulingConfig]
  );

  const [selectedDate, setSelectedDate] =
    useState(toDateOnly(initialDate));

  

  const goToPreviousDate = () => {
    setSelectedDate((current) => addDays(current, -1));
  };

  const goToNextDate = () => {
    setSelectedDate((current) => addDays(current, 1));
  };

  const goToToday = () => {
    setSelectedDate(toDateOnly());
  };
const [records, setRecords] =
    useState<RuntimePlanningRecord[]>([]);

  const [relationLabels, setRelationLabels] =
    useState<RuntimeRelationLabelMap>({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    async function loadRecords() {
      if (!schedulingConfig) {
        setRecords([]);
        setRelationLabels({});
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result =
          await RuntimeDataBinding.list(module);

        const rows =
          Array.isArray(result)
            ? result as RuntimePlanningRecord[]
            : [];

        if (active) {
          setRecords(rows);
        }

        const labels =
          await buildPlanningRelationLabels({
            module,
            records: rows,
          });

        if (active) {
          setRelationLabels(labels);
        }
      } catch (error) {
        console.error(
          "ERP SCHEDULING PLANNING LOAD ERROR",
          error
        );

        if (active) {
          setRecords([]);
          setRelationLabels({});
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecords();

    return () => {
      active = false;
    };
  }, [module, schedulingConfig]);

  const planning = useMemo(() => {
    if (!schedulingConfig) {
      return {
        slots: [],
        bookingsBySlot: new Map<string, RuntimePlanningRecord[]>(),
      };
    }

    const startField =
      schedulingConfig.startField ?? "startAt";

    const endField =
      schedulingConfig.endField ?? "endAt";

    const statusField =
      schedulingConfig.statusField;

    const blockingStatuses =
      schedulingConfig.blockingStatuses ?? [];

    const dateRecords =
      records.filter((record) => {
        const dateValue =
          asString(record[schedulingConfig.dateField]);

        if (dateValue === selectedDate) {
          return true;
        }

        const startAt =
          asString(record[startField]);

        return startAt.startsWith(selectedDate);
      });

    const bookings =
      dateRecords
        .filter((record) => {
          if (!statusField || blockingStatuses.length === 0) {
            return true;
          }

          return blockingStatuses.includes(
            asString(record[statusField])
          );
        })
        .map((record) => ({
          id: getRecordId(record),
          startAt: asString(record[startField]),
          endAt: asString(record[endField]),
          status: statusField
            ? asString(record[statusField])
            : undefined,
        }))
        .filter((booking) =>
          Boolean(booking.startAt && booking.endAt)
        );
const slots =
  RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
    date: selectedDate,
    durationMinutes:
      schedulingConfig.defaultDurationMinutes,
    bookings,
    calendarExceptions:
      schedulingConfig.calendarExceptions,
    bufferMinutes:
      schedulingConfig.bufferMinutes,
    capacity:
      schedulingConfig.capacity,
  });

    const bookingsBySlot =
      new Map<string, RuntimePlanningRecord[]>();

    for (const slot of slots) {
      const slotStart =
        buildPlanningDateTime(selectedDate, slot.start).getTime();

      const slotEnd =
        buildPlanningDateTime(selectedDate, slot.end).getTime();

      const related =
        dateRecords.filter((record) => {
          const recordStartAt =
            toPlanningTimestamp(record[startField]);

          const recordEndAt =
            toPlanningTimestamp(record[endField]);

          if (
            Number.isFinite(recordStartAt) &&
            Number.isFinite(recordEndAt)
          ) {
            return planningRangesOverlap(
              slotStart,
              slotEnd,
              recordStartAt,
              recordEndAt
            );
          }

          const timeValue =
            asString(record[schedulingConfig.timeField]);

          return timeValue === slot.start;
        });

      bookingsBySlot.set(slot.start, related);
    }

    return {
      slots,
      bookingsBySlot,
    };
  }, [records, schedulingConfig, selectedDate]);

  const totalSlots =
    planning.slots.length;

  const availableSlots =
    planning.slots.filter((slot) => slot.available).length;

  const fullSlots =
    totalSlots - availableSlots;

  const totalBookings =
    Array.from(planning.bookingsBySlot.values()).reduce(
      (total, items) => total + items.length,
      0
    );

  if (!schedulingConfig) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black text-slate-950">
          Planning indisponible
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Ce module ne déclare pas de configuration scheduling.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 shadow-[0_22px_70px_rgba(15,23,42,0.20)]">
        <div className="relative p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.30),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.20),transparent_34%)]" />

          <div className="relative flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-teal-100">
                ERP Scheduling Runtime
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Planning {module.metadata.label}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Vue générique basée sur les metadata scheduling : horaires,
                buffer, exceptions calendrier, capacité et réservations existantes.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={"/" + module.metadata.key}
                  className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white shadow-sm transition hover:bg-white/15"
                >
                  Retour liste
                </Link>

                <Link
                  href={getCreateHref(module)}
                  className="rounded-2xl bg-teal-300 px-4 py-2 text-sm font-black text-slate-950 shadow-[0_14px_35px_rgba(45,212,191,0.28)] transition hover:brightness-110"
                >
                  Nouveau
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur">
              <label className="text-xs font-black uppercase tracking-wide text-slate-300">
                Date du planning
              </label>

              <div className="relative z-20 mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  aria-label="Jour précédent"
                  onClick={() => {
                    setSelectedDate((current) => addDays(current, -1));
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >←</button>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-black text-slate-950 outline-none"
                />

                <button
                  type="button"
                  aria-label="Jour suivant"
                  onClick={() => {
                    setSelectedDate((current) => addDays(current, 1));
                  }}
                  className="pointer-events-auto rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >→</button>

                <button
                  type="button"
                  aria-label="Aujourd’hui"
                  onClick={() => {
                    setSelectedDate(toDateOnly());
                  }}
                  className="pointer-events-auto rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >Aujourd’hui</button>
              </div>

              <p className="mt-3 text-sm font-semibold capitalize text-teal-100">
                {formatReadableDate(selectedDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {[
          {
            label: "Créneaux",
            value: totalSlots,
            className: "border-slate-200 bg-white text-slate-950",
            subClassName: "text-slate-500",
          },
          {
            label: "Disponibles",
            value: availableSlots,
            className: "border-emerald-100 bg-emerald-50 text-emerald-950",
            subClassName: "text-emerald-700",
          },
          {
            label: "Complets",
            value: fullSlots,
            className: "border-rose-100 bg-rose-50 text-rose-950",
            subClassName: "text-rose-700",
          },
          {
            label: "Réservations",
            value: totalBookings,
            className: "border-cyan-100 bg-cyan-50 text-cyan-950",
            subClassName: "text-cyan-700",
          },
        ].map((item) => (
          <div
            key={item.label}
            className={[
              "rounded-[1.75rem] border p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)]",
              item.className,
            ].join(" ")}
          >
            <p className={[
              "text-xs font-black uppercase tracking-wide",
              item.subClassName,
            ].join(" ")}>
              {item.label}
            </p>
            <p className="mt-2 text-4xl font-black">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] sm:p-4">
        {loading ? (
          <div className="rounded-3xl bg-slate-50 p-8 text-sm font-black text-slate-500">
            Chargement du planning...
          </div>
        ) : planning.slots.length === 0 ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm font-semibold text-amber-900">
            Aucun créneau disponible pour cette date selon les horaires et exceptions configurés.
          </div>
        ) : (
          <div className="space-y-3">
            {planning.slots.map((slot) => {
              const bookings =
                planning.bookingsBySlot.get(slot.start) ?? [];

              const slotIsBlockedByBuffer =
                !slot.available && bookings.length === 0;

              const slotStatusLabel =
                slot.available
                  ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
                    ? slot.remainingCapacity + " place(s) restante(s)"
                    : "Disponible"
                  : slotIsBlockedByBuffer
                    ? "Bloqué par buffer"
                    : slot.reason ?? "Créneau complet";

              const slotActionLabel =
                slot.available
                  ? "Planifier"
                  : slotIsBlockedByBuffer
                    ? "Buffer"
                    : "Complet";

              const createHref =
                buildPlanningCreateHref({
                  module,
                  dateOnly: selectedDate,
                  slot,
                  schedulingConfig,
                });

              return (
                <div
                  key={slot.start + "-" + slot.end}
                  className={[
                    "group rounded-3xl border p-4 transition",
                    slot.available
                      ? "border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 hover:border-emerald-200 hover:shadow-[0_16px_40px_rgba(16,185,129,0.10)]"
                      : "border-rose-100 bg-gradient-to-r from-rose-50 to-slate-50 opacity-90",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className={[
                          "mt-1 h-12 w-2 rounded-full",
                          slot.available
                            ? "bg-emerald-400"
                            : "bg-rose-400",
                        ].join(" ")}
                      />

                      <div>
                        <p className="text-xl font-black tracking-tight text-slate-950">
                          {slot.label}
                        </p>

                        <p
                          className={[
                            "mt-1 text-xs font-black uppercase tracking-wide",
                            slot.available
                              ? "text-emerald-700"
                              : "text-rose-700",
                          ].join(" ")}
                        >
                          {slotStatusLabel}
                        </p>

                        {bookings.length > 0 ? (
                          <p className="mt-2 text-xs font-semibold text-slate-500">
                            {bookings.length} réservation(s) rattachée(s)
                          </p>
                        ) : null}
                      </div>
                    </div>

                    {slot.available ? (
                      <Link
                        href={createHref}
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-teal-600"
                      >
                        Planifier
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl bg-slate-200 px-5 py-3 text-sm font-black text-slate-500"
                      >
                        {slotActionLabel}
                      </button>
                    )}
                  </div>

                  {bookings.length > 0 ? (
                    <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {bookings.map((record) => {
                        const id = getRecordId(record);

                        return (
                          <Link
                            key={id || JSON.stringify(record)}
                            href={
                              id
                                ? `/${module.metadata.key}/${id}/edit`
                                : "#"
                            }
                            className="rounded-2xl border border-white/80 bg-white/90 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                          >
                            {formatRecordLabel(record, module, relationLabels)}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
