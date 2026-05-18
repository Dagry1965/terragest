import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const facturesautoActions: ERPModuleAction[] = [
  {
    key: "Valider",
    label: "Valider la facture",
    type: "primary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Marquer payée",
    label: "Marquer payée",
    type: "primary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Enregistrer paiement",
    label: "Enregistrer un paiement",
    type: "primary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Marquer envoyee",
    label: "Marquer comme envoyée",
    type: "secondary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Relancer",
    label: "Relancer le client",
    type: "secondary",
    permission: "facturesauto.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "facturesauto.workflow",
  },
];