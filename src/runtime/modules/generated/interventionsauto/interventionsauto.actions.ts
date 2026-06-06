import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const interventionsautoActions: ERPModuleAction[] = [
{
    key: "demarrer-intervention",
    label: "Demarrer intervention",
    type: "primary",
    runtimeOnly: true,
  },
  {
    key: "DÃ©marrer",
    label: "DÃ©marrer l'intervention",
    type: "primary",
    permission: "interventionsauto.workflow",
  },
  {
    key: "Diagnostiquer",
    label: "Passer en diagnostic",
    type: "secondary",
    permission: "interventionsauto.workflow",
  },
  {
    key: "Terminer",
    label: "Terminer l'intervention",
    type: "primary",
    permission: "interventionsauto.workflow",
  },
  {
    key: "creer-facture",
    label: "Creer facture",
    type: "primary",
    runtimeOnly: true,
    permission: "facturesauto:create",
    governance: {
      visibleWhen: [
        { field: "statut", equals: "terminee" },
      ],
    },
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "interventionsauto.workflow",
  },
];