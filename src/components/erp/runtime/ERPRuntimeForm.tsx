import { ERPButton, ERPCard, ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";

interface ERPRuntimeFormProps {
  module: ERPModule;
}

export function ERPRuntimeForm({ module }: ERPRuntimeFormProps) {
  const form = ERPModuleBuilder.buildForm(module);

  return (
    <ERPCard
      title={`Formulaire ${module.metadata.label}`}
      description="Formulaire généré automatiquement par le Runtime ERP."
    >
      <form className="grid gap-5 md:grid-cols-2">
        {form.fields.map((field) => {
          if (field.type === "select" || field.type === "status") {
            return (
              <ERPSelect
                key={field.key}
                label={field.label}
                options={
                  field.options ?? [
                    { label: "Actif", value: "actif" },
                    { label: "En attente", value: "pending" },
                    { label: "Archivé", value: "archived" },
                  ]
                }
              />
            );
          }

          return (
            <ERPInput
              key={field.key}
              label={field.label}
              required={field.required}
              type={field.type === "number" ? "number" : "text"}
            />
          );
        })}

        <div className="md:col-span-2">
          <ERPButton type="button">
            Enregistrer
          </ERPButton>
        </div>
      </form>
    </ERPCard>
  );
}
