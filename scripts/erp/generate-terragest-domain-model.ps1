$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Admin\terragest"

function Ensure-Dir {
  param([string]$Path)
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent
  Ensure-Dir $dir

  $fileName = Split-Path $Path -Leaf
  $resolvedDir = (Resolve-Path -LiteralPath $dir).Path
  $fullPath = Join-Path -Path $resolvedDir -ChildPath $fileName

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $fullPath" -ForegroundColor Green
}

Write-Host "GENERATION MODELE METIER TERRAGEST ERP" -ForegroundColor Cyan

Ensure-Dir "src/runtime/domain"
Ensure-Dir "src/runtime/domain/models"
Ensure-Dir "src/runtime/domain/rules"

Write-ERPFile "src/runtime/domain/models/TerragestDomainModel.ts" @'
export const TerragestDomainModel = {
  utilisateurs: {
    label: "Utilisateurs",
    description: "Personnes qui possèdent, gèrent ou interviennent dans le système.",
    relations: [
      "proprietaireTerrains",
      "responsableExploitations",
      "intervenantOperations",
    ],
    fields: [
      "nom",
      "email",
      "telephone",
      "role",
      "statut",
      "organisationId",
    ],
  },

  terrains: {
    label: "Terrains",
    description: "Base foncière sur laquelle les exploitations sont rattachées.",
    relations: [
      "proprietaireId",
      "contratsFonciers",
      "exploitations",
    ],
    fields: [
      "code",
      "nom",
      "superficie",
      "localisation",
      "vocation",
      "statut",
      "proprietaireId",
      "dateAcquisition",
      "prixAcquisition",
      "documentFoncier",
    ],
  },

  contratsFonciers: {
    label: "Contrats fonciers",
    description: "Contrats liés aux terrains.",
    relations: [
      "terrainId",
      "documents",
      "paiements",
    ],
    fields: [
      "terrainId",
      "typeContrat",
      "dateDebut",
      "dateFin",
      "statut",
      "document",
      "montant",
      "conditions",
    ],
  },

  exploitations: {
    label: "Exploitations",
    description: "Unité opérationnelle vivante portant une activité agricole, animale, piscicole ou immobilière.",
    relations: [
      "terrainId",
      "responsableId",
      "contratsExploitation",
      "campagnes",
      "stocks",
      "operations",
      "paiements",
    ],
    fields: [
      "code",
      "nom",
      "type",
      "statut",
      "terrainId",
      "responsableId",
      "superficie",
      "localisation",
      "dateDebutActivite",
      "contratObligatoire",
    ],
    types: [
      "agricole",
      "animale",
      "piscicole",
      "immobiliere",
      "mixte",
    ],
  },

  contratsExploitation: {
    label: "Contrats d'exploitation",
    description: "Contrats portant sur une exploitation.",
    relations: [
      "exploitationId",
      "documents",
      "paiements",
    ],
    fields: [
      "exploitationId",
      "typeContrat",
      "dateDebut",
      "dateFin",
      "statut",
      "document",
      "montant",
      "conditions",
    ],
  },

  campagnes: {
    label: "Campagnes",
    description: "Cycle d'activité d'une exploitation sur une période donnée.",
    relations: [
      "exploitationId",
      "terrainId",
      "produitId",
      "bienId",
      "operations",
      "stocks",
      "productions",
      "ventes",
      "paiements",
    ],
    fields: [
      "code",
      "nom",
      "exploitationId",
      "terrainId",
      "produitId",
      "bienId",
      "surfaceUtilisee",
      "dateDebut",
      "dateFin",
      "statut",
      "objectif",
      "budgetPrevu",
      "depensesReelles",
      "revenusRealises",
      "resultat",
    ],
  },

  produits: {
    label: "Produits et ressources",
    description: "Ce qui est utilisé, produit, consommé ou vendu.",
    relations: [
      "stocks",
      "campagnes",
      "mouvements",
    ],
    fields: [
      "nom",
      "categorie",
      "type",
      "unite",
      "prixReference",
      "stockable",
      "compatibleAvec",
    ],
  },

  stocks: {
    label: "Stocks",
    description: "Quantités disponibles par produit, exploitation et campagne.",
    relations: [
      "produitId",
      "exploitationId",
      "campagneId",
      "mouvements",
    ],
    fields: [
      "produitId",
      "exploitationId",
      "campagneId",
      "quantite",
      "unite",
      "seuilAlerte",
      "emplacement",
    ],
  },

  mouvementsStock: {
    label: "Mouvements de stock",
    description: "Entrées, sorties, consommations, ventes, pertes et ajustements.",
    relations: [
      "stockId",
      "produitId",
      "campagneId",
      "operationId",
      "venteId",
    ],
    fields: [
      "typeMouvement",
      "quantite",
      "date",
      "origine",
      "destination",
      "justification",
    ],
  },

  operations: {
    label: "Opérations et interventions",
    description: "Actions réalisées sur une exploitation, une campagne, un matériel ou un bien.",
    relations: [
      "exploitationId",
      "campagneId",
      "materielId",
      "bienId",
      "responsableId",
    ],
    fields: [
      "typeOperation",
      "date",
      "responsableId",
      "cout",
      "statut",
      "compteRendu",
    ],
  },

  materiels: {
    label: "Matériels",
    description: "Équipements utilisés dans les opérations.",
    relations: [
      "exploitationId",
      "operations",
      "maintenances",
    ],
    fields: [
      "nom",
      "type",
      "statut",
      "etat",
      "dateAcquisition",
      "coutAcquisition",
      "responsableId",
    ],
  },

  maintenance: {
    label: "Maintenance",
    description: "Suivi des maintenances matériels, biens et infrastructures.",
    relations: [
      "materielId",
      "bienId",
      "responsableId",
      "paiementId",
    ],
    fields: [
      "typeMaintenance",
      "datePrevue",
      "dateRealisation",
      "statut",
      "cout",
      "rapport",
    ],
  },

  ventes: {
    label: "Ventes",
    description: "Ventes de productions, produits, biens ou revenus locatifs.",
    relations: [
      "campagneId",
      "produitId",
      "bienId",
      "clientId",
      "paiements",
    ],
    fields: [
      "dateVente",
      "clientId",
      "produitId",
      "bienId",
      "quantite",
      "prixUnitaire",
      "montantTotal",
      "statutPaiement",
    ],
  },

  paiements: {
    label: "Paiements",
    description: "Flux financiers liés aux ventes, dépenses, contrats, campagnes et opérations.",
    relations: [
      "venteId",
      "campagneId",
      "exploitationId",
      "contratId",
      "operationId",
      "maintenanceId",
    ],
    fields: [
      "type",
      "montant",
      "date",
      "statut",
      "modePaiement",
      "justificatif",
      "objetMetier",
    ],
  },

  biensImmobiliers: {
    label: "Biens immobiliers",
    description: "Maisons, appartements, magasins ou immeubles exploités.",
    relations: [
      "exploitationId",
      "contratsLocatifs",
      "campagnes",
      "maintenance",
      "paiements",
    ],
    fields: [
      "typeBien",
      "surface",
      "statut",
      "nombrePieces",
      "nombreChambres",
      "nombreSalons",
      "nombreSallesBain",
      "loyerMensuel",
    ],
  },
} as const;
'@

