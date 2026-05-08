import { ERPButton, ERPCard, ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";

interface ERPFormRendererProps {
  module: ERPModule;
}

export function ERPFormRenderer({ module }: ERPFormRendererProps) {
  const form = ERPModuleBuilder.buildForm(module);

  return (
    <ERPCard
      title={`${module.metadata.label} - formulaire`}
      description="Formulaire centralise genere depuis le schema metier."
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
                    { label: "En suivi", value: "en-suivi" },
                    { label: "A controler", value: "a-controler" },
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

        <div className="flex gap-3 md:col-span-2">
          <ERPButton type="button">Enregistrer</ERPButton>
          <ERPButton variant="ghost" type="button">Annuler</ERPButton>
        </div>
      </form>
    </ERPCard>
  );
}