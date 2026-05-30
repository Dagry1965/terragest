const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

const workflows = [
  {
    moduleKey: "clientsauto",
    label: "Clients",
    role: "Référentiel client et point d’entrée de la fiche client opérationnelle.",
    statusField: "statut",
    initialState: "prospect",
    states: [
      ["prospect", "Prospect", "Client identifié mais pas encore actif."],
      ["actif", "Actif", "Client utilisable dans les opérations."],
      ["inactif", "Inactif", "Client suspendu ou non utilisé actuellement."],
      ["archive", "Archivé", "Client conservé pour historique."],
    ],
    transitions: [
      {
        from: "prospect",
        to: "actif",
        action: "Activer client",
        visibleWhen: "statut = prospect",
        effect: "Le client devient exploitable pour véhicules, RDV, interventions et factures.",
        guards: ["Le client doit avoir au minimum un nom ou une raison sociale.", "Le téléphone ou email doit être renseigné si la politique commerciale l’exige."],
      },
      {
        from: "actif",
        to: "inactif",
        action: "Désactiver client",
        visibleWhen: "statut = actif",
        effect: "Le client reste consultable mais ne doit plus être proposé comme client actif principal.",
        guards: ["Ne pas supprimer les véhicules, RDV, interventions ou factures liés."],
      },
      {
        from: "inactif",
        to: "actif",
        action: "Réactiver client",
        visibleWhen: "statut = inactif",
        effect: "Le client redevient disponible dans les opérations.",
        guards: ["Conserver l’historique existant."],
      },
      {
        from: "actif|inactif|prospect",
        to: "archive",
        action: "Archiver client",
        visibleWhen: "client non supprimé",
        effect: "Le client sort des usages courants mais reste auditable.",
        guards: ["Ne jamais perdre l’historique financier et opérationnel."],
      },
    ],
    buttons: ["Activer client", "Désactiver client", "Réactiver client", "Archiver client", "Ajouter véhicule", "Ouvrir fiche opérationnelle"],
    forbiddenInForm: ["Boutons d’activation/archive", "Création véhicule sans contexte client"],
  },

  {
    moduleKey: "vehicules",
    label: "Véhicules",
    role: "Fiche véhicule rattachée au client et pivot vers RDV/interventions/factures.",
    statusField: "statut",
    initialState: "actif",
    states: [
      ["actif", "Actif", "Véhicule suivi normalement."],
      ["entretien", "Entretien requis", "Véhicule nécessitant une opération."],
      ["immobilise", "Immobilisé", "Véhicule indisponible."],
      ["archive", "Archivé", "Véhicule conservé pour historique."],
    ],
    transitions: [
      {
        from: "actif",
        to: "entretien",
        action: "Marquer entretien requis",
        visibleWhen: "statut = actif",
        effect: "Le véhicule est signalé comme nécessitant un suivi.",
        guards: ["Ne doit pas créer automatiquement une intervention sans RDV/action dédiée."],
      },
      {
        from: "entretien",
        to: "immobilise",
        action: "Immobiliser véhicule",
        visibleWhen: "statut = entretien",
        effect: "Le véhicule est marqué indisponible.",
        guards: ["Le contexte doit rester visible sur RDV/interventions."],
      },
      {
        from: "immobilise|entretien",
        to: "actif",
        action: "Remettre en service",
        visibleWhen: "statut = immobilise ou entretien",
        effect: "Le véhicule redevient utilisable.",
        guards: ["Ne modifie pas les interventions/factures historiques."],
      },
      {
        from: "actif|entretien|immobilise",
        to: "archive",
        action: "Archiver véhicule",
        visibleWhen: "véhicule non archivé",
        effect: "Le véhicule sort des listes courantes.",
        guards: ["Conserver les liens client/RDV/interventions/factures."],
      },
    ],
    buttons: ["Créer rendez-vous", "Voir fiche véhicule", "Marquer entretien requis", "Immobiliser véhicule", "Remettre en service", "Archiver véhicule"],
    forbiddenInForm: ["Boutons de transition véhicule", "Création RDV sans clientId et vehiculeId"],
  },

  {
    moduleKey: "rendezvous",
    label: "Rendez-vous",
    role: "Planification atelier : client, véhicule, service, créneau, durée.",
    statusField: "statut",
    initialState: "planifie",
    states: [
      ["planifie", "Planifié", "RDV créé et placé sur un créneau."],
      ["confirme", "Confirmé", "RDV validé par le garage."],
      ["en_cours", "En cours", "Client/véhicule pris en charge."],
      ["termine", "Terminé", "RDV consommé."],
      ["annule", "Annulé", "RDV annulé."],
    ],
    transitions: [
      {
        from: "planifie",
        to: "confirme",
        action: "Confirmer RDV",
        visibleWhen: "statut = planifie",
        effect: "Confirme le créneau et déclenche la création automatique d’une intervention si applicable.",
        guards: ["Créneau non conflictuel.", "clientId et vehiculeId présents.", "Ne pas créer d’intervention si consumedByInterventionId existe déjà."],
      },
      {
        from: "confirme",
        to: "en_cours",
        action: "Démarrer RDV",
        visibleWhen: "statut = confirme",
        effect: "Marque la prise en charge du RDV.",
        guards: ["RDV confirmé.", "Intervention liée ou créable selon règle runtime."],
      },
      {
        from: "en_cours",
        to: "termine",
        action: "Terminer RDV",
        visibleWhen: "statut = en_cours",
        effect: "Marque le RDV comme consommé.",
        guards: ["Ne doit pas modifier directement la facture.", "Ne doit pas recréer une intervention."],
      },
      {
        from: "planifie|confirme|en_cours",
        to: "annule",
        action: "Annuler RDV",
        visibleWhen: "statut = planifie, confirme ou en_cours",
        effect: "Annule le RDV et libère/neutralise le créneau selon le moteur planning.",
        guards: ["Ne pas annuler silencieusement une intervention déjà terminée ou facturée."],
      },
      {
        from: "planifie|confirme",
        to: "planifie",
        action: "Reporter RDV",
        visibleWhen: "statut = planifie ou confirme",
        effect: "Change le créneau via le moteur planning.",
        guards: ["Nouveau créneau disponible.", "typeService et durationMinutes conservés."],
      },
    ],
    buttons: ["Confirmer RDV", "Démarrer RDV", "Terminer RDV", "Annuler RDV", "Reporter RDV"],
    forbiddenInForm: ["Modification libre du statut si elle déclenche une intervention", "Boutons de workflow dans le formulaire", "Création intervention sans action runtime"],
  },

  {
    moduleKey: "interventionsauto",
    label: "Interventions",
    role: "Exécution atelier et pivot vers lignes, facture, encaissements.",
    statusField: "statut",
    initialState: "ouverte",
    states: [
      ["ouverte", "Ouverte", "Intervention créée mais travaux non démarrés."],
      ["diagnostic", "Diagnostic", "Diagnostic en cours."],
      ["en_cours", "En cours", "Travaux en cours."],
      ["terminee", "Terminée", "Travaux terminés."],
      ["facturee", "Facturée", "Facture générée."],
      ["annulee", "Annulée", "Intervention annulée."],
    ],
    transitions: [
      {
        from: "ouverte",
        to: "diagnostic",
        action: "Passer en diagnostic",
        visibleWhen: "statut = ouverte",
        effect: "Marque l’intervention comme en phase diagnostic.",
        guards: ["clientId, vehiculeId et éventuellement rendezVousId cohérents."],
      },
      {
        from: "diagnostic|ouverte",
        to: "en_cours",
        action: "Démarrer intervention",
        visibleWhen: "statut = ouverte ou diagnostic",
        effect: "Démarre les travaux atelier.",
        guards: ["Ne pas modifier les champs hérités client/véhicule/RDV."],
      },
      {
        from: "en_cours|diagnostic",
        to: "terminee",
        action: "Terminer intervention",
        visibleWhen: "statut = en_cours ou diagnostic",
        effect: "Clôture l’intervention et agrège les lignes validées.",
        guards: ["Les lignes brouillon ne comptent pas.", "Les lignes retirées ne comptent pas."],
      },
      {
        from: "terminee",
        to: "facturee",
        action: "Générer facture",
        visibleWhen: "statut = terminee",
        effect: "Crée la facture liée depuis les lignes validées.",
        guards: ["Ne pas générer deux factures pour la même intervention.", "Montants calculés depuis lignes validées."],
      },
      {
        from: "ouverte|diagnostic|en_cours",
        to: "annulee",
        action: "Annuler intervention",
        visibleWhen: "statut = ouverte, diagnostic ou en_cours",
        effect: "Annule l’intervention avant facturation.",
        guards: ["Bloquer si déjà facturée ou si mouvements stock non compensés."],
      },
    ],
    buttons: ["Passer en diagnostic", "Démarrer intervention", "Terminer intervention", "Générer facture", "Annuler intervention"],
    forbiddenInForm: ["Boutons de transition intervention", "Modification libre des champs parent client/véhicule/RDV", "Facturation manuelle sans action runtime"],
  },

  {
    moduleKey: "lignesinterventionauto",
    label: "Lignes intervention",
    role: "Détail des pièces, services, main-d’œuvre et montants d’une intervention.",
    statusField: "statut",
    initialState: "brouillon",
    states: [
      ["brouillon", "Brouillon", "Ligne préparée, non comptabilisée."],
      ["validee", "Validée", "Ligne confirmée et comptabilisable."],
      ["retiree", "Retirée", "État technique/audit : ligne retirée mais conservée."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "validee",
        action: "Valider la ligne",
        visibleWhen: "statut = brouillon",
        effect: "La ligne entre dans les totaux de l’intervention/facture et peut impacter le stock.",
        guards: ["interventionId obligatoire.", "Produit cohérent.", "Quantité > 0.", "Stock suffisant si type article stockable."],
      },
      {
        from: "brouillon|validee",
        to: "retiree",
        action: "Retirer la ligne",
        visibleWhen: "ligne non retirée",
        effect: "Retire la ligne des totaux et réintègre le stock si un mouvement de sortie existe.",
        guards: ["Conserver removedAt, removedBy, removedReason.", "Bloquer si ligne liée à facture verrouillée selon règle métier."],
      },
    ],
    buttons: ["Valider la ligne", "Retirer la ligne"],
    forbiddenInForm: ["Statut utilisé comme commande libre", "Modification manuelle de montantHT/montantTTC/montantTotal", "Modification du parent interventionId hors contexte"],
  },

  {
    moduleKey: "facturesauto",
    label: "Factures",
    role: "Preuve commerciale liée à une intervention et support des encaissements.",
    statusField: "statutFacture / statutPaiement / statutEnvoiFacture",
    initialState: "emise",
    states: [
      ["brouillon", "Brouillon", "Facture préparée."],
      ["emise", "Émise", "Facture officielle."],
      ["annulee", "Annulée", "Facture annulée."],
      ["en_attente", "Paiement en attente", "Aucun paiement ou reste total."],
      ["partiel", "Paiement partiel", "Paiement partiel reçu."],
      ["paye", "Payée", "Solde payé."],
      ["non_envoyee", "Non envoyée", "Facture non envoyée."],
      ["envoyee", "Envoyée", "Facture envoyée."],
      ["echec", "Échec envoi", "Échec d’envoi."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "emise",
        action: "Valider facture",
        visibleWhen: "statutFacture = brouillon",
        effect: "La facture devient officielle.",
        guards: ["MontantTTC calculé.", "Client, véhicule, intervention cohérents."],
      },
      {
        from: "emise",
        to: "annulee",
        action: "Annuler facture",
        visibleWhen: "statutFacture = emise",
        effect: "Annule la facture sans supprimer l’historique.",
        guards: ["Vérifier encaissements existants.", "Ne pas perdre les traces de paiement."],
      },
      {
        from: "non_envoyee|echec",
        to: "envoyee",
        action: "Marquer comme envoyée",
        visibleWhen: "statutEnvoiFacture = non_envoyee ou echec",
        effect: "Marque la facture comme envoyée et renseigne le suivi d’envoi.",
        guards: ["Destinataire disponible.", "Canal d’envoi cohérent."],
      },
      {
        from: "en_attente|partiel",
        to: "partiel|paye",
        action: "Ajouter paiement",
        visibleWhen: "resteAPayer > 0",
        effect: "Crée un encaissement enfant et recalcule montantPaye, resteAPayer et statutPaiement.",
        guards: ["Passer par facture → encaissement avec parentModuleKey, parentRecordId, parentForeignKey.", "Ne pas dupliquer les boutons paiement."],
      },
    ],
    buttons: ["Valider facture", "Annuler facture", "Marquer comme envoyée", "Voir historique encaissements", "Ajouter paiement via historique"],
    forbiddenInForm: ["Bouton paiement doublon", "Modification manuelle de montantPaye/resteAPayer/statutPaiement", "Création encaissement sans contexte parent"],
  },

  {
    moduleKey: "encaissementsauto",
    label: "Encaissements",
    role: "Paiement réel reçu sur une facture.",
    statusField: "statut / statutEnvoiRecu",
    initialState: "valide",
    states: [
      ["en_attente", "En attente", "Paiement saisi mais non validé."],
      ["valide", "Validé", "Paiement comptabilisé."],
      ["rejete", "Rejeté", "Paiement refusé."],
      ["annule", "Annulé", "Paiement annulé."],
      ["non_envoye", "Reçu non envoyé", "Reçu non envoyé."],
      ["envoye", "Reçu envoyé", "Reçu envoyé."],
      ["echec", "Échec envoi reçu", "Échec d’envoi du reçu."],
    ],
    transitions: [
      {
        from: "en_attente",
        to: "valide",
        action: "Valider encaissement",
        visibleWhen: "statut = en_attente",
        effect: "Comptabilise le paiement et met à jour la facture parent.",
        guards: ["factureId obligatoire.", "Contexte parent facture obligatoire.", "Montant > 0."],
      },
      {
        from: "en_attente",
        to: "rejete",
        action: "Rejeter encaissement",
        visibleWhen: "statut = en_attente",
        effect: "Rejette le paiement sans impacter le montant payé.",
        guards: ["Motif recommandé."],
      },
      {
        from: "valide|en_attente",
        to: "annule",
        action: "Annuler encaissement",
        visibleWhen: "statut = valide ou en_attente",
        effect: "Annule le paiement et recalcule la facture.",
        guards: ["Conserver audit.", "Ne pas supprimer la preuve."],
      },
      {
        from: "non_envoye|echec",
        to: "envoye",
        action: "Envoyer reçu",
        visibleWhen: "statutEnvoiRecu = non_envoye ou echec",
        effect: "Envoie ou marque le reçu comme envoyé.",
        guards: ["Reçu généré.", "Destinataire disponible."],
      },
    ],
    buttons: ["Valider encaissement", "Rejeter encaissement", "Annuler encaissement", "Envoyer reçu"],
    forbiddenInForm: ["Modification libre de factureId/clientId/vehiculeId", "Création hors parent facture", "Boutons de transition dans le formulaire"],
  },

  {
    moduleKey: "echeancespaiementauto",
    label: "Échéances paiement",
    role: "Plan de paiement, échéances et relances.",
    statusField: "statut",
    initialState: "a_venir",
    states: [
      ["a_venir", "À venir", "Échéance non arrivée."],
      ["en_retard", "En retard", "Échéance dépassée."],
      ["partiellement_payee", "Partiellement payée", "Échéance partiellement payée."],
      ["payee", "Payée", "Échéance soldée."],
      ["annulee", "Annulée", "Échéance annulée."],
    ],
    transitions: [
      {
        from: "a_venir",
        to: "en_retard",
        action: "Marquer en retard",
        visibleWhen: "dateEcheance dépassée et non payée",
        effect: "Signale l’échéance en retard.",
        guards: ["Doit pouvoir être automatisé par job runtime."],
      },
      {
        from: "a_venir|en_retard|partiellement_payee",
        to: "payee",
        action: "Marquer payée",
        visibleWhen: "montantPaye >= montantPrevu",
        effect: "Solde l’échéance et peut contribuer à la facture.",
        guards: ["Lien facture obligatoire."],
      },
      {
        from: "a_venir|en_retard|partiellement_payee",
        to: "annulee",
        action: "Annuler échéance",
        visibleWhen: "échéance non payée complètement",
        effect: "Annule l’échéance.",
        guards: ["Conserver audit."],
      },
      {
        from: "en_retard",
        to: "en_retard",
        action: "Relancer client",
        visibleWhen: "statut = en_retard",
        effect: "Enregistre ou déclenche une relance.",
        guards: ["Canal de relance disponible.", "Historique de relance conservé."],
      },
    ],
    buttons: ["Marquer payée", "Relancer client", "Annuler échéance"],
    forbiddenInForm: ["Relance non auditée", "Modification libre du statut financier sans paiement"],
  },

  {
    moduleKey: "produitsauto",
    label: "Produits",
    role: "Catalogue pièces/services/consommables.",
    statusField: "statut",
    initialState: "actif",
    states: [
      ["actif", "Actif", "Produit utilisable."],
      ["rupture", "Rupture", "Produit indisponible."],
      ["inactif", "Inactif", "Produit suspendu."],
      ["archive", "Archivé", "Produit retiré du catalogue actif."],
    ],
    transitions: [
      {
        from: "actif",
        to: "rupture",
        action: "Marquer rupture",
        visibleWhen: "stock <= seuil ou décision utilisateur",
        effect: "Signale le produit en rupture.",
        guards: ["Ne doit pas modifier directement le stock."],
      },
      {
        from: "rupture|inactif",
        to: "actif",
        action: "Réactiver produit",
        visibleWhen: "produit non actif",
        effect: "Produit à nouveau utilisable.",
        guards: ["Prix et type article cohérents."],
      },
      {
        from: "actif|rupture|inactif",
        to: "archive",
        action: "Archiver produit",
        visibleWhen: "produit non archivé",
        effect: "Produit retiré des choix courants.",
        guards: ["Conserver historique lignes/stock/mouvements."],
      },
    ],
    buttons: ["Créer stock associé", "Voir hub produit/stock", "Marquer rupture", "Réactiver produit", "Archiver produit"],
    forbiddenInForm: ["Choix libre typeLigne sur lignes au lieu du typeArticle produit", "Modification stock depuis produit"],
  },

  {
    moduleKey: "stocksauto",
    label: "Stocks",
    role: "État courant du stock par produit/emplacement.",
    statusField: "statut",
    initialState: "disponible",
    states: [
      ["disponible", "Disponible", "Stock utilisable."],
      ["stock_faible", "Stock faible", "Stock sous seuil."],
      ["rupture", "Rupture", "Stock nul ou indisponible."],
      ["archive", "Archivé", "Stock retiré des usages courants."],
    ],
    transitions: [
      {
        from: "disponible",
        to: "stock_faible",
        action: "Détecter stock faible",
        visibleWhen: "quantité <= seuil",
        effect: "Signale un stock bas.",
        guards: ["Transition idéalement automatique depuis moteur stock."],
      },
      {
        from: "stock_faible",
        to: "rupture",
        action: "Détecter rupture",
        visibleWhen: "quantité <= 0",
        effect: "Signale la rupture.",
        guards: ["Transition automatique depuis mouvements stock."],
      },
      {
        from: "stock_faible|rupture",
        to: "disponible",
        action: "Réapprovisionner",
        visibleWhen: "réception/mouvement entrée augmente le stock",
        effect: "Stock redevient disponible.",
        guards: ["Doit venir d’un mouvement stock entrant."],
      },
    ],
    buttons: ["Voir mouvements", "Créer correction stock contrôlée"],
    forbiddenInForm: ["Modification quantité sans mouvement", "Changement statut stock manuel sans cohérence quantité"],
  },

  {
    moduleKey: "mouvementsstockauto",
    label: "Mouvements stock",
    role: "Preuve d’entrée, sortie, correction ou réintégration stock.",
    statusField: "statut",
    initialState: "valide",
    states: [
      ["brouillon", "Brouillon", "Mouvement préparé."],
      ["valide", "Validé", "Mouvement comptabilisé."],
      ["annule", "Annulé", "Mouvement annulé ou neutralisé."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "valide",
        action: "Valider mouvement",
        visibleWhen: "statut = brouillon",
        effect: "Applique la variation stock.",
        guards: ["Produit et stock obligatoires.", "Quantité cohérente.", "quantiteAvant/quantiteApres conservées."],
      },
      {
        from: "valide",
        to: "annule",
        action: "Annuler mouvement",
        visibleWhen: "statut = valide",
        effect: "Neutralise le mouvement selon règle métier.",
        guards: ["Créer un mouvement inverse plutôt que modifier l’historique si nécessaire."],
      },
    ],
    buttons: ["Valider mouvement", "Annuler mouvement"],
    forbiddenInForm: ["Modification d’un mouvement validé pour corriger l’historique", "Variation stock sans source métier"],
  },

  {
    moduleKey: "fournisseursauto",
    label: "Fournisseurs",
    role: "Référentiel fournisseurs pour achats stock.",
    statusField: "statut",
    initialState: "actif",
    states: [
      ["actif", "Actif", "Fournisseur utilisable."],
      ["suspendu", "Suspendu", "Fournisseur temporairement non utilisable."],
      ["archive", "Archivé", "Fournisseur conservé pour historique."],
    ],
    transitions: [
      {
        from: "actif",
        to: "suspendu",
        action: "Suspendre fournisseur",
        visibleWhen: "statut = actif",
        effect: "Empêche ou déconseille les nouvelles commandes.",
        guards: ["Ne pas supprimer les commandes historiques."],
      },
      {
        from: "suspendu",
        to: "actif",
        action: "Réactiver fournisseur",
        visibleWhen: "statut = suspendu",
        effect: "Rend le fournisseur de nouveau utilisable.",
        guards: ["Informations fournisseur cohérentes."],
      },
      {
        from: "actif|suspendu",
        to: "archive",
        action: "Archiver fournisseur",
        visibleWhen: "non archivé",
        effect: "Retire le fournisseur des usages courants.",
        guards: ["Conserver commandes/réceptions historiques."],
      },
    ],
    buttons: ["Créer commande fournisseur", "Voir commandes fournisseur", "Suspendre fournisseur", "Réactiver fournisseur", "Archiver fournisseur"],
    forbiddenInForm: ["Création commande sans fournisseur parent si contexte requis"],
  },

  {
    moduleKey: "commandesstockauto",
    label: "Commandes stock",
    role: "Intention d’achat fournisseur avant réception réelle.",
    statusField: "statut",
    initialState: "brouillon",
    states: [
      ["brouillon", "Brouillon", "Commande préparée."],
      ["envoyee", "Envoyée", "Commande transmise au fournisseur."],
      ["partiellement_recue", "Partiellement reçue", "Une partie des lignes est réceptionnée."],
      ["recue", "Reçue", "Commande totalement réceptionnée."],
      ["annulee", "Annulée", "Commande annulée."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "envoyee",
        action: "Envoyer commande",
        visibleWhen: "statut = brouillon",
        effect: "Fige l’intention d’achat.",
        guards: ["Au moins une ligne validée.", "Ne modifie pas le stock."],
      },
      {
        from: "envoyee",
        to: "partiellement_recue",
        action: "Réception partielle détectée",
        visibleWhen: "réceptions partielles existantes",
        effect: "Statut calculé depuis les réceptions.",
        guards: ["Ne doit pas être une action utilisateur libre si calculé."],
      },
      {
        from: "envoyee|partiellement_recue",
        to: "recue",
        action: "Réception complète détectée",
        visibleWhen: "toutes les lignes sont réceptionnées",
        effect: "Commande considérée reçue.",
        guards: ["Calculé depuis réceptions/mouvements."],
      },
      {
        from: "brouillon|envoyee",
        to: "annulee",
        action: "Annuler commande",
        visibleWhen: "commande non reçue",
        effect: "Annule l’intention d’achat.",
        guards: ["Bloquer si réception/mouvement stock existe sans compensation."],
      },
    ],
    buttons: ["Envoyer commande", "Créer réception", "Annuler commande"],
    forbiddenInForm: ["Modification stock depuis commande", "Statut reçu manuel si calculé depuis réceptions"],
  },

  {
    moduleKey: "lignescommandestockauto",
    label: "Lignes commande stock",
    role: "Détail des produits et quantités commandés.",
    statusField: "statut",
    initialState: "brouillon",
    states: [
      ["brouillon", "Brouillon", "Ligne préparée."],
      ["validee", "Validée", "Ligne confirmée et réceptionnable."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "validee",
        action: "Valider ligne commande",
        visibleWhen: "statut = brouillon",
        effect: "Rend la ligne réceptionnable.",
        guards: ["Produit obligatoire.", "Quantité > 0.", "Prix achat snapshot cohérent."],
      },
    ],
    buttons: ["Valider ligne commande", "Annuler ligne commande"],
    forbiddenInForm: ["Choix stock destination sur ligne commande", "Réceptionner deux fois la même ligne sans logique partielle"],
  },

  {
    moduleKey: "receptionsstockauto",
    label: "Réceptions stock",
    role: "Entrée réelle de stock depuis commande fournisseur.",
    statusField: "statut",
    initialState: "brouillon",
    states: [
      ["brouillon", "Brouillon", "Réception préparée."],
      ["validee", "Validée", "Réception comptabilisée."],
    ],
    transitions: [
      {
        from: "brouillon",
        to: "validee",
        action: "Valider réception",
        visibleWhen: "statut = brouillon",
        effect: "Crée un mouvement stock entrant et augmente le stock.",
        guards: ["commandeId obligatoire.", "ligneCommandeId obligatoire.", "produitId obligatoire.", "stockId obligatoire.", "mouvementStockId absent pour éviter double traitement."],
      },
    ],
    buttons: ["Valider réception", "Annuler réception"],
    forbiddenInForm: ["Modification stock directe", "Double traitement d’une réception", "Réception sans ligne commande"],
  },
];

