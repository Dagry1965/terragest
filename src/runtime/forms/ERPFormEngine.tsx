"use client";

import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";

type Props = {
  module: ERPModuleDefinition;
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
};

export function ERPFormEngine({
  module,
  initialData = {},
  onSubmit,
}: Props) {
  async function handleSubmit(formData: FormData) {
    const payload: Record<string, unknown> = {};

    for (const field of module.fields) {
      payload[field.name] = formData.get(field.name);
    }

    await onSubmit?.(payload);
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {module.fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label className="text-sm font-medium">
            {field.label}
            {field.required ? " *" : ""}
          </label>

          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              defaultValue={String(initialData[field.name] ?? "")}
              className="w-full rounded-xl border px-4 py-3"
              required={field.required}
              readOnly={field.readonly}
            />
          ) : field.type === "select" || field.type === "status" ? (
            <select
              name={field.name}
              defaultValue={String(initialData[field.name] ?? "")}
              className="w-full rounded-xl border px-4 py-3"
              required={field.required}
              disabled={field.readonly}
            >
              <option value="">SÃ©lectionner</option>
              {(field.options ?? []).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={
                field.type === "number"
                  ? "number"
                  : field.type === "date"
                    ? "date"
                    : "text"
              }
              defaultValue={String(initialData[field.name] ?? "")}
              className="w-full rounded-xl border px-4 py-3"
              required={field.required}
              readOnly={field.readonly}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="rounded-xl bg-black text-white px-5 py-3 font-medium"
      >
        Enregistrer
      </button>
    </form>
  );
}