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
 * PASS 2N-Q10C-TER-FIX
 * - rendre le menu ⋮ vraiment fonctionnel
 * - boutons période dorés
 * - route /encaissementsauto reconnue comme AMARKHYS
 */

patch("src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx", (content) => {
  let next = content;

  // 1. import useRef
  next = next.replace(
    `import { useEffect, useState } from "react";`,
    `import { useEffect, useRef, useState } from "react";`
  );

  // 2. WidgetShell accepte un ReactNode en action
  next = next.replace(
    `action?: string;`,
    `action?: React.ReactNode;`
  );

  next = next.replace(
    `{action ? (
          <span className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300">
            {action}
          </span>
        ) : null}`,
    `{action ? action : null}`
  );

  // 3. états menu revenus
  if (!next.includes("const [revenueMenuOpen, setRevenueMenuOpen]")) {
    next = next.replace(
      `const [loading, setLoading] = useState(true);
  const [revenuePeriod, setRevenuePeriod] = useState<7 | 30 | 90>(30);`,
      `const [loading, setLoading] = useState(true);
  const [revenuePeriod, setRevenuePeriod] = useState<7 | 30 | 90>(30);
  const [revenueMenuOpen, setRevenueMenuOpen] = useState(false);
  const revenueMenuRef = useRef<HTMLDivElement | null>(null);`
    );
  }

  // 4. fermeture clic extérieur
  if (!next.includes("AMARKHYS_REVENUE_MENU_OUTSIDE_CLICK")) {
    next = next.replace(
      `useEffect(() => {
    let mounted = true;`,
      `useEffect(() => {
    // AMARKHYS_REVENUE_MENU_OUTSIDE_CLICK
    function handleDocumentClick(event: MouseEvent) {
      if (
        revenueMenuRef.current &&
        !revenueMenuRef.current.contains(event.target as Node)
      ) {
        setRevenueMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    let mounted = true;`
    );
  }

  // 5. fonctions export/copie
  if (!next.includes("function exportRevenueCsv()")) {
    next = next.replace(
      `return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-white">`,
      `function exportRevenueCsv() {
    const rows = data.revenueHistory
      .slice(-revenuePeriod)
      .map((point) => [point.date, String(point.value)]);

    const csv = [
      "date,montant",
      ...rows.map((row) => row.join(",")),
    ].join("\\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = \`revenus-amarkhys-j\${revenuePeriod}.csv\`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    setRevenueMenuOpen(false);
  }

  async function copyRevenueSummary() {
    const visibleData = data.revenueHistory.slice(-revenuePeriod);
    const total = visibleData.reduce((sum, point) => sum + point.value, 0);
    const average = Math.round(total / Math.max(visibleData.length, 1));

    await navigator.clipboard.writeText(
      [
        \`Historique revenus AMARKHYS J-\${revenuePeriod}\`,
        \`Total : \${total.toLocaleString("fr-FR")} FCFA\`,
        \`Moyenne / jour : \${average.toLocaleString("fr-FR")} FCFA\`,
      ].join("\\n")
    );

    setRevenueMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#020403] text-white">`
    );
  }

  // 6. remplacer l’ouverture WidgetShell revenus, avec regex plus robuste
  next = next.replace(
    /<WidgetShell\s+title=\{`Historique des revenus \(J-\$\{revenuePeriod\}\)`\}\s+action="⋮"\s*>/,
    `<WidgetShell
            title={\`Historique des revenus (J-\${revenuePeriod})\`}
            action={
              <div ref={revenueMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setRevenueMenuOpen((open) => !open)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-300 transition hover:border-amber-300/30 hover:bg-amber-400/10 hover:text-amber-100"
                  aria-label="Actions historique revenus"
                >
                  ⋮
                </button>

                {revenueMenuOpen ? (
                  <div className="absolute right-0 top-11 z-30 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#101716] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                    <Link
                      href="/encaissementsauto"
                      onClick={() => setRevenueMenuOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      Voir les encaissements
                    </Link>

                    <button
                      type="button"
                      onClick={exportRevenueCsv}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      Exporter CSV
                    </button>

                    <button
                      type="button"
                      onClick={copyRevenueSummary}
                      className="block w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
                    >
                      Copier le résumé
                    </button>
                  </div>
                ) : null}
              </div>
            }
          >`
  );

  // 7. boutons période dorés
  next = next.replaceAll(
    `className="flex rounded-2xl border border-white/10 bg-white/5 p-1"`,
    `className="flex rounded-2xl border border-amber-300/15 bg-amber-400/10 p-1"`
  );

  next = next.replaceAll(
    `revenuePeriod === period
                        ? "bg-[#27F3D5] text-[#02110F]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"`,
    `revenuePeriod === period
                        ? "border border-amber-300/50 bg-amber-400/90 text-[#241A05] shadow-[0_10px_24px_rgba(245,158,11,0.20)]"
                        : "border border-transparent text-amber-100/80 hover:border-amber-300/30 hover:bg-amber-400/15 hover:text-amber-100"`
  );

  // Nettoyage import double
  next = next.replaceAll(
    `import { useEffect, useRef, useRef, useState } from "react";`,
    `import { useEffect, useRef, useState } from "react";`
  );

  return next;
});

/**
 * Correction minimale sidebar :
 * encaissementsauto doit être reconnu dans AMARKHYS.
 */
patch("src/components/erp/shell/ErpSidebar.tsx", (content) => {
  let next = content;

  if (!next.includes(`key: "encaissementsauto"`)) {
    next = next.replace(
      `  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },`,
      `  {
    key: "stocksauto",
    label: "Stocks",
    href: "/stocksauto",
  },
  {
    key: "encaissementsauto",
    label: "Encaissements",
    href: "/encaissementsauto",
  },`
    );
  }

  if (!next.includes(`pathname === "/encaissementsauto"`)) {
    next = next.replace(
      `    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/")`,
      `    pathname === "/stocksauto" ||
    pathname.startsWith("/stocksauto/") ||
    pathname === "/encaissementsauto" ||
    pathname.startsWith("/encaissementsauto/")`
    );
  }

  return next;
});

console.log("PASS 2N-Q10C-TER-FIX OK.");
