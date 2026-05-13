"use client";

type EntityFormField = {
  name: string;
  label: string;
  type?: string;
};

type EntityFormProps = {
  fields: EntityFormField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void | Promise<void>;
};

export function EntityForm({
  fields,
  values,
  onChange,
  onSubmit,
}: EntityFormProps) {
  return (
    <form
      className="space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit();
      }}
    >
      {fields.map((field) => (
        <label
          key={field.name}
          className="block space-y-1"
        >
          <span className="text-sm font-medium text-slate-700">
            {field.label}
          </span>

          <input
            type={field.type ?? "text"}
            value={values?.[field.name] ?? ""}
            onChange={(event) =>
              onChange(field.name, event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          />
        </label>
      ))}

      <button
        type="submit"
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
      >
        Enregistrer
      </button>
    </form>
  );
}