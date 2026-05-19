const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q10E
 * Notifications cockpit premium.
 *
 * Scope strict :
 * - remplace uniquement buildNotifications()
 * - ne touche pas RevenueChart
 * - ne touche pas la sidebar
 * - ne touche pas la config dashboard
 */

const startMarker = "function buildNotifications(";
const start = content.indexOf(startMarker);

if (start === -1) {
  console.error("buildNotifications() not found.");
  process.exit(1);
}

const openBrace = content.indexOf("{", start);

if (openBrace === -1) {
  console.error("buildNotifications() opening brace not found.");
  process.exit(1);
}

let depth = 0;
let end = -1;

for (let i = openBrace; i < content.length; i++) {
  const char = content[i];

  if (char === "{") {
    depth++;
  }

  if (char === "}") {
    depth--;

    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}

if (end === -1) {
  console.error("buildNotifications() end not found.");
  process.exit(1);
}

const cleanBuildNotifications = `function buildNotifications(widgets: DashboardWidgetResult[]): NotificationView[] {
  const notifications: NotificationView[] = [];
  const seen = new Set<string>();

  function text(value: unknown): string {
    return String(value ?? "").trim();
  }

  function firstDescription(
    widget: DashboardWidgetResult | undefined,
    fallback: string
  ): string {
    const first = widget?.items?.[0];

    return (
      text(first?.description) ||
      text(widget?.description) ||
      fallback
    );
  }

  function firstHref(
    widget: DashboardWidgetResult | undefined,
    fallback: string
  ): string {
    const first = widget?.items?.[0];

    return (
      text(first?.href) ||
      text(widget?.href) ||
      fallback
    );
  }

  function pushNotification(params: {
    keys: string[];
    title: string;
    trigger: string;
    fallbackHref: string;
    tone: NotificationView["tone"];
  }) {
    const widget = findWidget(widgets, params.keys);
    const count = widget?.items?.length ?? 0;

    if (!widget || count <= 0) {
      return;
    }

    const href = firstHref(widget, params.fallbackHref);
    const description = firstDescription(widget, params.trigger);

    if (!description || !href) {
      return;
    }

    const signature = [
      params.title,
      href,
      description,
    ].join("|");

    if (seen.has(signature)) {
      return;
    }

    seen.add(signature);

    notifications.push({
      title: count > 1 ? \`\${params.title} · \${count}\` : params.title,
      description,
      tone: params.tone,
      href,
    });
  }

  pushNotification({
    keys: ["alertes-rdv-non-confirmes"],
    title: "RDV à confirmer",
    trigger: "Déclenché par un rendez-vous créé ou planifié mais pas encore confirmé.",
    fallbackHref: "/rendezvous",
    tone: "warning",
  });

  pushNotification({
    keys: ["alertes-factures-impayees"],
    title: "Factures impayées",
    trigger: "Déclenché par une facture avec un reste à payer ou un paiement non soldé.",
    fallbackHref: "/facturesauto",
    tone: "alert",
  });

  pushNotification({
    keys: ["alertes-stock-bas"],
    title: "Stock bas",
    trigger: "Déclenché par un stock marqué faible ou en rupture.",
    fallbackHref: "/stocksauto",
    tone: "warning",
  });

  pushNotification({
    keys: ["alertes-rappels-en-retard", "prochains-rappels"],
    title: "Rappels à traiter",
    trigger: "Déclenché par un rappel arrivé à échéance ou une relance client à effectuer.",
    fallbackHref: "/rappelsauto",
    tone: "info",
  });

  pushNotification({
    keys: ["alertes-interventions-ouvertes"],
    title: "Interventions ouvertes",
    trigger: "Déclenché par une intervention atelier encore ouverte ou en cours.",
    fallbackHref: "/interventionsauto",
    tone: "warning",
  });

  pushNotification({
    keys: ["alertes-echeances-retard"],
    title: "Échéances à recouvrer",
    trigger: "Déclenché par une échéance dépassée qui n’est pas totalement payée.",
    fallbackHref: "/echeancespaiementauto",
    tone: "alert",
  });

  return notifications.slice(0, 5);
}`;

content =
  content.slice(0, start) +
  cleanBuildNotifications +
  content.slice(end);

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q10E OK: premium notifications applied.");