const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(relativePath, content) {
  const file = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("WRITTEN", relativePath);
}

function patchCoreModules() {
  const file = path.join(
    ROOT,
    "src/runtime/modules/definitions/coreModules.ts"
  );

  if (!fs.existsSync(file)) {
    throw new Error("coreModules.ts introuvable");
  }

  let content = fs.readFileSync(file, "utf8");

  if (!content.includes("encaissementsautoModule")) {
    content = content.replace(
      `import { facturesautoModule } from "@/runtime/modules/generated/facturesauto";`,
      `import { encaissementsautoModule } from "@/runtime/modules/generated/encaissementsauto";
import { facturesautoModule } from "@/runtime/modules/generated/facturesauto";`
    );

    content = content.replace(
      `  facturesautoModule,`,
      `  encaissementsautoModule,
  facturesautoModule,`
    );

    content = content.replace(
      `  facturesautoModule,
  produitsautoModule,`,
      `  encaissementsautoModule,
  facturesautoModule,
  produitsautoModule,`
    );
  }

  fs.writeFileSync(file, content, "utf8");
  console.log("UPDATED src/runtime/modules/definitions/coreModules.ts");
}

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.actions.ts",
`import type {
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
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
`import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  encaissementsautoActions,
} from "./encaissementsauto.actions";

export const encaissementsautoModule: ERPModule = {
  metadata: {
    key: "encaissementsauto",
    label: "Encaissements",
    description:
      "Suivi des paiements clients, paiements partiels et encaissements AMARKHYS.",
    icon: "wallet",
    category: "amarkhys",

    features: {
      dashboard: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
      observability: true,
      audit: true,
      realtime: true,
    },
  },

  schema: {
    collection: "encaissementsauto",

    fields: [
      {
        key: "factureId",
        label: "Facture",
        type: "relation",
        relation: {
          module: "facturesauto",
        },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "clientId",
        label: "Client",
        type: "relation",
        relation: {
          module: "clientsauto",
        },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "vehiculeId",
        label: "Véhicule",
        type: "relation",
        relation: {
          module: "vehicules",
        },
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "montant",
        label: "Montant encaissé",
        type: "number",
        required: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "datePaiement",
        label: "Date paiement",
        type: "date",
        required: true,
        list: { order: 4 },
        grid: { cols: 6 },
      },
      {
        key: "modePaiement",
        label: "Mode paiement",
        type: "select",
        defaultValue: "mobile_money",
        options: [
          { label: "Espèces", value: "especes" },
          { label: "Mobile Money", value: "mobile_money" },
          { label: "Carte", value: "carte" },
          { label: "Virement", value: "virement" },
          { label: "Chèque", value: "cheque" },
          { label: "Autre", value: "autre" },
        ],
        list: { order: 5 },
        grid: { cols: 6 },
      },
      {
        key: "referenceTransaction",
        label: "Référence transaction",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "valide",
        options: [
          { label: "En attente", value: "en_attente" },
          { label: "Validé", value: "valide" },
          { label: "Rejeté", value: "rejete" },
          { label: "Annulé", value: "annule" },
        ],
        list: { order: 6 },
        grid: { cols: 6 },
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "paiement",
        label: "Paiement",
        fields: [
          "factureId",
          "montant",
          "datePaiement",
          "modePaiement",
          "referenceTransaction",
          "statut",
        ],
        sections: [
          {
            key: "infos",
            title: "Informations paiement",
            fields: [
              "factureId",
              "montant",
              "datePaiement",
              "modePaiement",
              "referenceTransaction",
              "statut",
            ],
          },
        ],
      },
      {
        key: "relations",
        label: "Relations",
        fields: [
          "clientId",
          "vehiculeId",
        ],
        sections: [
          {
            key: "liens",
            title: "Relations métier",
            fields: [
              "clientId",
              "vehiculeId",
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        fields: [
          "notes",
        ],
        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "notes",
            ],
          },
        ],
      },
    ],
  },

  actions: encaissementsautoActions,

  workflows: [
    {
      key: "encaissement",
      label: "Cycle encaissement",
      initialState: "en_attente",

      states: [
        {
          key: "en_attente",
          label: "En attente",
          color: "warning",
        },
        {
          key: "valide",
          label: "Validé",
          color: "success",
        },
        {
          key: "rejete",
          label: "Rejeté",
          color: "danger",
        },
        {
          key: "annule",
          label: "Annulé",
          color: "default",
        },
      ],

      transitions: [
        {
          from: "en_attente",
          to: "valide",
          action: "Valider",
        },
        {
          from: "en_attente",
          to: "rejete",
          action: "Rejeter",
        },
        {
          from: "en_attente",
          to: "annule",
          action: "Annuler",
        },
      ],
    },
  ],
};
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.workflows.ts",
`export const encaissementsautoWorkflows = [];
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.permissions.ts",
`export const encaissementsautoPermissions = {
  read: "encaissementsauto.read",
  create: "encaissementsauto.create",
  update: "encaissementsauto.update",
  delete: "encaissementsauto.delete",
  workflow: "encaissementsauto.workflow",
};
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.automation.ts",
`export const encaissementsautoAutomation = [];
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.dashboard.ts",
`export const encaissementsautoDashboard = {};
`
);

write(
  "src/runtime/modules/generated/encaissementsauto/index.ts",
`export * from "./encaissementsauto.module";
export * from "./encaissementsauto.actions";
export * from "./encaissementsauto.workflows";
export * from "./encaissementsauto.permissions";
export * from "./encaissementsauto.automation";
export * from "./encaissementsauto.dashboard";
`
);

patchCoreModules();

console.log("");
console.log("Module encaissementsauto installé.");
console.log("Done.");