Write-ERPFile "src/runtime/domain/rules/TerragestBusinessRules.ts" @'
export type TerragestRuleSeverity =
  | "blocking"
  | "warning"
  | "audit";

export type TerragestRuleCategory =
  | "existence"
  | "coherence"
  | "date"
  | "overlap"
  | "capacity"
  | "contract"
  | "finance"
  | "stock"
  | "workflow"
  | "audit"
  | "inter-module";

export type TerragestBusinessRule = {
  code: string;
  label: string;
  module: string;
  category: TerragestRuleCategory;
  severity: TerragestRuleSeverity;
  description: string;
  event?: string;
};

export const TerragestBusinessRules: TerragestBusinessRule[] = [
  {
    code: "TERRAIN_REQUIRES_OWNER",
    label: "Terrain avec propriétaire obligatoire",
    module: "terrains",
    category: "existence",
    severity: "blocking",
    description: "Un terrain doit toujours avoir un propriétaire utilisateur.",
    event: "TERRAIN_OWNER_MISSING",
  },
  {
    code: "TERRAIN_SURFACE_POSITIVE",
    label: "Superficie terrain positive",
    module: "terrains",
    category: "coherence",
    severity: "blocking",
    description: "La superficie d'un terrain doit être supérieure à zéro.",
  },
  {
    code: "TERRAIN_VOCATION_COMPATIBLE_WITH_EXPLOITATION",
    label: "Vocation compatible",
    module: "terrains",
    category: "inter-module",
    severity: "blocking",
    description: "La vocation du terrain doit être compatible avec le type d'exploitation.",
    event: "TERRAIN_EXPLOITATION_VOCATION_CONFLICT",
  },
  {
    code: "TERRAIN_CAPACITY_NOT_EXCEEDED",
    label: "Capacité terrain non dépassée",
    module: "terrains",
    category: "capacity",
    severity: "blocking",
    description: "La somme des surfaces exploitées ne doit pas dépasser la superficie disponible du terrain.",
    event: "TERRAIN_OVER_CAPACITY",
  },

  {
    code: "EXPLOITATION_REQUIRES_TERRAIN",
    label: "Terrain obligatoire",
    module: "exploitations",
    category: "existence",
    severity: "blocking",
    description: "Une exploitation doit être rattachée à un terrain.",
  },
  {
    code: "EXPLOITATION_REQUIRES_RESPONSABLE",
    label: "Responsable obligatoire",
    module: "exploitations",
    category: "existence",
    severity: "blocking",
    description: "Une exploitation doit avoir un responsable.",
  },
  {
    code: "EXPLOITATION_TYPE_REQUIRES_DYNAMIC_FIELDS",
    label: "Champs dynamiques obligatoires",
    module: "exploitations",
    category: "coherence",
    severity: "blocking",
    description: "Le type d'exploitation détermine les champs spécifiques obligatoires.",
  },
  {
    code: "EXPLOITATION_ACTIVE_REQUIRES_CAMPAIGN",
    label: "Campagne active ou planifiée",
    module: "exploitations",
    category: "workflow",
    severity: "warning",
    description: "Une exploitation active doit avoir au moins une campagne active ou planifiée.",
    event: "EXPLOITATION_WITHOUT_CAMPAIGN",
  },
  {
    code: "EXPLOITATION_CONTRACT_REQUIRED_FIELDS",
    label: "Contrat d'exploitation complet",
    module: "exploitations",
    category: "contract",
    severity: "blocking",
    description: "Si une exploitation est sous contrat, elle doit avoir type, date début, date fin et document.",
  },
  {
    code: "EXPLOITATION_CONTRACT_NOT_EXPIRED",
    label: "Contrat d'exploitation valide",
    module: "exploitations",
    category: "contract",
    severity: "warning",
    description: "Une exploitation sous contrat expiré doit être signalée.",
    event: "EXPLOITATION_CONTRACT_EXPIRED",
  },

  {
    code: "CONTRACT_END_AFTER_START",
    label: "Date fin après date début",
    module: "contrats",
    category: "date",
    severity: "blocking",
    description: "La date de fin d'un contrat doit être postérieure à la date de début.",
  },
  {
    code: "ACTIVE_CONTRACT_REQUIRES_DOCUMENT",
    label: "Document contrat obligatoire",
    module: "contrats",
    category: "contract",
    severity: "blocking",
    description: "Un contrat actif doit avoir un document attaché.",
  },
  {
    code: "CONTRACT_EXPIRING_SOON",
    label: "Contrat expirant bientôt",
    module: "contrats",
    category: "contract",
    severity: "warning",
    description: "Un contrat expirant bientôt doit générer une alerte.",
    event: "CONTRACT_EXPIRING_SOON",
  },

  {
    code: "CAMPAIGN_REQUIRES_EXPLOITATION",
    label: "Exploitation obligatoire",
    module: "campagnes",
    category: "existence",
    severity: "blocking",
    description: "Une campagne doit être rattachée à une exploitation.",
  },
  {
    code: "CAMPAIGN_REQUIRES_TERRAIN",
    label: "Terrain obligatoire",
    module: "campagnes",
    category: "existence",
    severity: "blocking",
    description: "Une campagne doit être rattachée à un terrain.",
  },
  {
    code: "CAMPAIGN_REQUIRES_PRODUCT_OR_ASSET",
    label: "Produit ou bien obligatoire",
    module: "campagnes",
    category: "existence",
    severity: "blocking",
    description: "Une campagne doit porter sur un produit ou un bien.",
  },
  {
    code: "CAMPAIGN_END_AFTER_START",
    label: "Dates campagne cohérentes",
    module: "campagnes",
    category: "date",
    severity: "blocking",
    description: "La date de fin d'une campagne doit être postérieure à la date de début.",
  },
  {
    code: "CAMPAIGN_NO_IDENTICAL_OVERLAP",
    label: "Pas de chevauchement de campagnes identiques",
    module: "campagnes",
    category: "overlap",
    severity: "blocking",
    description: "Deux campagnes identiques ne peuvent pas se chevaucher sur le même terrain, la même exploitation et le même produit ou bien.",
    event: "CAMPAIGN_OVERLAP_DETECTED",
  },
  {
    code: "CAMPAIGN_SURFACE_WITHIN_TERRAIN_CAPACITY",
    label: "Surface campagne disponible",
    module: "campagnes",
    category: "capacity",
    severity: "blocking",
    description: "La somme des surfaces utilisées par les campagnes actives ne doit pas dépasser la surface disponible.",
  },
  {
    code: "CAMPAIGN_BUDGET_NOT_EXCEEDED",
    label: "Budget campagne suivi",
    module: "campagnes",
    category: "finance",
    severity: "warning",
    description: "Une campagne qui dépasse son budget doit générer une alerte.",
    event: "CAMPAIGN_BUDGET_EXCEEDED",
  },
  {
    code: "CAMPAIGN_CLOSED_REQUIRES_RESULT",
    label: "Bilan obligatoire",
    module: "campagnes",
    category: "workflow",
    severity: "blocking",
    description: "Une campagne clôturée doit avoir un résultat calculé.",
  },

  {
    code: "PRODUCT_REQUIRES_UNIT",
    label: "Unité produit obligatoire",
    module: "produits",
    category: "existence",
    severity: "blocking",
    description: "Un produit doit avoir une unité.",
  },
  {
    code: "PRODUCT_COMPATIBLE_WITH_EXPLOITATION_TYPE",
    label: "Produit compatible avec exploitation",
    module: "produits",
    category: "coherence",
    severity: "blocking",
    description: "Un produit utilisé doit être compatible avec le type d'exploitation.",
  },
  {
    code: "STOCKABLE_PRODUCT_REQUIRES_STOCK",
    label: "Produit stockable avec stock",
    module: "produits",
    category: "stock",
    severity: "warning",
    description: "Un produit stockable doit avoir un stock associé.",
  },

  {
    code: "STOCK_NEVER_NEGATIVE",
    label: "Stock jamais négatif",
    module: "stocks",
    category: "stock",
    severity: "blocking",
    description: "Une opération ne doit jamais rendre un stock négatif.",
    event: "STOCK_NEGATIVE_BLOCKED",
  },
  {
    code: "STOCK_LOW_ALERT",
    label: "Alerte stock bas",
    module: "stocks",
    category: "stock",
    severity: "warning",
    description: "Un stock inférieur au seuil doit générer une alerte.",
    event: "STOCK_LOW",
  },
  {
    code: "STOCK_MOVEMENT_REQUIRES_REASON",
    label: "Mouvement justifié",
    module: "mouvementsStock",
    category: "audit",
    severity: "blocking",
    description: "Tout mouvement de stock doit avoir une justification.",
  },

  {
    code: "OPERATION_REQUIRES_RESPONSABLE",
    label: "Responsable opération obligatoire",
    module: "operations",
    category: "existence",
    severity: "blocking",
    description: "Une opération doit avoir un responsable.",
  },
  {
    code: "OPERATION_COST_FEEDS_CAMPAIGN",
    label: "Coût opération vers campagne",
    module: "operations",
    category: "inter-module",
    severity: "audit",
    description: "Une opération coûteuse doit alimenter les dépenses de la campagne.",
  },

  {
    code: "MATERIAL_UNAVAILABLE_CANNOT_BE_ASSIGNED",
    label: "Matériel indisponible non affectable",
    module: "materiels",
    category: "coherence",
    severity: "blocking",
    description: "Un matériel en panne ou maintenance ne peut pas être affecté à une opération.",
    event: "MATERIAL_BLOCKED",
  },
  {
    code: "MATERIAL_BREAKDOWN_CREATES_MAINTENANCE",
    label: "Panne crée maintenance",
    module: "materiels",
    category: "workflow",
    severity: "warning",
    description: "Une panne matériel doit créer une intervention ou maintenance.",
  },

  {
    code: "SALE_REQUIRES_PRODUCT_OR_ASSET",
    label: "Vente avec produit ou bien",
    module: "ventes",
    category: "existence",
    severity: "blocking",
    description: "Une vente doit porter sur un produit ou un bien.",
  },
  {
    code: "SALE_TOTAL_AMOUNT_VALID",
    label: "Montant vente cohérent",
    module: "ventes",
    category: "finance",
    severity: "blocking",
    description: "Le montant total doit être cohérent avec quantité et prix unitaire.",
  },
  {
    code: "SALE_CREATES_EXPECTED_PAYMENT",
    label: "Vente crée paiement attendu",
    module: "ventes",
    category: "inter-module",
    severity: "audit",
    description: "Une vente non payée doit créer un paiement attendu.",
    event: "SALE_PAYMENT_EXPECTED",
  },

  {
    code: "PAYMENT_REQUIRES_AMOUNT",
    label: "Montant paiement obligatoire",
    module: "paiements",
    category: "existence",
    severity: "blocking",
    description: "Un paiement doit avoir un montant.",
  },
  {
    code: "PAYMENT_REQUIRES_BUSINESS_OBJECT",
    label: "Paiement rattaché",
    module: "paiements",
    category: "inter-module",
    severity: "blocking",
    description: "Un paiement doit être relié à une vente, campagne, contrat, exploitation ou opération.",
  },
  {
    code: "PAYMENT_UPDATES_CAMPAIGN_RESULT",
    label: "Paiement met à jour résultat campagne",
    module: "paiements",
    category: "inter-module",
    severity: "audit",
    description: "Un paiement lié à une campagne doit mettre à jour le résultat.",
  },

  {
    code: "REAL_ESTATE_OCCUPIED_REQUIRES_ACTIVE_CONTRACT",
    label: "Bien occupé avec contrat actif",
    module: "biensImmobiliers",
    category: "contract",
    severity: "blocking",
    description: "Un bien immobilier occupé doit avoir un contrat locatif actif.",
  },
  {
    code: "REAL_ESTATE_RENT_OVERDUE_ALERT",
    label: "Loyer impayé",
    module: "biensImmobiliers",
    category: "finance",
    severity: "warning",
    description: "Un loyer impayé doit générer une alerte.",
  },

  {
    code: "AUDIT_SENSITIVE_ACTIONS",
    label: "Audit des actions sensibles",
    module: "audit",
    category: "audit",
    severity: "audit",
    description: "Toute action sensible doit être auditée : contrat, paiement, stock, suppression, statut.",
  },
];
'@

