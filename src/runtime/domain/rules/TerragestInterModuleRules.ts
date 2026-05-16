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