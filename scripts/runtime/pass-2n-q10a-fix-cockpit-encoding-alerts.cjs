const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts",
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx",
];

function abs(filePath) {
  return path.join(root, filePath);
}

function patch(filePath, updater) {
  const target = abs(filePath);

  if (!fs.existsSync(target)) {
    console.log("SKIP", filePath);
    return;
  }

  const before = fs.readFileSync(target, "utf8");
  const after = updater(before);

  if (before !== after) {
    fs.writeFileSync(target, after, "utf8");
    console.log("UPDATED", filePath);
  } else {
    console.log("NO CHANGE", filePath);
  }
}

function fixEncoding(content) {
  return content
    .replaceAll("Ã©", "é")
    .replaceAll("Ã¨", "è")
    .replaceAll("Ãª", "ê")
    .replaceAll("Ã«", "ë")
    .replaceAll("Ã ", "à")
    .replaceAll("Ã¢", "â")
    .replaceAll("Ã´", "ô")
    .replaceAll("Ã®", "î")
    .replaceAll("Ã§", "ç")
    .replaceAll("Ã‰", "É")
    .replaceAll("â€™", "’")
    .replaceAll("â€˜", "‘")
    .replaceAll("â€œ", "“")
    .replaceAll("â€", "”")
    .replaceAll("â€”", "—")
    .replaceAll("Â·", "·")
    .replaceAll("â‚£", "₣")
    .replaceAll("â–°", "▰")
    .replaceAll("â—‡", "◇")
    .replaceAll("â—ˆ", "◈")
    .replaceAll("âœ“", "✓")
    .replaceAll("â‹®", "⋮");
}

for (const file of files) {
  patch(file, fixEncoding);
}

/**
 * Corriger le KPI Alertes atelier :
 * avant : RDV + factures seulement
 * maintenant : RDV + factures + rappels + interventions + échéances
 */
patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  const oldAlertValue = `value: formatValue(
        (findWidget(widgets, ["alertes-rdv-non-confirmes"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-factures-impayees"])?.items?.length ?? 0)
      ),`;

  const newAlertValue = `value: formatValue(
        (findWidget(widgets, ["alertes-rdv-non-confirmes"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-factures-impayees"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-rappels-en-retard"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-interventions-ouvertes"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-echeances-retard"])?.items?.length ?? 0)
      ),`;

  next = next.replace(oldAlertValue, newAlertValue);

  next = next.replace(
    `subtitle: "RDV, factures et rappels à traiter",`,
    `subtitle: "RDV, factures, rappels, interventions et échéances",`
  );

  /**
   * Notifications proactives : intégrer interventions et échéances.
   */
  if (!next.includes(`const interventions =\n    findWidget(widgets, ["alertes-interventions-ouvertes"]);`)) {
    next = next.replace(
      `const rappels =
    findWidget(widgets, ["prochains-rappels"]);`,
      `const rappels =
    findWidget(widgets, ["alertes-rappels-en-retard", "prochains-rappels"]);

  const interventions =
    findWidget(widgets, ["alertes-interventions-ouvertes"]);

  const echeances =
    findWidget(widgets, ["alertes-echeances-retard"]);`
    );
  }

  if (!next.includes(`title: "Interventions ouvertes"`)) {
    next = next.replace(
      `if ((rappels?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Rappels à traiter",
      description: String(rappels?.items?.[0]?.description ?? rappels?.description ?? "Actions de relance à venir."),
      tone: "info",
      href: rappels?.href,
    });
  }`,
      `if ((rappels?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Rappels à traiter",
      description: String(rappels?.items?.[0]?.description ?? rappels?.description ?? "Actions de relance à venir."),
      tone: "info",
      href: rappels?.href,
    });
  }

  if ((interventions?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Interventions ouvertes",
      description: String(interventions?.items?.[0]?.description ?? interventions?.description ?? "Interventions à suivre à l’atelier."),
      tone: "warning",
      href: interventions?.href,
    });
  }

  if ((echeances?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Échéances à recouvrer",
      description: String(echeances?.items?.[0]?.description ?? echeances?.description ?? "Échéances en retard à traiter."),
      tone: "alert",
      href: echeances?.href,
    });
  }`
    );
  }

  /**
   * Limiter à 4 notifications au lieu de 3 pour ne pas masquer trop vite.
   */
  next = next.replace(
    `return notifications.slice(0, 3);`,
    `return notifications.slice(0, 4);`
  );

  return next;
});

console.log("PASS 2N-Q10A OK: cockpit encoding fixed and alert KPI improved.");