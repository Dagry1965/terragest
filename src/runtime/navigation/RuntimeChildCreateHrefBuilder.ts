export type RuntimeChildCreateHrefBuilderInput = {
  childModuleKey: string;
  parentModuleKey: string;
  parentRecordId: string;
  parentForeignKey: string;
  prefill?: Record<string, unknown>;
  lockFields?: string[];
  returnTo?: string;
  returnLabel?: string;
};

function appendDefinedParam(
  params: URLSearchParams,
  key: string,
  value: unknown
): void {
  if (value === undefined || value === null) {
    return;
  }

  const text = String(value).trim();

  if (!text) {
    return;
  }

  params.set(key, text);
}

export function buildRuntimeChildCreateHref({
  childModuleKey,
  parentModuleKey,
  parentRecordId,
  parentForeignKey,
  prefill = {},
  lockFields = [],
  returnTo,
  returnLabel,
}: RuntimeChildCreateHrefBuilderInput): string {
  const cleanChildModuleKey = String(childModuleKey ?? "").trim();
  const cleanParentModuleKey = String(parentModuleKey ?? "").trim();
  const cleanParentRecordId = String(parentRecordId ?? "").trim();
  const cleanParentForeignKey = String(parentForeignKey ?? "").trim();

  if (!cleanChildModuleKey) {
    throw new Error("Runtime child create href requires childModuleKey.");
  }

  if (!cleanParentModuleKey) {
    throw new Error("Runtime child create href requires parentModuleKey.");
  }

  if (!cleanParentRecordId) {
    throw new Error("Runtime child create href requires parentRecordId.");
  }

  if (!cleanParentForeignKey) {
    throw new Error("Runtime child create href requires parentForeignKey.");
  }

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(prefill)) {
    appendDefinedParam(params, key, value);
  }

  params.set(cleanParentForeignKey, cleanParentRecordId);
  params.set("parentModuleKey", cleanParentModuleKey);
  params.set("parentRecordId", cleanParentRecordId);
  params.set("parentForeignKey", cleanParentForeignKey);

  if (returnTo) {
    params.set("returnTo", returnTo);
  }

  if (returnLabel) {
    params.set("returnLabel", returnLabel);
  }

  const mergedLockFields = Array.from(
    new Set(
      [cleanParentForeignKey, ...lockFields]
        .map((field) => String(field ?? "").trim())
        .filter(Boolean)
    )
  );

  if (mergedLockFields.length > 0) {
    params.set("lockFields", mergedLockFields.join(","));
  }

  return "/" + cleanChildModuleKey + "/nouveau?" + params.toString();
}

export function buildRuntimeFactureEncaissementCreateHref({
  factureId,
  clientId,
  vehiculeId,
  montant,
  datePaiement,
  statut,
  returnTo,
}: {
  factureId: string;
  clientId?: string;
  vehiculeId?: string;
  montant?: unknown;
  datePaiement?: string;
  statut?: string;
  returnTo?: string;
}): string {
  return buildRuntimeChildCreateHref({
    childModuleKey: "encaissementsauto",
    parentModuleKey: "facturesauto",
    parentRecordId: factureId,
    parentForeignKey: "factureId",
    prefill: {
      factureId,
      clientId,
      vehiculeId,
      montant,
      datePaiement,
      statut,
    },
    lockFields: ["factureId", "clientId", "vehiculeId"],
    returnTo: returnTo ?? "/facturesauto/" + encodeURIComponent(factureId) + "/edit",
    returnLabel: "Retour facture",
  });
}
