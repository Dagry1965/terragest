import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";

export const workflowRuntimeDefinitions: WorkflowRuntimeDefinition[] = [
  {
    key: "materiel-maintenance",
    moduleKey: "materiels",
    label: "Workflow maintenance materiel",
    initialStep: "available",
    steps: [
      { key: "available", label: "Disponible" },
      { key: "maintenance", label: "Maintenance" },
      { key: "validation", label: "Validation" },
      { key: "repair", label: "Reparation" },
      { key: "service", label: "Retour service" },
    ],
    transitions: [
      { from: "available", to: "maintenance", label: "Declencher maintenance" },
      { from: "maintenance", to: "validation", label: "Demander validation", requiresValidation: true },
      { from: "validation", to: "repair", label: "Valider reparation" },
      { from: "repair", to: "service", label: "Retour en service" },
    ],
  },
  {
    key: "exploitation-control",
    moduleKey: "exploitations",
    label: "Controle exploitation",
    initialStep: "created",
    steps: [
      { key: "created", label: "Creee" },
      { key: "review", label: "Analyse" },
      { key: "approved", label: "Validee" },
      { key: "active", label: "Active" },
    ],
    transitions: [
      { from: "created", to: "review", label: "Lancer analyse" },
      { from: "review", to: "approved", label: "Valider", requiresValidation: true },
      { from: "approved", to: "active", label: "Activer" },
    ],
  },
  {
    key: "generic-validation",
    moduleKey: "terrains",
    label: "Validation terrain",
    initialStep: "draft",
    steps: [
      { key: "draft", label: "Brouillon" },
      { key: "review", label: "Controle" },
      { key: "approved", label: "Valide" },
    ],
    transitions: [
      { from: "draft", to: "review", label: "Soumettre" },
      { from: "review", to: "approved", label: "Valider", requiresValidation: true },
    ],
  },
  {
    key: "stock-alert",
    moduleKey: "stocks",
    label: "Workflow alerte stock",
    initialStep: "normal",
    steps: [
      { key: "normal", label: "Normal" },
      { key: "alert", label: "Alerte" },
      { key: "order", label: "Reapprovisionnement" },
      { key: "resolved", label: "Resolue" },
    ],
    transitions: [
      { from: "normal", to: "alert", label: "Detecter alerte" },
      { from: "alert", to: "order", label: "Creer commande" },
      { from: "order", to: "resolved", label: "Cloturer" },
    ],
  },
  {
    key: "produit-validation",
    moduleKey: "produits",
    label: "Validation produit",
    initialStep: "draft",
    steps: [
      { key: "draft", label: "Brouillon" },
      { key: "review", label: "Verification" },
      { key: "active", label: "Actif" },
    ],
    transitions: [
      { from: "draft", to: "review", label: "Verifier" },
      { from: "review", to: "active", label: "Activer", requiresValidation: true },
    ],
  },
  {
    key: "intervention-lifecycle",
    moduleKey: "interventions",
    label: "Cycle intervention",
    initialStep: "created",
    steps: [
      { key: "created", label: "Creee" },
      { key: "assigned", label: "Affectee" },
      { key: "running", label: "En cours" },
      { key: "control", label: "Controle" },
      { key: "done", label: "Terminee" },
    ],
    transitions: [
      { from: "created", to: "assigned", label: "Affecter" },
      { from: "assigned", to: "running", label: "Demarrer" },
      { from: "running", to: "control", label: "Controler" },
      { from: "control", to: "done", label: "Cloturer", requiresValidation: true },
    ],
  },
  {
    key: "maintenance-lifecycle",
    moduleKey: "maintenance",
    label: "Cycle maintenance",
    initialStep: "planned",
    steps: [
      { key: "planned", label: "Planifiee" },
      { key: "running", label: "En cours" },
      { key: "validation", label: "Validation" },
      { key: "closed", label: "Cloturee" },
    ],
    transitions: [
      { from: "planned", to: "running", label: "Demarrer" },
      { from: "running", to: "validation", label: "Demander validation" },
      { from: "validation", to: "closed", label: "Cloturer", requiresValidation: true },
    ],
  },
  {
    key: "contrat-validation",
    moduleKey: "contrats",
    label: "Validation contrat",
    initialStep: "draft",
    steps: [
      { key: "draft", label: "Brouillon" },
      { key: "review", label: "Revue" },
      { key: "approved", label: "Approuve" },
      { key: "active", label: "Actif" },
    ],
    transitions: [
      { from: "draft", to: "review", label: "Soumettre" },
      { from: "review", to: "approved", label: "Approuver", requiresValidation: true },
      { from: "approved", to: "active", label: "Activer" },
    ],
  },
  {
    key: "paiement-validation",
    moduleKey: "paiements",
    label: "Validation paiement",
    initialStep: "draft",
    steps: [
      { key: "draft", label: "Brouillon" },
      { key: "validation", label: "Validation" },
      { key: "authorized", label: "Autorise" },
      { key: "paid", label: "Paye" },
    ],
    transitions: [
      { from: "draft", to: "validation", label: "Soumettre" },
      { from: "validation", to: "authorized", label: "Autoriser", requiresValidation: true },
      { from: "authorized", to: "paid", label: "Marquer paye" },
    ],
  },
];