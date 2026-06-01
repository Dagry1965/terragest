export type RuntimeHubActionTone =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "muted";

export type RuntimeHubResolvedAction = {
  key: string;
  label: string;
  description?: string;
  href?: string;
  disabled?: boolean;
  hidden?: boolean;
  tone?: RuntimeHubActionTone;
};

export type RuntimeHubActionContext = {
  clientId?: string | null;
  clientLabel?: string | null;
  clientPhone?: string | null;
  clientEmail?: string | null;

  vehiculeId?: string | null;
  rendezvousId?: string | null;
  interventionId?: string | null;
  factureId?: string | null;

  unpaidAmount?: number;
  remainingAmount?: number;

  returnTo?: string;
};

function clean(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function hasAmount(value: number | null | undefined): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function formatMoney(value: number | null | undefined): string {
  const amount = typeof value === "number" && Number.isFinite(value) ? value : 0;

  return `${new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 0,
  }).format(amount)} FCFA`;
}

function buildHref(
  pathname: string,
  params: Record<string, string | number | null | undefined>
): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;

    const stringValue = String(value).trim();

    if (stringValue.length > 0) {
      searchParams.set(key, stringValue);
    }
  }

  const query = searchParams.toString();

  return query ? `${pathname}?${query}` : pathname;
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9]/g, "");
}

function buildWhatsAppHref(message: string, phone?: string | null): string | undefined {
  const cleanedPhone = normalizePhone(clean(phone));

  if (!cleanedPhone) {
    return undefined;
  }

  return `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;
}

function buildRelanceMessage(context: RuntimeHubActionContext, scope: "client" | "facture"): string {
  const client = clean(context.clientLabel) || "client";
  const amount =
    scope === "facture"
      ? formatMoney(context.remainingAmount)
      : formatMoney(context.unpaidAmount);

  if (scope === "facture") {
    return [
      "Bonjour " + client + ",",
      "AMARKHYS Garage vous informe qu'un solde de " + amount + " reste à régler sur votre facture.",
      "Merci de bien vouloir procéder au règlement ou nous contacter pour toute précision.",
    ].join(" ");
  }

  return [
    "Bonjour " + client + ",",
    "AMARKHYS Garage vous informe que votre compte présente un impayé de " + amount + ".",
    "Merci de bien vouloir procéder au règlement ou nous contacter pour régulariser la situation.",
  ].join(" ");
}

export class RuntimeHubActionContextAdapter {
  static resolve(context: RuntimeHubActionContext): RuntimeHubResolvedAction[] {
    const clientId = clean(context.clientId);
    const vehiculeId = clean(context.vehiculeId);
    const rendezvousId = clean(context.rendezvousId);
    const interventionId = clean(context.interventionId);
    const factureId = clean(context.factureId);
    const returnTo = clean(context.returnTo);

    const hasClientDebt = hasAmount(context.unpaidAmount);
    const hasInvoiceDebt = hasAmount(context.remainingAmount);

    const sharedContext = {
      clientId,
      vehiculeId,
      rendezvousId,
      interventionId,
      factureId,
      returnTo,
    };

    const actions: RuntimeHubResolvedAction[] = [];

    if (hasClientDebt) {
      actions.push({
        key: "hub.relancer-client",
        label: "Relancer le client",
        description: "Relance globale du client pour ses impayés.",
        href: buildWhatsAppHref(buildRelanceMessage(context, "client"), context.clientPhone),
        disabled: !clean(context.clientPhone),
        tone: "warning",
      });
    }

    if (factureId && hasInvoiceDebt) {
      actions.push({
        key: "hub.relancer-facture",
        label: "Relancer cette facture",
        description: "Relance ciblée sur la facture du parcours sélectionné.",
        href: buildWhatsAppHref(buildRelanceMessage(context, "facture"), context.clientPhone),
        disabled: !clean(context.clientPhone),
        tone: "warning",
      });

      actions.push({
        key: "hub.enregistrer-paiement",
        label: "Enregistrer paiement",
        description: "Créer un encaissement lié au client, à la facture et au parcours.",
        href: buildHref("/encaissementsauto/nouveau", sharedContext),
        tone: "success",
      });
    }

    if (interventionId) {
      actions.push({
        key: "hub.ouvrir-intervention",
        label: "Ouvrir intervention",
        description: "Ouvrir l'intervention sélectionnée en conservant le contexte client.",
        href: buildHref("/interventionsauto/" + interventionId, {
          clientId,
          vehiculeId,
          rendezvousId,
          returnTo,
        }),
        tone: "default",
      });
    }

    if (factureId) {
      actions.push({
        key: "hub.ouvrir-facture",
        label: "Ouvrir facture",
        description: "Ouvrir la facture sélectionnée en conservant le contexte client.",
        href: buildHref("/facturesauto/" + factureId, {
          clientId,
          vehiculeId,
          interventionId,
          returnTo,
        }),
        tone: "default",
      });
    }

    if (clientId) {
      actions.push({
        key: "hub.voir-encaissements",
        label: "Voir encaissements",
        description: "Consulter les encaissements liés au client.",
        href: buildHref("/encaissementsauto", {
          clientId,
          vehiculeId,
          factureId,
          returnTo,
        }),
        tone: "muted",
      });
    }

    return actions.filter((action) => !action.hidden);
  }
}
