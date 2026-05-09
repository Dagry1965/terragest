$Path = "src\runtime\modules\definitions\coreModules.ts"

$Content = @'
import type { ERPModule } from "../ERPModule";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "Référentiel central des produits agricoles, animaux, piscicoles et immobiliers.",
      icon: "package",
      category: "Référentiel",
      enabled: true,
      visible: true,
      order: 10,
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
        automation: true,
        notifications: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "Catégorie", type: "select", required: true, filterable: true, options: ["agricole", "animal", "piscicole", "immobilier"] },
        { key: "type", label: "Type", type: "select", required: true, filterable: true, options: ["igname", "manioc", "arachide", "mais", "viande", "oeufs", "lait", "tilapia", "silure", "maison", "appartement"] },
        { key: "modeStock", label: "Gestion de stock", type: "select", required: true, filterable: true, options: ["stockable", "non_stockable"] },
        { key: "unite", label: "Unité", type: "text" },
        { key: "seuilMinimum", label: "Seuil minimum", type: "number", sortable: true },
        { key: "prixAchat", label: "Prix achat", type: "number", sortable: true },
        { key: "prixVente", label: "Prix vente", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "Créer", type: "primary", href: "/produits/nouveau", event: "PRODUIT_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "PRODUIT_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "PRODUIT_ARCHIVED" },
    ],
    relations: [
      { key: "stocks", label: "Stocks liés", targetModule: "stocks", type: "one-to-many" },
      { key: "mouvements", label: "Mouvements de stock", targetModule: "mouvements", type: "one-to-many" },
      { key: "maintenance", label: "Maintenance", targetModule: "maintenance", type: "one-to-many" },
      { key: "interventions", label: "Interventions", targetModule: "interventions", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-produit",
        label: "Création produit",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  },

  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, niveaux, seuils et valorisation.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 20,
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
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "quantite", label: "Quantité", type: "number", required: true, sortable: true },
        { key: "unite", label: "Unité", type: "text" },
        { key: "seuilAlerte", label: "Seuil alerte", type: "number", sortable: true },
        { key: "emplacement", label: "Emplacement", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "mouvements",
      label: "Mouvements",
      description: "Entrées, sorties, corrections et transferts de stock.",
      icon: "repeat",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/mouvements",
        create: "/mouvements/nouveau",
        details: "/mouvements",
        edit: "/mouvements",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
      },
    },
    schema: {
      module: "mouvements",
      collection: "mouvements",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "stockId", label: "Stock", type: "relation", relation: "stocks", required: true },
        { key: "type", label: "Type mouvement", type: "select", required: true, filterable: true, options: ["entree", "sortie", "transfert", "correction"] },
        { key: "quantite", label: "Quantité", type: "number", required: true, sortable: true },
        { key: "motif", label: "Motif", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "maintenance",
      label: "Maintenance",
      description: "Maintenance préventive, corrective et critique.",
      icon: "settings",
      category: "Opérations",
      enabled: true,
      visible: true,
      order: 40,
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
        { key: "materielId", label: "Matériel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit consommé", type: "relation", relation: "produits" },
        { key: "priorite", label: "Priorité", type: "select", filterable: true, options: ["basse", "normale", "haute", "critique"] },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "interventions",
      label: "Interventions",
      description: "Suivi des interventions terrain, affectations et clôtures.",
      icon: "wrench",
      category: "Opérations",
      enabled: true,
      visible: true,
      order: 50,
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
        { key: "materielId", label: "Matériel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit utilisé", type: "relation", relation: "produits" },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },
];
'@

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Resolve-Path $Path), $Content, $Utf8NoBom)

Write-Host "coreModules.ts remplacé avec succès en UTF-8."