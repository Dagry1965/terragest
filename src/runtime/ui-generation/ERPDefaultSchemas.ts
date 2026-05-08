import type { ERPGeneratedSchema } from "./ERPGeneratedSchema";

export const ERPDefaultSchemas: ERPGeneratedSchema[] = [
  {
    moduleKey: "exploitations",
    moduleLabel: "Exploitations",
    description: "Pilotage des exploitations.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "type", label: "Type", type: "select" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "terrains",
    moduleLabel: "Terrains",
    description: "Gestion des terrains.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "surface", label: "Surface", type: "number" },
      { key: "localisation", label: "Localisation", type: "text" },
    ],
  },
  {
    moduleKey: "materiels",
    moduleLabel: "Materiels",
    description: "Gestion du parc materiel.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "etat", label: "Etat", type: "status" },
      { key: "categorie", label: "Categorie", type: "text" },
    ],
  },
  {
    moduleKey: "produits",
    moduleLabel: "Produits",
    description: "Catalogue produits ERP.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "categorie", label: "Categorie", type: "text" },
      { key: "prix", label: "Prix", type: "currency" },
    ],
  },
  {
    moduleKey: "stocks",
    moduleLabel: "Stocks",
    description: "Suivi des stocks.",
    fields: [
      { key: "produit", label: "Produit", type: "text" },
      { key: "quantite", label: "Quantite", type: "number" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "paiements",
    moduleLabel: "Paiements",
    description: "Gestion financiere ERP.",
    fields: [
      { key: "reference", label: "Reference", type: "text" },
      { key: "montant", label: "Montant", type: "currency" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "interventions",
    moduleLabel: "Interventions",
    description: "Interventions operationnelles.",
    fields: [
      { key: "titre", label: "Titre", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "contrats",
    moduleLabel: "Contrats",
    description: "Gestion des contrats.",
    fields: [
      { key: "reference", label: "Reference", type: "text" },
      { key: "partenaire", label: "Partenaire", type: "text" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "maintenance",
    moduleLabel: "Maintenance",
    description: "Suivi maintenance.",
    fields: [
      { key: "objet", label: "Objet", type: "text" },
      { key: "priorite", label: "Priorite", type: "status" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
];