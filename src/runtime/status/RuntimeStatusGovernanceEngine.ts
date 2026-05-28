import type {
  RuntimeStatusActionDefinition,
  RuntimeStatusDefinition,
  RuntimeStatusGovernanceContext,
  RuntimeStatusGovernancePolicy,
  RuntimeStatusGovernanceResult,
  RuntimeStatusGuidanceDefinition,
} from "./RuntimeStatusGovernanceTypes";

const runtimeStatusPolicies: RuntimeStatusGovernancePolicy[] = [
  {
    moduleKey: "lignesinterventionauto",
    statusField: "statut",
    editMode: "action_only",
    statuses: [
      {
        key: "brouillon",
        label: "Brouillon",
        description:
          "La ligne est en préparation. Elle n'est pas encore comptabilisée et ne déclenche pas de sortie stock.",
        visibility: "visible",
        tone: "default",
      },
      {
        key: "validee",
        label: "Validée",
        description:
          "La ligne est confirmée. Elle est comptabilisée et peut déclencher une sortie stock si elle concerne une pièce.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "facturee",
        label: "Facturée",
        description:
          "État technique remplacé par une relation facture/document. Non exposé comme statut utilisateur.",
        visibility: "technical",
        tone: "info",
      },
      {
        key: "annulee",
        label: "Annulée",
        description:
          "État technique remplacé par une action métier de retrait contrôlé.",
        visibility: "technical",
        tone: "danger",
      },
    ],
    actions: [
      {
        key: "valider-ligne",
        label: "Valider",
        from: ["brouillon"],
        to: "validee",
        description:
          "Confirme la ligne et laisse le runtime appliquer les contrôles métier, dont le stock si nécessaire.",
        recommended: true,
      },
      {
        key: "retirer-ligne",
        label: "Retirer la ligne",
        from: ["brouillon", "validee"],
        description:
          "Action future : retirer la ligne proprement, avec correction stock si nécessaire.",
        requiresConfirmation: true,
      },
    ],
    guidance: [
      {
        status: "brouillon",
        title: "Ligne en préparation",
        message:
          "Cette ligne n'est pas encore comptabilisée. Elle ne sortira pas du stock tant qu'elle n'est pas validée.",
        tone: "warning",
      },
      {
        status: "validee",
        title: "Ligne confirmée",
        message:
          "Cette ligne est prise en compte dans l'intervention. Si c'est une pièce, le stock est traité par le runtime.",
        tone: "success",
      },
    ],
    technicalFields: [
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
      "factureId",
      "removedAt",
      "removedBy",
      "removedReason",
    ],
  },
  {
    moduleKey: "receptionsstockauto",
    statusField: "statut",
    editMode: "manual",
    statuses: [
      {
        key: "brouillon",
        label: "Brouillon",
        description:
          "La reception est en preparation. Elle ne declenche aucun mouvement stock.",
        visibility: "visible",
        tone: "default",
      },
      {
        key: "validee",
        label: "Validee",
        description:
          "La reception est validee. Elle cree une entree stock et ne doit plus etre modifiee librement.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "annulee",
        label: "Annulee",
        description:
          "L'annulation d'une reception validee devra passer par une action controlee avec mouvement inverse.",
        visibility: "hidden",
        tone: "danger",
      },
    ],
    technicalFields: [
      "mouvementStockId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],
  },  {
    moduleKey: "rendezvous",
    statusField: "statut",
    editMode: "action_only",
    statuses: [
      {
        key: "planifie",
        label: "Planifié",
        description: "Le rendez-vous est enregistré et bloque le créneau planning.",
        visibility: "visible",
        tone: "info",
      },
      {
        key: "confirme",
        label: "Confirmé",
        description: "Le rendez-vous est confirmé. Le runtime peut créer ou lier une intervention.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "en_cours",
        label: "En cours",
        description: "Le rendez-vous est en cours de traitement à l'atelier.",
        visibility: "visible",
        tone: "warning",
      },
      {
        key: "termine",
        label: "Terminé",
        description: "Le rendez-vous est terminé. La suite métier se poursuit dans l'intervention et la facture.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "annule",
        label: "Annulé",
        description: "Le rendez-vous est annulé. Le créneau n'est plus bloquant et la trace est conservée.",
        visibility: "visible",
        tone: "danger",
      },
      {
        key: "facture",
        label: "Facturé",
        description: "Ancien état technique retiré du cycle rendez-vous. La facturation appartient aux interventions/factures.",
        visibility: "technical",
        tone: "info",
      },
    ],
    actions: [
      {
        key: "Confirmer",
        label: "Confirmer",
        from: ["planifie"],
        to: "confirme",
        description: "Confirme le rendez-vous et déclenche les règles métier associées.",
        recommended: true,
      },
      {
        key: "Démarrer",
        label: "Démarrer",
        from: ["confirme"],
        to: "en_cours",
        description: "Indique que le rendez-vous est pris en charge.",
      },
      {
        key: "Terminer",
        label: "Terminer",
        from: ["en_cours"],
        to: "termine",
        description: "Clôture le rendez-vous côté planning.",
      },
      {
        key: "Annuler",
        label: "Annuler",
        from: ["planifie", "confirme", "en_cours"],
        to: "annule",
        description: "Annule le rendez-vous, conserve une trace et libère le créneau.",
      },
    ],
    guidance: [
      {
        status: "planifie",
        title: "Rendez-vous planifié",
        message: "Le créneau est réservé. Utilisez les actions pour confirmer, démarrer ou annuler.",
        tone: "info",
      },
      {
        status: "confirme",
        title: "Rendez-vous confirmé",
        message: "La confirmation pilote les règles métier, notamment la création ou liaison d'une intervention.",
        tone: "success",
      },
      {
        status: "en_cours",
        title: "Rendez-vous en cours",
        message: "Le rendez-vous est en traitement. Les modifications doivent rester cohérentes avec l'intervention liée.",
        tone: "warning",
      },
      {
        status: "termine",
        title: "Rendez-vous terminé",
        message: "Le rendez-vous est terminé. La facturation se pilote depuis l'intervention et les factures.",
        tone: "success",
      },
      {
        status: "annule",
        title: "Rendez-vous annulé",
        message: "Le rendez-vous est annulé. Il reste consultable pour historique mais ne bloque plus le planning.",
        tone: "danger",
      },
    ],
    technicalFields: [
      "consumedByInterventionId",
      "consumedAt",
      "cancelledAt",
      "cancelledBy",
      "cancelReason",
    ],
  },

];

function getPolicy(moduleKey: string): RuntimeStatusGovernancePolicy | undefined {
  return runtimeStatusPolicies.find(
    (policy) => policy.moduleKey === moduleKey
  );
}

function getCurrentStatus(
  policy: RuntimeStatusGovernancePolicy,
  record?: Record<string, unknown> | null
): string {
  const statusField = policy.statusField ?? "statut";

  return String(record?.[statusField] ?? "");
}

function filterActions(
  actions: RuntimeStatusActionDefinition[] | undefined,
  currentStatus: string
): RuntimeStatusActionDefinition[] {
  if (!actions || !currentStatus) return actions ?? [];

  return actions.filter((action) => action.from.includes(currentStatus));
}

function filterGuidance(
  guidance: RuntimeStatusGuidanceDefinition[] | undefined,
  currentStatus: string
): RuntimeStatusGuidanceDefinition[] {
  if (!guidance || !currentStatus) return guidance ?? [];

  return guidance.filter((item) => item.status === currentStatus);
}

function byVisibility(
  statuses: RuntimeStatusDefinition[],
  visibility: RuntimeStatusDefinition["visibility"]
): RuntimeStatusDefinition[] {
  return statuses.filter((status) => status.visibility === visibility);
}

export const RuntimeStatusGovernanceEngine = {
  getPolicy,

  listPolicies(): RuntimeStatusGovernancePolicy[] {
    return [...runtimeStatusPolicies];
  },

  resolve(
    context: RuntimeStatusGovernanceContext
  ): RuntimeStatusGovernanceResult | null {
    const policy = getPolicy(context.moduleKey);

    if (!policy) {
      return null;
    }

    const currentStatus = getCurrentStatus(policy, context.record);

    return {
      moduleKey: policy.moduleKey,
      statusField: policy.statusField ?? "statut",
      editMode: policy.editMode,
      visibleStatuses: byVisibility(policy.statuses, "visible"),
      technicalStatuses: byVisibility(policy.statuses, "technical"),
      hiddenStatuses: byVisibility(policy.statuses, "hidden"),
      actions: filterActions(policy.actions, currentStatus),
      guidance: filterGuidance(policy.guidance, currentStatus),
      technicalFields: policy.technicalFields ?? [],
    };
  },

  getVisibleStatusKeys(moduleKey: string): string[] {
    const policy = getPolicy(moduleKey);

    if (!policy) return [];

    return byVisibility(policy.statuses, "visible").map(
      (status) => status.key
    );
  },

  isStatusManuallyEditable(moduleKey: string): boolean {
    const policy = getPolicy(moduleKey);

    if (!policy) return true;

    return policy.editMode === "manual";
  },

  isTechnicalField(moduleKey: string, fieldKey: string): boolean {
    const policy = getPolicy(moduleKey);

    if (!policy) return false;

    return (policy.technicalFields ?? []).includes(fieldKey);
  },
};
