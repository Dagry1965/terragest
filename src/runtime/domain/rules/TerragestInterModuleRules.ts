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
    rule: "Une exploitation inactive ne peut pas dÃ©marrer de campagne.",
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
    rule: "Production, consommation, perte et vente doivent crÃ©er des mouvements de stock.",
    severity: "audit",
  },
  {
    from: "vente",
    to: "paiement",
    rule: "Une vente crÃ©e un paiement attendu.",
    severity: "audit",
  },
  {
    from: "paiement",
    to: "campagne",
    rule: "Les paiements revenus/dÃ©penses doivent recalculer le rÃ©sultat de campagne.",
    severity: "audit",
  },
  {
    from: "materiel",
    to: "operation",
    rule: "Un matÃ©riel indisponible ne peut pas Ãªtre affectÃ© Ã  une opÃ©ration.",
    severity: "blocking",
  },
  {
    from: "maintenance",
    to: "paiement",
    rule: "Une maintenance terminÃ©e avec coÃ»t crÃ©e une dÃ©pense.",
    severity: "audit",
  },
] as const;