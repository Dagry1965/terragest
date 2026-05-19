const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

/**
 * PASS 2N-Q10B
 * Brancher les KPI stock AMARKHYS dans le cockpit.
 *
 * Règle stock :
 * - stocks suivis = stocksauto non archivés
 * - stock bas = statut stock_faible ou rupture
 * - rupture = statut rupture
 *
 * On évite pour l’instant quantite <= seuilAlerte dans le moteur,
 * car le dashboard engine ne supporte pas encore les comparaisons de champs.
 */

patch("src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts", (content) => {
  let next = content;

  if (!next.includes(`key: "stocks-suivis"`)) {
    const insertion = `
    {
      key: "stocks-suivis",
      type: "kpi",
      moduleKey: "stocksauto",
      title: "Stocks suivis",
      description: "Lignes de stock actives suivies par le garage.",
      href: "/stocksauto",
      filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "archive",
        },
      ],
    },
    {
      key: "stocks-bas",
      type: "kpi",
      moduleKey: "stocksauto",
      title: "Stock bas",
      description: "Produits en stock faible ou en rupture.",
      href: "/stocksauto",
      filters: [
        {
          field: "statut",
          operator: "in",
          value: ["stock_faible", "rupture"],
        },
      ],
    },
    {
      key: "stocks-rupture",
      type: "kpi",
      moduleKey: "stocksauto",
      title: "Ruptures stock",
      description: "Produits déclarés en rupture.",
      href: "/stocksauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "rupture",
        },
      ],
    },
    {
      key: "alertes-stock-bas",
      type: "alert",
      moduleKey: "stocksauto",
      title: "Stock bas",
      description: "Produits en stock faible ou en rupture à réapprovisionner.",
      labelField: "produitId",
      dateField: "updatedAt",
      href: "/stocksauto",
      level: "warning",
      limit: 6,
      filters: [
        {
          field: "statut",
          operator: "in",
          value: ["stock_faible", "rupture"],
        },
      ],
    },
`;

    next = next.replace(
      `    {
      key: "quick-actions",`,
      insertion + `    {
      key: "quick-actions",`
    );
  }

  return next;
});

patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  /**
   * 1. Stock KPI : maintenant les clés existent.
   */
  next = next.replace(
    `const stock =
    findWidget(widgets, ["stocks-total", "stock-petronas", "stocks-bas"]);`,
    `const stock =
    findWidget(widgets, ["stocks-bas", "stocks-suivis", "stocks-rupture"]);`
  );

  /**
   * 2. Alertes atelier : ajouter stock bas.
   */
  next = next.replace(
    `(findWidget(widgets, ["alertes-echeances-retard"])?.items?.length ?? 0)`,
    `(findWidget(widgets, ["alertes-echeances-retard"])?.items?.length ?? 0) +
          (findWidget(widgets, ["alertes-stock-bas"])?.items?.length ?? 0)`
  );

  next = next.replace(
    `subtitle: "RDV, factures, rappels, interventions et échéances",`,
    `subtitle: "RDV, factures, rappels, interventions, échéances et stock",`
  );

  /**
   * 3. Notifications : ajouter stock bas.
   */
  if (!next.includes(`const stockBas =\n    findWidget(widgets, ["alertes-stock-bas"]);`)) {
    next = next.replace(
      `const echeances =
    findWidget(widgets, ["alertes-echeances-retard"]);`,
      `const echeances =
    findWidget(widgets, ["alertes-echeances-retard"]);

  const stockBas =
    findWidget(widgets, ["alertes-stock-bas"]);`
    );
  }

  if (!next.includes(`title: "Stock bas"`)) {
    next = next.replace(
      `if ((echeances?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Échéances à recouvrer",
      description: String(echeances?.items?.[0]?.description ?? echeances?.description ?? "Échéances en retard à traiter."),
      tone: "alert",
      href: echeances?.href,
    });
  }`,
      `if ((echeances?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Échéances à recouvrer",
      description: String(echeances?.items?.[0]?.description ?? echeances?.description ?? "Échéances en retard à traiter."),
      tone: "alert",
      href: echeances?.href,
    });
  }

  if ((stockBas?.items?.length ?? 0) > 0) {
    notifications.push({
      title: "Stock bas",
      description: String(stockBas?.items?.[0]?.description ?? stockBas?.description ?? "Produits à réapprovisionner."),
      tone: "warning",
      href: stockBas?.href,
    });
  }`
    );
  }

  /**
   * 4. Badge du bouton Stock.
   * Avant : seul Alertes avait un badge.
   * Maintenant :
   * - Stock affiche le nombre d’alertes stock
   * - Alertes affiche le nombre de notifications globales
   */
  const oldHeaderButtons = `{["Atelier", "Stock", "Alertes"].map((item, index) => (
              <button
                key={item}
                className="relative rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-[#7FFFE8]/50 hover:bg-[#0EAFAA]/15"
              >
                {item}
                {index === 2 && data.notifications.length > 0 ? (
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                    {data.notifications.length}
                  </span>
                ) : null}
              </button>
            ))}`;

  const newHeaderButtons = `{["Atelier", "Stock", "Alertes"].map((item, index) => {
              const stockCount =
                findWidget(data.widgets, ["alertes-stock-bas"])?.items?.length ?? 0;

              const badge =
                index === 1
                  ? stockCount
                  : index === 2
                    ? data.notifications.length
                    : 0;

              return (
                <button
                  key={item}
                  className="relative rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-[#7FFFE8]/50 hover:bg-[#0EAFAA]/15"
                >
                  {item}
                  {badge > 0 ? (
                    <span className={[
                      "absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-black text-white",
                      index === 1 ? "bg-amber-500" : "bg-red-500",
                    ].join(" ")}>
                      {badge}
                    </span>
                  ) : null}
                </button>
              );
            })}`;

  next = next.replace(oldHeaderButtons, newHeaderButtons);

  return next;
});

console.log("PASS 2N-Q10B OK: stock KPI and alerts wired.");