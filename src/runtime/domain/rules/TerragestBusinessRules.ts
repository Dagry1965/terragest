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
    label: "Terrain avec propriÃ©taire obligatoire",
    module: "terrains",
    category: "existence",
    severity: "blocking",
    description: "Un terrain doit toujours avoir un propriÃ©taire utilisateur.",
    event: "TERRAIN_OWNER_MISSING",
  },
  {
    code: "TERRAIN_SURFACE_POSITIVE",
    label: "Superficie terrain positive",
    module: "terrains",
    category: "coherence",
    severity: "blocking",
    description: "La superficie d'un terrain doit Ãªtre supÃ©rieure Ã  zÃ©ro.",
  },
  {
    code: "TERRAIN_VOCATION_COMPATIBLE_WITH_EXPLOITATION",
    label: "Vocation compatible",
    module: "terrains",
    category: "inter-module",
    severity: "blocking",
    description: "La vocation du terrain doit Ãªtre compatible avec le type d'exploitation.",
    event: "TERRAIN_EXPLOITATION_VOCATION_CONFLICT",
  },
  {
    code: "TERRAIN_CAPACITY_NOT_EXCEEDED",
    label: "CapacitÃ© terrain non dÃ©passÃ©e",
    module: "terrains",
    category: "capacity",
    severity: "blocking",
    description: "La somme des surfaces exploitÃ©es ne doit pas dÃ©passer la superficie disponible du terrain.",
    event: "TERRAIN_OVER_CAPACITY",
  },

  {
    code: "EXPLOITATION_REQUIRES_TERRAIN",
    label: "Terrain obligatoire",
    module: "exploitations",
    category: "existence",
    severity: "blocking",
    description: "Une exploitation doit Ãªtre rattachÃ©e Ã  un terrain.",
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
    description: "Le type d'exploitation dÃ©termine les champs spÃ©cifiques obligatoires.",
  },
  {
    code: "EXPLOITATION_ACTIVE_REQUIRES_CAMPAIGN",
    label: "Campagne active ou planifiÃ©e",
    module: "exploitations",
    category: "workflow",
    severity: "warning",
    description: "Une exploitation active doit avoir au moins une campagne active ou planifiÃ©e.",
    event: "EXPLOITATION_WITHOUT_CAMPAIGN",
  },
  {
    code: "EXPLOITATION_CONTRACT_REQUIRED_FIELDS",
    label: "Contrat d'exploitation complet",
    module: "exploitations",
    category: "contract",
    severity: "blocking",
    description: "Si une exploitation est sous contrat, elle doit avoir type, date dÃ©but, date fin et document.",
  },
  {
    code: "EXPLOITATION_CONTRACT_NOT_EXPIRED",
    label: "Contrat d'exploitation valide",
    module: "exploitations",
    category: "contract",
    severity: "warning",
    description: "Une exploitation sous contrat expirÃ© doit Ãªtre signalÃ©e.",
    event: "EXPLOITATION_CONTRACT_EXPIRED",
  },

  {
    code: "CONTRACT_END_AFTER_START",
    label: "Date fin aprÃ¨s date dÃ©but",
    module: "contrats",
    category: "date",
    severity: "blocking",
    description: "La date de fin d'un contrat doit Ãªtre postÃ©rieure Ã  la date de dÃ©but.",
  },
  {
    code: "ACTIVE_CONTRACT_REQUIRES_DOCUMENT",
    label: "Document contrat obligatoire",
    module: "contrats",
    category: "contract",
    severity: "blocking",
    description: "Un contrat actif doit avoir un document attachÃ©.",
  },
  {
    code: "CONTRACT_EXPIRING_SOON",
    label: "Contrat expirant bientÃ´t",
    module: "contrats",
    category: "contract",
    severity: "warning",
    description: "Un contrat expirant bientÃ´t doit gÃ©nÃ©rer une alerte.",
    event: "CONTRACT_EXPIRING_SOON",
  },

  {
    code: "CAMPAIGN_REQUIRES_EXPLOITATION",
    label: "Exploitation obligatoire",
    module: "campagnes",
    category: "existence",
    severity: "blocking",
    description: "Une campagne doit Ãªtre rattachÃ©e Ã  une exploitation.",
  },
  {
    code: "CAMPAIGN_REQUIRES_TERRAIN",
    label: "Terrain obligatoire",
    module: "campagnes",
    category: "existence",
    severity: "blocking",
    description: "Une campagne doit Ãªtre rattachÃ©e Ã  un terrain.",
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
    label: "Dates campagne cohÃ©rentes",
    module: "campagnes",
    category: "date",
    severity: "blocking",
    description: "La date de fin d'une campagne doit Ãªtre postÃ©rieure Ã  la date de dÃ©but.",
  },
  {
    code: "CAMPAIGN_NO_IDENTICAL_OVERLAP",
    label: "Pas de chevauchement de campagnes identiques",
    module: "campagnes",
    category: "overlap",
    severity: "blocking",
    description: "Deux campagnes identiques ne peuvent pas se chevaucher sur le mÃªme terrain, la mÃªme exploitation et le mÃªme produit ou bien.",
    event: "CAMPAIGN_OVERLAP_DETECTED",
  },
  {
    code: "CAMPAIGN_SURFACE_WITHIN_TERRAIN_CAPACITY",
    label: "Surface campagne disponible",
    module: "campagnes",
    category: "capacity",
    severity: "blocking",
    description: "La somme des surfaces utilisÃ©es par les campagnes actives ne doit pas dÃ©passer la surface disponible.",
  },
  {
    code: "CAMPAIGN_BUDGET_NOT_EXCEEDED",
    label: "Budget campagne suivi",
    module: "campagnes",
    category: "finance",
    severity: "warning",
    description: "Une campagne qui dÃ©passe son budget doit gÃ©nÃ©rer une alerte.",
    event: "CAMPAIGN_BUDGET_EXCEEDED",
  },
  {
    code: "CAMPAIGN_CLOSED_REQUIRES_RESULT",
    label: "Bilan obligatoire",
    module: "campagnes",
    category: "workflow",
    severity: "blocking",
    description: "Une campagne clÃ´turÃ©e doit avoir un rÃ©sultat calculÃ©.",
  },

  {
    code: "PRODUCT_REQUIRES_UNIT",
    label: "UnitÃ© produit obligatoire",
    module: "produits",
    category: "existence",
    severity: "blocking",
    description: "Un produit doit avoir une unitÃ©.",
  },
  {
    code: "PRODUCT_COMPATIBLE_WITH_EXPLOITATION_TYPE",
    label: "Produit compatible avec exploitation",
    module: "produits",
    category: "coherence",
    severity: "blocking",
    description: "Un produit utilisÃ© doit Ãªtre compatible avec le type d'exploitation.",
  },
  {
    code: "STOCKABLE_PRODUCT_REQUIRES_STOCK",
    label: "Produit stockable avec stock",
    module: "produits",
    category: "stock",
    severity: "warning",
    description: "Un produit stockable doit avoir un stock associÃ©.",
  },

  {
    code: "STOCK_NEVER_NEGATIVE",
    label: "Stock jamais nÃ©gatif",
    module: "stocks",
    category: "stock",
    severity: "blocking",
    description: "Une opÃ©ration ne doit jamais rendre un stock nÃ©gatif.",
    event: "STOCK_NEGATIVE_BLOCKED",
  },
  {
    code: "STOCK_LOW_ALERT",
    label: "Alerte stock bas",
    module: "stocks",
    category: "stock",
    severity: "warning",
    description: "Un stock infÃ©rieur au seuil doit gÃ©nÃ©rer une alerte.",
    event: "STOCK_LOW",
  },
  {
    code: "STOCK_MOVEMENT_REQUIRES_REASON",
    label: "Mouvement justifiÃ©",
    module: "mouvementsStock",
    category: "audit",
    severity: "blocking",
    description: "Tout mouvement de stock doit avoir une justification.",
  },

  {
    code: "OPERATION_REQUIRES_RESPONSABLE",
    label: "Responsable opÃ©ration obligatoire",
    module: "operations",
    category: "existence",
    severity: "blocking",
    description: "Une opÃ©ration doit avoir un responsable.",
  },
  {
    code: "OPERATION_COST_FEEDS_CAMPAIGN",
    label: "CoÃ»t opÃ©ration vers campagne",
    module: "operations",
    category: "inter-module",
    severity: "audit",
    description: "Une opÃ©ration coÃ»teuse doit alimenter les dÃ©penses de la campagne.",
  },

  {
    code: "MATERIAL_UNAVAILABLE_CANNOT_BE_ASSIGNED",
    label: "MatÃ©riel indisponible non affectable",
    module: "materiels",
    category: "coherence",
    severity: "blocking",
    description: "Un matÃ©riel en panne ou maintenance ne peut pas Ãªtre affectÃ© Ã  une opÃ©ration.",
    event: "MATERIAL_BLOCKED",
  },
  {
    code: "MATERIAL_BREAKDOWN_CREATES_MAINTENANCE",
    label: "Panne crÃ©e maintenance",
    module: "materiels",
    category: "workflow",
    severity: "warning",
    description: "Une panne matÃ©riel doit crÃ©er une intervention ou maintenance.",
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
    label: "Montant vente cohÃ©rent",
    module: "ventes",
    category: "finance",
    severity: "blocking",
    description: "Le montant total doit Ãªtre cohÃ©rent avec quantitÃ© et prix unitaire.",
  },
  {
    code: "SALE_CREATES_EXPECTED_PAYMENT",
    label: "Vente crÃ©e paiement attendu",
    module: "ventes",
    category: "inter-module",
    severity: "audit",
    description: "Une vente non payÃ©e doit crÃ©er un paiement attendu.",
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
    label: "Paiement rattachÃ©",
    module: "paiements",
    category: "inter-module",
    severity: "blocking",
    description: "Un paiement doit Ãªtre reliÃ© Ã  une vente, campagne, contrat, exploitation ou opÃ©ration.",
  },
  {
    code: "PAYMENT_UPDATES_CAMPAIGN_RESULT",
    label: "Paiement met Ã  jour rÃ©sultat campagne",
    module: "paiements",
    category: "inter-module",
    severity: "audit",
    description: "Un paiement liÃ© Ã  une campagne doit mettre Ã  jour le rÃ©sultat.",
  },

  {
    code: "REAL_ESTATE_OCCUPIED_REQUIRES_ACTIVE_CONTRACT",
    label: "Bien occupÃ© avec contrat actif",
    module: "biensImmobiliers",
    category: "contract",
    severity: "blocking",
    description: "Un bien immobilier occupÃ© doit avoir un contrat locatif actif.",
  },
  {
    code: "REAL_ESTATE_RENT_OVERDUE_ALERT",
    label: "Loyer impayÃ©",
    module: "biensImmobiliers",
    category: "finance",
    severity: "warning",
    description: "Un loyer impayÃ© doit gÃ©nÃ©rer une alerte.",
  },

  {
    code: "AUDIT_SENSITIVE_ACTIONS",
    label: "Audit des actions sensibles",
    module: "audit",
    category: "audit",
    severity: "audit",
    description: "Toute action sensible doit Ãªtre auditÃ©e : contrat, paiement, stock, suppression, statut.",
  },
];