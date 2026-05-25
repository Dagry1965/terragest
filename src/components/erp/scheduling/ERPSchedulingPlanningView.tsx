"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type { ERPModule } from "@/runtime/modules";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { RuntimeSchedulingEngine } from "@/runtime/scheduling";

type RuntimePlanningRecord = Record<string, unknown>;

interface ERPSchedulingPlanningViewProps {
  module: ERPModule;
  initialDate?: string;
}

function toDateOnly(value?: string) {
  if (value) {
    return value;
  }

  return new Date().toISOString().slice(0, 10);
}

function asString(value: unknown) {
  return String(value ?? "").trim();
}

function getRecordId(record: RuntimePlanningRecord) {
  return asString(record.id ?? record._id);
}

function formatRecordLabel(record: RuntimePlanningRecord, module: ERPModule) {
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
      .map((field) => asString(record[field]))
      .filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" · ");
  }

  return getRecordId(record) || "Booking";
}

export function ERPSchedulingPlanningView({
  module,
  initialDate,
}: ERPSchedulingPlanningViewProps) {
  const schedulingConfig =
    module.scheduling?.enabled
      ? module.scheduling
      : null;

  const [selectedDate, setSelectedDate] =
    useState(toDateOnly(initialDate));

  const [records, setRecords] =
    useState<RuntimePlanningRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let active = true;

    async function loadRecords() {
      if (!schedulingConfig) {
        setRecords([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const result =
          await RuntimeDataBinding.list(module);

        if (active) {
          setRecords(
            Array.isArray(result)
              ? result as RuntimePlanningRecord[]
              : []
          );
        }
      } catch (error) {
        console.error(
          "ERP SCHEDULING PLANNING LOAD ERROR",
          error
        );

        if (active) {
          setRecords([]);
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

    const resourceField =
      schedulingConfig.resourceField;

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
          schedulingConfig.durationField
            ? Number(records[0]?.[schedulingConfig.durationField] ?? 0) || undefined
            : undefined,
        bookings,
        bufferMinutes: schedulingConfig.bufferMinutes,
        calendarExceptions: schedulingConfig.calendarExceptions,
        capacity: schedulingConfig.capacity,
      });

    const bookingsBySlot =
      new Map<string, RuntimePlanningRecord[]>();

    for (const slot of slots) {
      const related =
        dateRecords.filter((record) => {
          const timeValue =
            asString(record[schedulingConfig.timeField]);

          if (timeValue === slot.start) {
            return true;
          }

          const startAt =
            asString(record[startField]);

          return startAt.includes("T" + slot.start);
        });

      bookingsBySlot.set(slot.start, related);
    }

    return {
      slots,
      bookingsBySlot,
    };
  }, [module, records, schedulingConfig, selectedDate]);

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
      <div className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-primary)]">
              ERP Scheduling Runtime
            </p>

            <h1 className="mt-2 text-3xl font-black text-[var(--erp-text)]">
              Planning {module.metadata.label}
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--erp-text-muted)]">
              Vue générique basée sur module.scheduling : horaires, buffer,
              exceptions calendrier, capacité et réservations existantes.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wide text-[var(--erp-text-muted)]">
              Date du planning
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(event) =>
                setSelectedDate(event.target.value)
              }
              className="rounded-2xl border border-[var(--erp-border)] bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] p-4 shadow-sm">
        {loading ? (
          <p className="p-6 text-sm font-semibold text-[var(--erp-text-muted)]">
            Chargement du planning...
          </p>
        ) : planning.slots.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
            Aucun créneau disponible pour cette date selon les horaires et exceptions configurés.
          </div>
        ) : (
          <div className="space-y-3">
            {planning.slots.map((slot) => {
              const bookings =
                planning.bookingsBySlot.get(slot.start) ?? [];

              return (
                <div
                  key={slot.start + "-" + slot.end}
                  className={[
                    "rounded-2xl border p-4 transition",
                    slot.available
                      ? "border-emerald-100 bg-emerald-50/50"
                      : "border-rose-100 bg-rose-50/70",
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-lg font-black text-slate-950">
                        {slot.label}
                      </p>

                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {slot.available
                          ? slot.remainingCapacity !== undefined && slot.capacity && slot.capacity > 1
                            ? slot.remainingCapacity + " place(s) restante(s)"
                            : "Disponible"
                          : slot.reason ?? "Complet"}
                      </p>
                    </div>

                    <Link
                      href={
                        module.metadata.routes?.create
                          ? module.metadata.routes.create +
                            "?" +
                            new URLSearchParams({
                              [schedulingConfig.dateField]: selectedDate,
                              [schedulingConfig.timeField]: slot.start,
                            }).toString()
                          : "#"
                      }
                      className={[
                        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-black shadow-sm transition",
                        slot.available
                          ? "bg-[var(--erp-primary)] text-[var(--erp-text)] hover:brightness-110"
                          : "pointer-events-none bg-slate-200 text-slate-500",
                      ].join(" ")}
                    >
                      Planifier
                    </Link>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="mt-4 grid gap-2">
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
                            className="rounded-xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white"
                          >
                            {formatRecordLabel(record, module)}
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
