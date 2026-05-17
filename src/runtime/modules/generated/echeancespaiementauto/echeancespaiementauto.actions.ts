import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const echeancespaiementautoActions: ERPModuleAction[] = [
  {
    key: "Marquer payee",
    label: "Marquer payée",
    type: "primary",
    permission: "echeancespaiementauto.workflow",
  },
  {
    key: "Relancer",
    label: "Relancer le client",
    type: "secondary",
    permission: "echeancespaiementauto.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "echeancespaiementauto.workflow",
  },
];
