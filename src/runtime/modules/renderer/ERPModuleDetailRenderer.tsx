import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";

type Props = {
  module: ERPModuleDefinition;
  data?: Record<string, unknown>;
};

export function ERPModuleDetailRenderer({
  module,
  data = {},
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{module.label}</h1>
        <p className="text-muted-foreground">
          DÃƒÂ©tail runtime du module {module.key}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {module.fields.map((field) => (
          <div
            key={field.name}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-muted-foreground">
              {field.label}
            </div>
            <div className="font-medium mt-1">
              {String(data[field.name] ?? "-")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}