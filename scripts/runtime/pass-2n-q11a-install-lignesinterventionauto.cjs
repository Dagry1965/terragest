const fs = require("fs");
const path = require("path");

const root = process.cwd();

function writeFile(filePath, content) {
  const target = path.join(root, filePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, "utf8");
  console.log("WRITTEN", filePath);
}

function patch(filePath, updater) {
  const target = path.join(root, filePath);

  if (!fs.existsSync(target)) {
    console.error("MISSING", filePath);
    process.exit(1);
  }

  const before = fs.readFileSync(target, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(target, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

/**
 * PASS 2N-Q11A
 * Module lignesinterventionauto.
 *
 * Scope strict :
 * - module runtime uniquement
 * - routes CRUD génériques
 * - coreModules registration
 * - pas de cockpit
 * - pas de sidebar
 */

const moduleDir = "src/runtime/modules/generated/lignesinterventionauto";

writeFile(`${moduleDir}/lignesinterventionauto.module.ts`, `import type { ERPModule } from "@/runtime/modules/ERPModule";

export const lignesinterventionautoModule: ERPModule = {
  metadata: {
    key: "lignesinterventionauto",
    label: "Lignes intervention",
    description: "Pièces, services et main d’œuvre consommés sur une intervention AMARKHYS",
    icon: "list-checks",
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
    collection: "lignesinterventionauto",

    fields: [
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: { module: "interventionsauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: { module: "produitsauto" },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: { module: "stocksauto" },
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "designation",
        label: "Désignation",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "typeLigne",
        label: "Type ligne",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        defaultValue: 1,
        required: true,
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "prixUnitaire",
        label: "Prix unitaire",
        type: "number",
        defaultValue: 0,
        required: true,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "montantTotal",
        label: "Montant total",
        type: "number",
        computed: {
          formula: "quantite * prixUnitaire",
          dependsOn: ["quantite", "prixUnitaire"],
        },
        list: { order: 7 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { order: 8 },
        grid: { cols: 4 },
      },
      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "ligne",
        label: "Ligne",

        fields: [
          "interventionId",
          "designation",
          "typeLigne",
          "produitId",
          "stockId",
          "quantite",
          "prixUnitaire",
          "montantTotal",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations ligne",
            fields: [
              "interventionId",
              "designation",
              "typeLigne",
              "statut",
            ],
          },
          {
            key: "relations",
            title: "Produit et stock",
            fields: [
              "produitId",
              "stockId",
            ],
          },
          {
            key: "montants",
            title: "Quantité et montant",
            fields: [
              "quantite",
              "prixUnitaire",
              "montantTotal",
            ],
          },
        ],
      },

      {
        key: "notes",
        label: "Notes",

        fields: [
          "observations",
        ],

        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "ligne-intervention",
      label: "Cycle ligne intervention",
      initialState: "brouillon",

      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
        { key: "facturee", label: "Facturée", color: "info" },
        { key: "annulee", label: "Annulée", color: "danger" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
        { from: "validee", to: "facturee", action: "Marquer facturée" },
        { from: "brouillon", to: "annulee", action: "Annuler" },
        { from: "validee", to: "annulee", action: "Annuler" },
      ],
    },
  ],
};
`);

writeFile(`${moduleDir}/index.ts`, `export * from "./lignesinterventionauto.module";
export * from "./lignesinterventionauto.actions";
export * from "./lignesinterventionauto.workflows";
export * from "./lignesinterventionauto.permissions";
export * from "./lignesinterventionauto.automation";
export * from "./lignesinterventionauto.dashboard";
`);

writeFile(`${moduleDir}/lignesinterventionauto.actions.ts`, `export const lignesinterventionautoActions = [];
`);

writeFile(`${moduleDir}/lignesinterventionauto.workflows.ts`, `export const lignesinterventionautoWorkflows = [];
`);

writeFile(`${moduleDir}/lignesinterventionauto.permissions.ts`, `export const lignesinterventionautoPermissions = [];
`);

writeFile(`${moduleDir}/lignesinterventionauto.automation.ts`, `export const lignesinterventionautoAutomation = [];
`);

writeFile(`${moduleDir}/lignesinterventionauto.dashboard.ts`, `export const lignesinterventionautoDashboard = {};
`);

/**
 * Register in coreModules.
 */
patch("src/runtime/modules/definitions/coreModules.ts", (content) => {
  let next = content;

  if (!next.includes(`lignesinterventionautoModule`)) {
    next = next.replace(
      `import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto";`,
      `import { interventionsautoModule } from "@/runtime/modules/generated/interventionsauto";
import { lignesinterventionautoModule } from "@/runtime/modules/generated/lignesinterventionauto";`
    );

    next = next.replace(
      `  interventionsautoModule,
  rendezvousModule,`,
      `  interventionsautoModule,
  lignesinterventionautoModule,
  rendezvousModule,`
    );

    next = next.replace(
      `  facturesautoModule,
  produitsautoModule,`,
      `  facturesautoModule,
  lignesinterventionautoModule,
  produitsautoModule,`
    );
  }

  next = next.replaceAll(
    `  lignesinterventionautoModule,
  lignesinterventionautoModule,`,
    `  lignesinterventionautoModule,`
  );

  return next;
});

/**
 * CRUD routes.
 */
const routeRoot = "src/app/(private)/lignesinterventionauto";

writeFile(`${routeRoot}/page.tsx`, `import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export const dynamic = "force-dynamic";

export default function LignesinterventionautoPage() {
  return <GenericListPage moduleKey="lignesinterventionauto" />;
}
`);

writeFile(`${routeRoot}/nouveau/page.tsx`, `import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export const dynamic = "force-dynamic";

export default function CreateLignesinterventionautoPage() {
  return <GenericCreatePage moduleKey="lignesinterventionauto" />;
}
`);

writeFile(`${routeRoot}/[id]/page.tsx`, `import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function LignesinterventionautoDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <GenericDetailPage moduleKey="lignesinterventionauto" id={id} />;
}
`);

writeFile(`${routeRoot}/[id]/edit/page.tsx`, `import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditLignesinterventionautoPage({
  params,
}: PageProps) {
  const { id } = await params;

  return <GenericEditPage moduleKey="lignesinterventionauto" id={id} />;
}
`);

console.log("PASS 2N-Q11A OK: lignesinterventionauto module installed.");