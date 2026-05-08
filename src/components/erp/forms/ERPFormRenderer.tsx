"use client";

import type { ERPGeneratedSchema } from "@/runtime/ui-generation";

type ERPFormRendererProps = {
  schema: ERPGeneratedSchema;
};

export function ERPFormRenderer({
  schema,
}: ERPFormRendererProps) {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {schema.fields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </span>

            {field.type === "textarea" ? (
              <textarea
                className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder={field.placeholder ?? field.label}
              />
            ) : field.type === "select" ? (
              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                <option value="">Selectionner</option>
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={
                  field.type === "number" || field.type === "currency"
                    ? "number"
                    : field.type === "date"
                      ? "date"
                      : "text"
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder={field.placeholder ?? field.label}
              />
            )}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}