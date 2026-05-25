import type { ERPModule } from "@/runtime/modules/ERPModule";

export const produitsautoModule: ERPModule = {
  metadata: {
    key: "produitsauto",
    label: "Produits",
    description: "Produits, pièces et consommables AMARKHYS",
    icon: "package",
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
    collection: "produitsauto",

    fields: [
{
        key: "reference",
        label: "Référence",
        type: "text",
        required: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 },
      },
{
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 4 },
      },
{
        key: "marque",
        label: "Marque",
        type: "text",
        defaultValue: "PETRONAS",
        searchable: true,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "typeRecord",
        label: "Type fiche",
        type: "select",
        defaultValue: "simple",
        options: [
          { label: "Produit simple", value: "simple" },
          { label: "Famille", value: "family" },
          { label: "Variante", value: "variant" },
        ],
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "parentProductId",
        label: "Famille produit",
        type: "relation",
        relation: { module: "produitsauto" },
        searchable: true,
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        list: { visible: true, order: 4 },
        grid: { cols: 6 },
      },
{
        key: "sousCategorie",
        label: "Sous-catégorie",
        type: "text",
        searchable: true,
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "tauxTVA",
        label: "Taux TVA",
        type: "number",
        defaultValue: 18,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "prixPromo",
        label: "Prix promotionnel",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "stockable",
        label: "Stockable",
        type: "checkbox",
        defaultValue: true,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "contenance",
        label: "Contenance",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "uniteContenance",
        label: "Unité contenance",
        type: "select",
        options: [
          { label: "ml", value: "ml" },
          { label: "L", value: "L" },
        ],
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "poids",
        label: "Poids",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "unitePoids",
        label: "Unité poids",
        type: "select",
        options: [
          { label: "g", value: "g" },
          { label: "kg", value: "kg" },
        ],
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "taille",
        label: "Taille",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "couleur",
        label: "Couleur",
        type: "text",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "modele",
        label: "Modèle",
        type: "text",
        searchable: true,
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "compatibilites",
        label: "Compatibilités",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "visibleBoutique",
        label: "Visible boutique",
        type: "checkbox",
        defaultValue: false,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "slugBoutique",
        label: "Slug boutique",
        type: "text",
        searchable: true,
        list: { visible: false },
        grid: { cols: 8 },
      },
{
        key: "seoTitle",
        label: "Titre SEO",
        type: "text",
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "seoDescription",
        label: "Description SEO",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageOriginalUrl",
        label: "Image originale",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageThumbnailUrl",
        label: "Image miniature",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageMediumUrl",
        label: "Image moyenne",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageLargeUrl",
        label: "Image large",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageAlt",
        label: "Texte alternatif image",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "imageStoragePath",
        label: "Chemin stockage image",
        type: "text",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "categorie",
        label: "Catégorie",
        type: "select",
        options: [
          { label: "Huile moteur", value: "huile_moteur" },
          { label: "Filtre", value: "filtre" },
          { label: "Liquide", value: "liquide" },
          { label: "Pièce", value: "piece" },
          { label: "Consommable", value: "consommable" },
          { label: "Service", value: "service" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 6 },
      },
{
        key: "typeProduit",
        label: "Type produit",
        type: "select",
        options: [
          { label: "Stockable", value: "stockable" },
          { label: "Non stockable", value: "non_stockable" },
        ],
        defaultValue: "stockable",
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "unite",
        label: "Unité",
        type: "text",
        defaultValue: "unité",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "prixAchat",
        label: "Prix achat",
        type: "number",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "prixVente",
        label: "Prix vente",
        type: "number",
        list: { visible: true, order: 6 },
        grid: { cols: 4 },
      },
{
        key: "seuilMinimum",
        label: "Seuil minimum",
        type: "number",
        list: { visible: false },
        grid: { cols: 6 },
      },
{
        key: "description",
        label: "Description",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
{
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Rupture", value: "rupture" },
          { label: "Inactif", value: "inactif" },
          { label: "Archivé", value: "archive" },
        ],
        list: { visible: true, order: 7 },
        grid: { cols: 6 },
      }
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "identite",
        label: "Identité",

        fields: [
          "reference",
          "nom",
          "marque",
          "typeRecord",
          "parentProductId",
          "typeArticle",
          "categorie",
          "sousCategorie",
          "typeProduit",
          "stockable",
          "unite",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations produit",
            fields: [
              "reference",
              "nom",
              "marque",
              "typeRecord",
              "parentProductId",
              "typeArticle",
              "categorie",
              "sousCategorie",
              "typeProduit",
              "stockable",
              "unite",
              "statut",
            ],
          },
        ],
      },

      {
        key: "prix",
        label: "Prix",

        fields: [
          "prixAchat",
          "prixVente",
              "tauxTVA",
              "prixPromo",
          "seuilMinimum",
        ],

        sections: [
          {
            key: "tarifs",
            title: "Prix et seuils",
            fields: [
              "prixAchat",
              "prixVente",
              "tauxTVA",
              "prixPromo",
              "seuilMinimum",
            ],
          },
        ],
      },

      
      {
        key: "catalogue",
        label: "Catalogue",

        fields: [
          "contenance",
          "uniteContenance",
          "poids",
          "unitePoids",
          "taille",
          "couleur",
          "modele",
          "compatibilites",
        ],

        sections: [
          {
            key: "caracteristiques",
            title: "Caractéristiques",
            fields: [
              "contenance",
              "uniteContenance",
              "poids",
              "unitePoids",
              "taille",
              "couleur",
              "modele",
              "compatibilites",
            ],
          },
        ],
      },

      {
        key: "boutique",
        label: "Boutique",

        fields: [
          "visibleBoutique",
          "slugBoutique",
          "seoTitle",
          "seoDescription",
          "imageOriginalUrl",
          "imageThumbnailUrl",
          "imageMediumUrl",
          "imageLargeUrl",
          "imageAlt",
          "imageStoragePath",
        ],

        sections: [
          {
            key: "publication",
            title: "Publication web",
            fields: [
              "visibleBoutique",
              "slugBoutique",
              "seoTitle",
              "seoDescription",
            ],
          },
          {
            key: "image",
            title: "Image produit",
            fields: [
              "imageOriginalUrl",
              "imageThumbnailUrl",
              "imageMediumUrl",
              "imageLargeUrl",
              "imageAlt",
              "imageStoragePath",
            ],
          },
        ],
      },

{
        key: "description",
        label: "Description",

        fields: [
          "description",
        ],

        sections: [
          {
            key: "details",
            title: "Description",
            fields: [
              "description",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "produit",
      label: "Cycle produit",
      initialState: "actif",

      states: [
        { key: "actif", label: "Actif", color: "success" },
        { key: "rupture", label: "Rupture", color: "danger" },
        { key: "inactif", label: "Inactif", color: "default" },
        { key: "archive", label: "Archivé", color: "warning" },
      ],

      transitions: [
        { from: "actif", to: "rupture", action: "Déclarer rupture" },
        { from: "rupture", to: "actif", action: "Réapprovisionner" },
        { from: "actif", to: "inactif", action: "Désactiver" },
        { from: "inactif", to: "archive", action: "Archiver" },
      ],
    },
  ],
};