const report = [];

report.push("# Q2-OP-I6 — Workflows runtime cibles par module");
report.push("");
report.push("Objectif : proposer les workflows runtime attendus, les transitions, les boutons, les conditions d’apparition et les effets métier pour chaque module prioritaire.");
report.push("");
report.push("## Doctrine");
report.push("");
report.push("- Les statuts ne sont pas des commandes libres.");
report.push("- Les transitions passent par RuntimeActionEngine / RuntimeWorkflowEngine.");
report.push("- Les boutons apparaissent dans une barre runtime hors formulaire.");
report.push("- Les formulaires affichent les champs mais ne portent pas les boutons de workflow.");
report.push("- Les effets métier sont exécutés par Business Rules, guards et services runtime.");
report.push("");

for (const wf of workflows) {
  report.push(`## ${wf.label} — \`${wf.moduleKey}\``);
  report.push("");
  report.push(`### 1. Rôle du module`);
  report.push("");
  report.push(`- ${wf.role}`);
  report.push("");
  report.push(`### 2. Champ(s) de statut pilotés`);
  report.push("");
  report.push(`- \`${wf.statusField}\``);
  report.push(`- État initial cible : \`${wf.initialState}\``);
  report.push("");
  report.push("### 3. États cibles");
  report.push("");
  report.push("| État | Label | Signification |");
  report.push("|---|---|---|");
  for (const [key, label, meaning] of wf.states) {
    report.push(`| \`${key}\` | ${label} | ${meaning} |`);
  }
  report.push("");
  report.push("### 4. Transitions runtime attendues");
  report.push("");
  report.push("| Départ | Bouton/action | Arrivée | Condition d’apparition | Effet métier | Guards obligatoires |");
  report.push("|---|---|---|---|---|---|");
  for (const transition of wf.transitions) {
    report.push(
      `| \`${transition.from}\` | ${transition.action} | \`${transition.to}\` | ${transition.visibleWhen} | ${transition.effect} | ${transition.guards.join("<br/>")} |`
    );
  }
  report.push("");
  report.push("### 5. Boutons attendus");
  report.push("");
  for (const button of wf.buttons) {
    report.push(`- ${button}`);
  }
  report.push("");
  report.push("### 6. Apparition des boutons");
  report.push("");
  report.push("- Les boutons doivent apparaître dans `ERPRuntimeActionBar` ou équivalent runtime.");
  report.push("- Ils doivent être visibles uniquement selon l’état courant et les guards.");
  report.push("- Ils ne doivent pas apparaître dans `ERPEnterpriseForm`.");
  report.push("");
  report.push("### 7. Interdits formulaire");
  report.push("");
  for (const item of wf.forbiddenInForm) {
    report.push(`- ${item}`);
  }
  report.push("");
  report.push("### 8. Format runtime cible indicatif");
  report.push("");
  report.push("```ts");
  report.push("{");
  report.push(`  key: "${wf.moduleKey}",`);
  report.push(`  statusField: "${wf.statusField}",`);
  report.push(`  initialState: "${wf.initialState}",`);
  report.push("  transitions: [");
  for (const transition of wf.transitions) {
    report.push("    {");
    report.push(`      from: "${transition.from}",`);
    report.push(`      to: "${transition.to}",`);
    report.push(`      action: "${transition.action}",`);
    report.push("      renderIn: \"runtime-action-bar\",");
    report.push("    },");
  }
  report.push("  ],");
  report.push("}");
  report.push("```");
  report.push("");
  report.push("---");
  report.push("");
}

report.push("## Synthèse des prochaines décisions");
report.push("");
report.push("1. Valider module par module les états et transitions.");
report.push("2. Définir si certains statuts doivent être calculés et non actionnables, notamment facture.statutPaiement et commande.statut réception.");
report.push("3. Créer une `ERPRuntimeActionBar` unique.");
report.push("4. Retirer définitivement les boutons workflow de `ERPEnterpriseForm`.");
report.push("5. Convertir les workflows cibles validés en metadata runtime.");
report.push("6. Ajouter des audits bloquants : aucun bouton workflow dans formulaire, aucun lien enfant sans parent context, aucun stock modifié sans mouvement.");

write("docs/audits/Q2-OP-I6-target-runtime-workflows.md", report.join("\n"));

console.log("[Q2-OP-I6] Target runtime workflows generated");
console.log("[ROOT]", root);
console.log("[MODULES]", workflows.length);
console.log("[REPORT] docs/audits/Q2-OP-I6-target-runtime-workflows.md");
console.log("[SUMMARY]");
for (const wf of workflows) {
  console.log(
    `- ${wf.moduleKey}: states=${wf.states.length}, transitions=${wf.transitions.length}, buttons=${wf.buttons.length}`
  );
}