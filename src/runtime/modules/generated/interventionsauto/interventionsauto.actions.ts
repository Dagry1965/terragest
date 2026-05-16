import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const interventionsautoActions: ERPModuleAction[] = [
  {
    key: "Démarrer",
    label: "Démarrer l'intervention",
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
    key: "Facturer",
    label: "Générer la facture",
    type: "secondary",
    permission: "interventionsauto.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "interventionsauto.workflow",
  },
];