"use client";

import { useMemo, useState, useTransition } from "react";

import type { RuntimeSchedulingSettings } from "@/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes";

import {
  readRuntimeSchedulingSettingsAction,
  saveRuntimeSchedulingSettingsAction,
} from "@/runtime/scheduling/settings/RuntimeSchedulingSettingsActions";

type StorageScope = "tenant" | "workspace" | "module";

export interface ERPSchedulingSettingsPanelProps {
  tenantId: string;
  workspaceId?: string;
  moduleKey?: string;
  defaultScope?: StorageScope;
}

interface FormState {
  enabled: boolean;
  defaultDurationMinutes: number;
  bufferMinutes: number;
  capacity: number;
  resourceField: string;
  dateField: string;
  timeField: string;
  durationField: string;
  startField: string;
  endField: string;
}

const DEFAULT_FORM_STATE: FormState = {
  enabled: true,
  defaultDurationMinutes: 60,
  bufferMinutes: 15,
  capacity: 1,
  resourceField: "resourceId",
  dateField: "date",
  timeField: "time",
  durationField: "durationMinutes",
  startField: "startAt",
  endField: "endAt",
};

function toSettings(form: FormState): RuntimeSchedulingSettings {
  return {
    enabled: form.enabled,
    defaultDurationMinutes: form.defaultDurationMinutes,
    bufferMinutes: form.bufferMinutes,
    capacity: form.capacity,
    resourceField: form.resourceField || undefined,
  };
}

function numberValue(value: string, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function ERPSchedulingSettingsPanel({
  tenantId,
  workspaceId,
  moduleKey,
  defaultScope = "workspace",
}: ERPSchedulingSettingsPanelProps) {
  const [scope, setScope] = useState<StorageScope>(defaultScope);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM_STATE);
  const [message, setMessage] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const context = useMemo(
    () => ({
      tenantId,
      workspaceId,
      moduleKey,
    }),
    [tenantId, workspaceId, moduleKey]
  );

  function updateField<K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function loadSettings() {
    setMessage("");

    startTransition(async () => {
      try {
        const result = await readRuntimeSchedulingSettingsAction({
          context,
        });

        const effective = result.effectiveConfig;

        if (effective) {
          setForm({
            enabled: effective.enabled,
            defaultDurationMinutes: effective.defaultDurationMinutes,
            bufferMinutes: effective.bufferMinutes,
            capacity: effective.capacity,
            resourceField: effective.resourceField ?? "",
            dateField: effective.dateField ?? "date",
            timeField: effective.timeField ?? "time",
            durationField: effective.durationField ?? "durationMinutes",
            startField: effective.startField ?? "startAt",
            endField: effective.endField ?? "endAt",
          });
        }

        setMessage("Paramètres chargés.");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Impossible de charger les paramètres."
        );
      }
    });
  }

  function saveSettings() {
    setMessage("");

    startTransition(async () => {
      try {
        const result = await saveRuntimeSchedulingSettingsAction({
          context,
          scope,
          settings: toSettings(form),
        });

        if (!result.validation.ok) {
          setMessage(
            result.validation.issues
              .map((issue) => issue.message)
              .join(" ")
          );
          return;
        }

        setMessage("Paramètres enregistrés.");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Impossible d'enregistrer les paramètres."
        );
      }
    });
  }

  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Runtime scheduling
        </p>
        <h1 className="text-2xl font-semibold text-slate-950">
          Paramètres génériques du planning
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Cette interface édite les paramètres de planification via les server
          actions runtime. Elle ne touche jamais Firestore directement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Scope</span>
          <select
            value={scope}
            onChange={(event) => setScope(event.target.value as StorageScope)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="tenant">Tenant</option>
            <option value="workspace">Workspace</option>
            <option value="module">Module</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Durée visible
          </span>
          <input
            type="number"
            min={1}
            value={form.defaultDurationMinutes}
            onChange={(event) =>
              updateField(
                "defaultDurationMinutes",
                numberValue(event.target.value, 60)
              )
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Buffer</span>
          <input
            type="number"
            min={0}
            value={form.bufferMinutes}
            onChange={(event) =>
              updateField("bufferMinutes", numberValue(event.target.value, 0))
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Capacité</span>
          <input
            type="number"
            min={1}
            value={form.capacity}
            onChange={(event) =>
              updateField("capacity", numberValue(event.target.value, 1))
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(event) => updateField("enabled", event.target.checked)}
          />
          <span className="text-sm font-medium text-slate-700">
            Planning activé
          </span>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700">Champ ressource</span>
          <input
            value={form.resourceField}
            onChange={(event) =>
              updateField("resourceField", event.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
          />
        </label>

        {[
          ["dateField", "Champ date"],
          ["timeField", "Champ heure"],
          ["durationField", "Champ durée"],
          ["startField", "Champ début calculé"],
          ["endField", "Champ fin calculé"],
        ].map(([key, label]) => (
          <label key={key} className="space-y-2 opacity-75">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
              value={String(form[key as keyof FormState] ?? "")}
              readOnly
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500"
            />
          </label>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Aperçu</p>
        <p>
          Durée visible : {form.defaultDurationMinutes} min · Buffer :{" "}
          {form.bufferMinutes} min · Slot runtime :{" "}
          {form.defaultDurationMinutes + form.bufferMinutes} min · Capacité :{" "}
          {form.capacity}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={loadSettings}
          disabled={isPending}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Charger
        </button>

        <button
          type="button"
          onClick={saveSettings}
          disabled={isPending}
          className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-50"
        >
          Enregistrer
        </button>
      </div>

      {message ? (
        <p className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      ) : null}
    </section>
  );
}
