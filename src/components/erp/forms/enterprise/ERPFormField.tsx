import { ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";

interface ERPFormFieldProps {
  field: ERPModuleField;
}

export function ERPFormField({ field }: ERPFormFieldProps) {
  if (field.type === "select" || field.type === "status") {
    return (
      <ERPSelect
        label={field.label}
        required={field.required}
        options={
          field.options ?? [
            { label: "Actif", value: "actif" },
            { label: "En suivi", value: "en-suivi" },
            { label: "A controler", value: "a-controler" },
          ]
        }
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <ERPSelect
        label={field.label}
        required={field.required}
        options={[
          { label: "Oui", value: "true" },
          { label: "Non", value: "false" },
        ]}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="block space-y-2">
        <span className="text-sm font-bold text-slate-700">
          {field.label}
          {field.required ? " *" : ""}
        </span>

        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder={field.label}
        />
      </label>
    );
  }

  return (
    <ERPInput
      label={field.label}
      required={field.required}
      type={
        field.type === "number"
          ? "number"
          : field.type === "date"
            ? "date"
            : field.type === "email"
              ? "email"
              : "text"
      }
      placeholder={field.label}
    />
  );
}