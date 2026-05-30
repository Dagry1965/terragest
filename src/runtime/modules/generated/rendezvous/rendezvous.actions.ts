import type {
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export const rendezvousActions: ERPModuleAction[] = [
{
    key: "reporter-rdv",
    label: "Reporter RDV",
    type: "secondary",
    runtimeOnly: true,
  },
  {
    key: "Confirmer",
    label: "Confirmer le RDV",
    type: "primary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Démarrer",
    label: "Démarrer le RDV",
    type: "secondary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Terminer",
    label: "Terminer le RDV",
    type: "secondary",
    permission: "rendezvous.workflow",
  },
  {
    key: "Annuler",
    label: "Annuler",
    type: "danger",
    permission: "rendezvous.workflow",
  },
];
