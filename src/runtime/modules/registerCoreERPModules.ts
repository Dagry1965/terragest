import { ERPModuleRegistry } from "./ERPModuleRegistry";

export function registerCoreERPModules() {
  ERPModuleRegistry.register({
    key: "materiels",
    label: "MatÃƒÂ©riels",
    description: "Gestion du parc matÃƒÂ©riel.",
    collection: "materiels",
    routes: {
      list: "/materiels",
      create: "/materiels/nouveau",
      detail: "/materiels/[id]",
      edit: "/materiels/[id]/edit",
    },
    fields: [
      { name: "nom", label: "Nom", type: "text", required: true },
      { name: "type", label: "Type", type: "text" },
      {
        name: "statut",
        label: "Statut",
        type: "status",
        options: ["actif", "maintenance", "panne"],
      },
      { name: "cout", label: "CoÃƒÂ»t", type: "currency" },
    ],
    actions: [
      {
        name: "create",
        label: "CrÃƒÂ©er",
        type: "create",
        event: "MATERIEL_CREATED",
      },
      {
        name: "update",
        label: "Modifier",
        type: "update",
        event: "MATERIEL_UPDATED",
      },
    ],
    workflows: ["CreateMaintenanceWorkflow"],
    events: ["MATERIEL_CREATED", "MATERIEL_UPDATED"],
    rules: ["MaterielCriticalRule"],
    automations: ["MaterielMaintenanceAutomation"],
    auditEnabled: true,
    supervisionEnabled: true,
    observabilityEnabled: true,
    realtimeEnabled: true,
  });

  ERPModuleRegistry.register({
    key: "exploitations",
    label: "Exploitations",
    description: "Gestion des exploitations.",
    collection: "exploitations",
    routes: {
      list: "/exploitations",
      create: "/exploitations/nouveau",
      detail: "/exploitations/[id]",
      edit: "/exploitations/[id]/edit",
    },
    fields: [
      { name: "nom", label: "Nom", type: "text", required: true },
      {
        name: "type",
        label: "Type",
        type: "select",
        options: ["agricole", "animale", "piscicole", "immobiliere"],
      },
      {
        name: "statut",
        label: "Statut",
        type: "status",
        options: ["active", "inactive", "surveillance"],
      },
    ],
    actions: [
      {
        name: "create",
        label: "CrÃƒÂ©er",
        type: "create",
        event: "EXPLOITATION_CREATED",
      },
      {
        name: "update",
        label: "Modifier",
        type: "update",
        event: "EXPLOITATION_UPDATED",
      },
    ],
    auditEnabled: true,
    supervisionEnabled: true,
    observabilityEnabled: true,
    realtimeEnabled: true,
  });
}