Write-ERPFile "src/runtime/domain/rules/TerragestInterModuleRules.ts" @'
export const TerragestInterModuleRules = [
  {
    from: "terrain",
    to: "exploitation",
    rule: "Une exploitation ne peut pas exister sans terrain.",
    severity: "blocking",
  },
  {
    from: "terrain",
    to: "exploitation",
    rule: "La vocation du terrain doit accepter le type d'exploitation.",
    severity: "blocking",
  },
  {
    from: "exploitation",
    to: "contrat",
    rule: "Une exploitation sous contrat doit avoir un contrat valide.",
    severity: "blocking",
  },
  {
    from: "exploitation",
    to: "campagne",
    rule: "Une exploitation inactive ne peut pas démarrer de campagne.",
    severity: "blocking",
  },
  {
    from: "campagne",
    to: "produit",
    rule: "Une campagne doit porter sur un produit ou un bien compatible.",
    severity: "blocking",
  },
  {
    from: "campagne",
    to: "stock",
    rule: "Production, consommation, perte et vente doivent créer des mouvements de stock.",
    severity: "audit",
  },
  {
    from: "vente",
    to: "paiement",
    rule: "Une vente crée un paiement attendu.",
    severity: "audit",
  },
  {
    from: "paiement",
    to: "campagne",
    rule: "Les paiements revenus/dépenses doivent recalculer le résultat de campagne.",
    severity: "audit",
  },
  {
    from: "materiel",
    to: "operation",
    rule: "Un matériel indisponible ne peut pas être affecté à une opération.",
    severity: "blocking",
  },
  {
    from: "maintenance",
    to: "paiement",
    rule: "Une maintenance terminée avec coût crée une dépense.",
    severity: "audit",
  },
] as const;
'@

Write-ERPFile "src/runtime/domain/index.ts" @'
export * from "./models/TerragestDomainModel";
export * from "./rules/TerragestBusinessRules";
export * from "./rules/TerragestInterModuleRules";
'@

Write-Host ""
Write-Host "MODELE ET REGLES TERRAGEST ERP GENERES" -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow