import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";

export const automationRuntimeRules: AutomationRuntimeRule[] = [
  {
    key: "stock-critical-threshold",
    moduleKey: "stocks",
    label: "Alerte stock critique",
    description: "Declenche une alerte lorsque le stock passe sous le seuil.",
    enabled: true,
    trigger: { type: "threshold", field: "quantite", operator: "<", value: 10 },
    actions: [
      { type: "alert", label: "Creer alerte stock" },
      { type: "notify", label: "Notifier superviseur" },
      { type: "workflow", label: "Declencher workflow reapprovisionnement" },
    ],
  },
  {
    key: "materiel-maintenance-overdue",
    moduleKey: "materiels",
    label: "Maintenance materiel en retard",
    description: "Cree une priorite lorsque la maintenance est depassee.",
    enabled: true,
    trigger: { type: "maintenance_overdue" },
    actions: [
      { type: "alert", label: "Creer incident maintenance" },
      { type: "task", label: "Creer tache intervention" },
      { type: "notify", label: "Notifier responsable" },
    ],
  },
  {
    key: "workflow-blocked-escalation",
    moduleKey: "exploitations",
    label: "Relance workflow bloque",
    description: "Relance automatiquement les workflows bloques.",
    enabled: true,
    trigger: { type: "workflow_blocked" },
    actions: [
      { type: "notify", label: "Notifier valideur" },
      { type: "audit", label: "Tracer relance automatique" },
    ],
  },
  {
    key: "terrain-control-reminder",
    moduleKey: "terrains",
    label: "Controle terrain recommande",
    description: "Cree un rappel lorsqu'un terrain necessite un controle.",
    enabled: true,
    trigger: { type: "event" },
    actions: [
      { type: "task", label: "Creer tache controle terrain" },
      { type: "notify", label: "Notifier responsable terrain" },
    ],
  },
  {
    key: "produit-reference-check",
    moduleKey: "produits",
    label: "Verification referentiel produit",
    description: "Declenche une verification lorsqu'un produit est cree ou modifie.",
    enabled: true,
    trigger: { type: "event" },
    actions: [
      { type: "audit", label: "Tracer modification produit" },
      { type: "task", label: "Verifier referentiel" },
    ],
  },
  {
    key: "intervention-delay-alert",
    moduleKey: "interventions",
    label: "Alerte retard intervention",
    description: "Alerte lorsqu'une intervention reste ouverte trop longtemps.",
    enabled: true,
    trigger: { type: "workflow_blocked" },
    actions: [
      { type: "alert", label: "Creer alerte intervention" },
      { type: "notify", label: "Notifier superviseur" },
    ],
  },
  {
    key: "maintenance-critical-alert",
    moduleKey: "maintenance",
    label: "Maintenance critique",
    description: "Declenche un incident lorsqu'une maintenance devient critique.",
    enabled: true,
    trigger: { type: "maintenance_overdue" },
    actions: [
      { type: "alert", label: "Creer incident critique" },
      { type: "workflow", label: "Lancer workflow maintenance" },
    ],
  },
  {
    key: "contrat-expiry-warning",
    moduleKey: "contrats",
    label: "Echeance contrat",
    description: "Alerte avant echeance ou renouvellement de contrat.",
    enabled: true,
    trigger: { type: "event" },
    actions: [
      { type: "notify", label: "Notifier gestionnaire contrat" },
      { type: "task", label: "Preparer renouvellement" },
    ],
  },
  {
    key: "paiement-validation-reminder",
    moduleKey: "paiements",
    label: "Relance validation paiement",
    description: "Relance les paiements en attente de validation.",
    enabled: true,
    trigger: { type: "workflow_blocked" },
    actions: [
      { type: "notify", label: "Notifier valideur paiement" },
      { type: "audit", label: "Tracer relance paiement" },
    ],
  },
];