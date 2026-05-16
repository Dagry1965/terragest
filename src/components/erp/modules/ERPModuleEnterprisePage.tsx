import {
  ERPModulePageShell,
  ERPModulePlaceholder,
} from "@/components/erp/modules";

type ERPModuleEnterprisePageProps = {
  moduleLabel: string;
  moduleDescription?: string;
};

export function ERPModuleEnterprisePage({
  moduleLabel,
  moduleDescription,
}: ERPModuleEnterprisePageProps) {
  return (
    <ERPModulePageShell
      moduleLabel={moduleLabel}
      moduleDescription={moduleDescription}
      stats={[
        {
          label: "Statut",
          value: "Actif",
          helper: "ERP operationnel",
        },
        {
          label: "Runtime",
          value: "Pret",
          helper: "Events et workflows",
        },
        {
          label: "UI",
          value: "Enterprise",
          helper: "Design system central",
        },
        {
          label: "Audit",
          value: "Disponible",
          helper: "Traçabilite active",
        },
      ]}
    >
      <ERPModulePlaceholder moduleLabel={moduleLabel} />
    </ERPModulePageShell>
  );
}