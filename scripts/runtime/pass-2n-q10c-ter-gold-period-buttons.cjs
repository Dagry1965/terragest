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
 * PASS 2N-Q10C-TER
 * - Boutons période 7J / 30J / 90J en doré doux
 * - Suppression des 3 points décoratifs du widget revenus
 */

content = content.replaceAll(
  `<WidgetShell title={\`Historique des revenus (J-\${revenuePeriod})\`} action="⋮">`,
  `<WidgetShell title={\`Historique des revenus (J-\${revenuePeriod})\`}>`
);

content = content.replaceAll(
  `className={[
                      "rounded-xl px-3 py-2 text-xs font-black transition",
                      revenuePeriod === period
                        ? "bg-[#27F3D5] text-[#02110F]"
                        : "text-slate-300 hover:bg-white/10 hover:text-white",
                    ].join(" ")}`,
  `className={[
                      "rounded-xl px-3 py-2 text-xs font-black transition",
                      revenuePeriod === period
                        ? "border border-amber-300/50 bg-amber-400/90 text-[#241A05] shadow-[0_10px_24px_rgba(245,158,11,0.20)]"
                        : "border border-transparent text-amber-100/80 hover:border-amber-300/30 hover:bg-amber-400/15 hover:text-amber-100",
                    ].join(" ")}`
);

content = content.replaceAll(
  `className="flex rounded-2xl border border-white/10 bg-white/5 p-1"`,
  `className="flex rounded-2xl border border-amber-300/15 bg-amber-400/10 p-1"`
);

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q10C-TER OK: gold period buttons and no useless dots.");