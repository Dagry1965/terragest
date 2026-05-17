import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const encaissementsautoActions: ERPModuleAction[] = [
  {
    key: "Valider",
    label: "Valider l’encaissement",
    type: "primary",
    permission: "encaissementsauto.workflow",
  },
  {
    key: "Rejeter",
    label: "Rejeter",
    type: "danger",
    permission: "encaissementsauto.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "secondary",
    permission: "encaissementsauto.workflow",
  },
];
