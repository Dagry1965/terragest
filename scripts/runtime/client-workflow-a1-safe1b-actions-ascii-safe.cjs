const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts";
const fullPath = path.join(root, file);

const content = `export const clientsautoActions = [
  {
    key: "clientsauto.activer",
    label: "Activer client",
    action: "Activer",
    intent: "activate",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["prospect", "inactif", "archive"],
    },
    set: {
      statut: "actif",
    },
    feedback: {
      successTitle: "Client activ\\u00e9",
      successMessage: "Le client est maintenant actif.",
      blockedTitle: "Activation impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre activ\\u00e9 dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.suspendre",
    label: "Suspendre client",
    action: "Suspendre",
    intent: "suspend",
    type: "workflow",
    runtimeOnly: true,
    variant: "secondary",
    tone: "warning",
    visibleWhen: {
      field: "statut",
      in: ["actif"],
    },
    set: {
      statut: "suspendu",
    },
    feedback: {
      successTitle: "Client suspendu",
      successMessage: "Le client est suspendu.",
      blockedTitle: "Suspension impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre suspendu dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.desactiver",
    label: "D\\u00e9sactiver client",
    action: "D\\u00e9sactiver",
    intent: "deactivate",
    type: "workflow",
    runtimeOnly: true,
    variant: "secondary",
    tone: "warning",
    visibleWhen: {
      field: "statut",
      in: ["actif", "prospect", "suspendu"],
    },
    set: {
      statut: "inactif",
    },
    feedback: {
      successTitle: "Client d\\u00e9sactiv\\u00e9",
      successMessage: "Le client est maintenant inactif.",
      blockedTitle: "D\\u00e9sactivation impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre d\\u00e9sactiv\\u00e9 dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.reactiver",
    label: "R\\u00e9activer client",
    action: "R\\u00e9activer",
    intent: "reactivate",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["suspendu", "inactif"],
    },
    set: {
      statut: "actif",
    },
    feedback: {
      successTitle: "Client r\\u00e9activ\\u00e9",
      successMessage: "Le client peut \\u00e0 nouveau \\u00eatre utilis\\u00e9.",
      blockedTitle: "R\\u00e9activation impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre r\\u00e9activ\\u00e9 dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.archiver",
    label: "Archiver client",
    action: "Archiver",
    intent: "archive",
    type: "workflow",
    runtimeOnly: true,
    variant: "danger",
    tone: "danger",
    confirm: true,
    confirmation: "Archiver ce client ? Les donn\\u00e9es li\\u00e9es resteront consultables.",
    visibleWhen: {
      field: "statut",
      in: ["prospect", "actif", "suspendu", "inactif"],
    },
    set: {
      statut: "archive",
    },
    feedback: {
      successTitle: "Client archiv\\u00e9",
      successMessage: "Le client est archiv\\u00e9.",
      blockedTitle: "Archivage impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre archiv\\u00e9 dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.restaurer",
    label: "Restaurer client",
    action: "Restaurer",
    intent: "restore",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["archive"],
    },
    set: {
      statut: "actif",
    },
    feedback: {
      successTitle: "Client restaur\\u00e9",
      successMessage: "Le client est restaur\\u00e9 et redevient actif.",
      blockedTitle: "Restauration impossible",
      blockedMessage: "Le client ne peut pas \\u00eatre restaur\\u00e9 dans son \\u00e9tat actuel.",
    },
  },
  {
    key: "clientsauto.ajouter-vehicule",
    label: "Ajouter v\\u00e9hicule",
    action: "Ajouter v\\u00e9hicule",
    intent: "create-child",
    type: "navigation",
    variant: "secondary",
    href: "/vehicules/nouveau",
    targetModuleKey: "vehicules",
    parentModuleKey: "clientsauto",
    parentForeignKey: "clientId",
    preserveParentContext: true,
    governance: {
      hiddenWhen: [
        { field: "statut", equals: "archive" },
      ],
      disabledWhen: [
        { field: "statut", equals: "suspendu" },
      ],
      disabledReason: "Client suspendu : r\\u00e9activer le client avant d'ajouter un v\\u00e9hicule.",
    },
  },
  {
    key: "clientsauto.ouvrir-fiche-operationnelle",
    label: "Ouvrir fiche op\\u00e9rationnelle",
    action: "Ouvrir fiche op\\u00e9rationnelle",
    intent: "open-operational-hub",
    type: "navigation",
    variant: "secondary",
    href: "/clientsauto/hub",
    targetModuleKey: "clientsauto",
    preserveRecordContext: true,
  },
] as any[];
`;

fs.writeFileSync(fullPath, content, "utf8");
console.log("[UPDATED]", file);
console.log("[CLIENT-WORKFLOW-A1-SAFE-1B] Done");