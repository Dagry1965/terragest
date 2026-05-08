$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== CONNECT ALL ERP MODULES ===" -ForegroundColor Cyan

$modules = @(
  "exploitations",
  "materiels",
  "terrains",
  "stocks",
  "produits",
  "interventions",
  "maintenance",
  "contrats",
  "paiements"
)

$actions = @(
  "workflows",
  "audit",
  "relations",
  "import",
  "export"
)

foreach ($module in $modules) {

  WriteFile "src\app\(private)\$module\page.tsx" @"
import { GenericListPage } from "@/components/erp/generic/GenericListPage";

export default function Page() {
  return <GenericListPage moduleKey="$module" />;
}
"@

  WriteFile "src\app\(private)\$module\nouveau\page.tsx" @"
import { GenericCreatePage } from "@/components/erp/generic/GenericCreatePage";

export default function Page() {
  return <GenericCreatePage moduleKey="$module" />;
}
"@

  WriteFile "src\app\(private)\$module\[id]\page.tsx" @"
import { GenericDetailPage } from "@/components/erp/generic/GenericDetailPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <GenericDetailPage
      moduleKey="$module"
      id={id}
    />
  );
}
"@

  WriteFile "src\app\(private)\$module\[id]\edit\page.tsx" @"
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <GenericEditPage
      moduleKey="$module"
      id={id}
    />
  );
}
"@

  foreach ($action in $actions) {
    WriteFile "src\app\(private)\$module\$action\page.tsx" @"
import { coreERPModules } from "@/runtime/modules";
import { ERPModuleActionPageTemplate } from "@/components/erp/templates";

export default function Page() {
  const runtimeModule = coreERPModules.find(
    (module) => module.metadata.key === "$module"
  );

  if (!runtimeModule) {
    return null;
  }

  return (
    <ERPModuleActionPageTemplate
      module={runtimeModule}
      type="$action"
    />
  );
}
"@
  }
}

WriteFile "src\runtime\modules\definitions\coreModules.ts" @'
import type { ERPModule } from "../ERPModule";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "exploitations",
      label: "Exploitations",
      description: "Gestion des exploitations agricoles et operationnelles.",
      icon: "building-2",
      category: "Metier",
      enabled: true,
      visible: true,
      order: 10,
      routes: {
        list: "/exploitations",
        create: "/exploitations/nouveau",
        details: "/exploitations",
        edit: "/exploitations",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "exploitations",
      collection: "exploitations",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Exploitation", type: "text", required: true, searchable: true, sortable: true },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "materiels",
      label: "Materiels",
      description: "Gestion du parc materiel, etats, pannes et maintenance.",
      icon: "tractor",
      category: "Operations",
      enabled: true,
      visible: true,
      order: 20,
      routes: {
        list: "/materiels",
        create: "/materiels/nouveau",
        details: "/materiels",
        edit: "/materiels",
      },
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
      module: "materiels",
      collection: "materiels",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Materiel", type: "text", required: true, searchable: true, sortable: true },
        { key: "type", label: "Type", type: "select", filterable: true },
        { key: "etat", label: "Etat", type: "status", filterable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Gestion des terrains, surfaces et affectations.",
      icon: "map",
      category: "Metier",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/terrains",
        create: "/terrains/nouveau",
        details: "/terrains",
        edit: "/terrains",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "terrains",
      collection: "terrains",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Terrain", type: "text", required: true, searchable: true, sortable: true },
        { key: "surface", label: "Surface", type: "number", sortable: true },
        { key: "localisation", label: "Localisation", type: "text", searchable: true },
        { key: "exploitationId", label: "Exploitation", type: "relation", relation: "exploitations" },
      ],
    },
  },
  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, mouvements et niveaux d'alerte.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 40,
      routes: {
        list: "/stocks",
        create: "/stocks/nouveau",
        details: "/stocks",
        edit: "/stocks",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "stocks",
      collection: "stocks",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produit", label: "Produit", type: "text", required: true, searchable: true },
        { key: "quantite", label: "Quantite", type: "number", sortable: true },
        { key: "seuil", label: "Seuil alerte", type: "number" },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "Catalogue des produits agricoles, animaux, intrants et marchandises.",
      icon: "package",
      category: "Referentiel",
      enabled: true,
      visible: true,
      order: 50,
      routes: {
        list: "/produits",
        create: "/produits/nouveau",
        details: "/produits",
        edit: "/produits",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "Categorie", type: "select", filterable: true },
        { key: "unite", label: "Unite", type: "text" },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "interventions",
      label: "Interventions",
      description: "Suivi des interventions, affectations, controles et clotures.",
      icon: "wrench",
      category: "Operations",
      enabled: true,
      visible: true,
      order: 60,
      routes: {
        list: "/interventions",
        create: "/interventions/nouveau",
        details: "/interventions",
        edit: "/interventions",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "interventions",
      collection: "interventions",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Intervention", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "Materiel", type: "relation", relation: "materiels" },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "maintenance",
      label: "Maintenance",
      description: "Pilotage de la maintenance preventive, corrective et critique.",
      icon: "settings",
      category: "Operations",
      enabled: true,
      visible: true,
      order: 70,
      routes: {
        list: "/maintenance",
        create: "/maintenance/nouveau",
        details: "/maintenance",
        edit: "/maintenance",
      },
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
      module: "maintenance",
      collection: "maintenance",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Maintenance", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "Materiel", type: "relation", relation: "materiels" },
        { key: "priorite", label: "Priorite", type: "select", filterable: true },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "contrats",
      label: "Contrats",
      description: "Gestion des contrats, periodes, partenaires et echeances.",
      icon: "file-text",
      category: "Finance",
      enabled: true,
      visible: true,
      order: 80,
      routes: {
        list: "/contrats",
        create: "/contrats/nouveau",
        details: "/contrats",
        edit: "/contrats",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "contrats",
      collection: "contrats",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "reference", label: "Reference", type: "text", required: true, searchable: true, sortable: true },
        { key: "partenaire", label: "Partenaire", type: "text", searchable: true },
        { key: "montant", label: "Montant", type: "number", sortable: true },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
  {
    metadata: {
      key: "paiements",
      label: "Paiements",
      description: "Suivi des paiements, validations, montants et statuts financiers.",
      icon: "credit-card",
      category: "Finance",
      enabled: true,
      visible: true,
      order: 90,
      routes: {
        list: "/paiements",
        create: "/paiements/nouveau",
        details: "/paiements",
        edit: "/paiements",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "paiements",
      collection: "paiements",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "reference", label: "Reference", type: "text", required: true, searchable: true, sortable: true },
        { key: "beneficiaire", label: "Beneficiaire", type: "text", searchable: true },
        { key: "montant", label: "Montant", type: "number", sortable: true },
        { key: "statut", label: "Etat", type: "status", filterable: true },
      ],
    },
  },
];
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts" @'
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
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeRules.ts" @'
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
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== CONNECT ALL ERP MODULES TERMINE ===" -ForegroundColor Green