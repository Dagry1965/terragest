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
 * PASS 2N-Q10C-QUATER
 * - garder menu revenus fonctionnel
 * - retirer Encaissements ajouté à la sidebar
 * - ne plus forcer /encaissementsauto dans AMARKHYS maintenant
 * - adoucir boutons 7J / 30J / 90J comme "RDV à confirmer"
 */

/**
 * 1. Retirer l'ajout Encaissements de la sidebar.
 */
patch("src/components/erp/shell/ErpSidebar.tsx", (content) => {
  let next = content;

  next = next.replace(
`  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },
  {
    key: "encaissementsauto",
    label: "Encaissements",
    href: "/encaissementsauto",
  },`,
`  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },`
  );

  next = next.replace(
`    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/") ||
    pathname === "/encaissementsauto" ||
    pathname.startsWith("/encaissementsauto/")`,
`    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/")`
  );

  return next;
});

/**
 * 2. Adoucir les boutons période dans le cockpit.
 * Couleur proche notification "RDV à confirmer" :
 * border-amber-400/20 bg-amber-500/18
 */
patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  next = next.replaceAll(
    `className="flex rounded-2xl border border-amber-300/15 bg-amber-400/10 p-1"`,
    `className="flex rounded-2xl border border-amber-400/20 bg-amber-500/10 p-1"`
  );

  next = next.replaceAll(
    `revenuePeriod === period
                        ? "border border-amber-300/50 bg-amber-400/90 text-[#241A05] shadow-[0_10px_24px_rgba(245,158,11,0.20)]"
                        : "border border-transparent text-amber-100/80 hover:border-amber-300/30 hover:bg-amber-400/15 hover:text-amber-100"`,
    `revenuePeriod === period
                        ? "border border-amber-400/25 bg-amber-500/18 text-amber-100"
                        : "border border-transparent text-amber-100/70 hover:border-amber-400/20 hover:bg-amber-500/14 hover:text-amber-100"`
  );

  /**
   * Au cas où les classes ont été partiellement modifiées.
   */
  next = next
    .replaceAll("bg-amber-400/90 text-[#241A05]", "bg-amber-500/18 text-amber-100")
    .replaceAll("border-amber-300/50", "border-amber-400/25")
    .replaceAll("shadow-[0_10px_24px_rgba(245,158,11,0.20)]", "")
    .replaceAll("hover:bg-amber-400/15", "hover:bg-amber-500/14")
    .replaceAll("hover:border-amber-300/30", "hover:border-amber-400/20");

  next = next
    .replaceAll("  ", " ")
    .replaceAll("className=\" ", "className=\"");

  return next;
});

console.log("PASS 2N-Q10C-QUATER OK: sidebar reverted and period controls softened.");