const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(root, "src/components/erp/shell/ErpSidebar.tsx");

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q9P
 * Objectif :
 * - sélection = verre doux
 * - aucun noir résiduel derrière / autour du menu sélectionné
 * - hover respiration + vert doux conservé
 */

const selectedSoftGlass =
  "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(221,248,241,0.72))] text-[#064E3B] shadow-[0_14px_34px_rgba(0,166,138,0.14),inset_0_1px_0_rgba(255,255,255,0.78)] scale-[1.02] -translate-y-0.5";

const selectedSoftGlassModule =
  "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(221,248,241,0.68))] text-[#064E3B] shadow-[0_12px_28px_rgba(0,166,138,0.12),inset_0_1px_0_rgba(255,255,255,0.76)] scale-[1.018] -translate-y-0.5";

/**
 * 1. Remplacer toute chaîne active contenant un fond sombre.
 */
content = content.replace(
  /\?\s*"[^"]*(?:bg-black|bg-slate-950|bg-slate-900|bg-slate-800|bg-\[#020403\]|bg-\[#020807\]|bg-\[#0F172A\]|bg-\[#111827\]|bg-\[#17212F\]|bg-\[#1F2937\]|bg-\[#334155\])[^"]*"/g,
  `? "${selectedSoftGlass}"`
);

/**
 * 2. Remplacer toute chaîne active contenant text-white + shadow dark.
 */
content = content.replace(
  /\?\s*"[^"]*text-white[^"]*(?:shadow|bg)[^"]*"/g,
  `? "${selectedSoftGlass}"`
);

/**
 * 3. Remplacer les fonds noirs résiduels hors ternaires,
 * mais seulement dans ce fichier sidebar.
 */
const darkToGlassPairs = [
  ["bg-black", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-slate-950", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-slate-900", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-slate-800", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#020403]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#020807]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#0F172A]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#111827]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#17212F]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#1F2937]", "bg-[rgba(255,255,255,0.70)]"],
  ["bg-[#334155]", "bg-[rgba(255,255,255,0.70)]"],
  ["text-white", "text-[#0F172A]"],
  ["shadow-slate-950/40", "shadow-slate-300/40"],
  ["shadow-black/20", "shadow-slate-300/30"],
  ["shadow-black/30", "shadow-slate-300/30"],
  ["shadow-black/40", "shadow-slate-300/30"],
];

for (const [from, to] of darkToGlassPairs) {
  content = content.replaceAll(from, to);
}

/**
 * 4. Restaurer le shell global sidebar en verre doux,
 * car l'étape précédente peut avoir remplacé son fond.
 */
content = content.replace(
  /className="hidden h-\[calc\(100vh-1\.5rem\)\] w-72 shrink-0 overflow-hidden rounded-\[34px\] border border-white\/45 bg-\[rgba\(255,255,255,0\.70\)\] p-3 text-\[#0F172A\] shadow-\[0_24px_70px_rgba\(15,23,42,0\.10\)\] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block"/g,
  `className="hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block"`
);

content = content.replace(
  /className="hidden h-\[calc\(100vh-1\.5rem\)\] w-72 shrink-0 overflow-hidden rounded-\[34px\] border border-white\/45 bg-\[rgba\(255,255,255,0\.70\)\] p-3 text-\[#0F172A\] shadow-\[0_24px_70px_rgba\(15,23,42,0\.10\)\] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block"/g,
  `className="hidden h-[calc(100vh-1.5rem)] w-72 shrink-0 overflow-hidden rounded-[34px] border border-white/45 bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl lg:sticky lg:top-3 lg:ml-3 lg:my-3 lg:block"`
);

/**
 * 5. Corriger les éventuels modules actifs remplacés trop largement.
 */
content = content.replaceAll(
  `? "${selectedSoftGlass}"`,
  `? "${selectedSoftGlass}"`
);

/**
 * 6. Nettoyage du sous-menu : aucun fond noir.
 */
content = content
  .replaceAll(
    `className="mt-3 space-y-2 rounded-[30px] border border-white/45 bg-[rgba(255,255,255,0.70)] p-2.5 shadow-inner shadow-white/20 backdrop-blur-xl"`,
    `className="mt-3 space-y-2 rounded-[30px] border border-white/45 bg-white/30 p-2.5 shadow-inner shadow-white/20 backdrop-blur-xl"`
  )
  .replaceAll(
    `className="mt-3 space-y-1 rounded-[28px] border border-white/45 bg-[rgba(255,255,255,0.70)] p-2 shadow-inner shadow-white/20 backdrop-blur-xl"`,
    `className="mt-3 space-y-2 rounded-[30px] border border-white/45 bg-white/30 p-2.5 shadow-inner shadow-white/20 backdrop-blur-xl"`
  );

/**
 * 7. Nettoyage doublons.
 */
content = content
  .replaceAll("bg-[rgba(255,255,255,0.70)] bg-[rgba(255,255,255,0.70)]", "bg-[rgba(255,255,255,0.70)]")
  .replaceAll("text-[#0F172A] text-[#0F172A]", "text-[#0F172A]")
  .replaceAll("rounded-[999px] rounded-[999px]", "rounded-[999px]")
  .replaceAll("scale-[1.02] scale-[1.02]", "scale-[1.02]")
  .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5")
  .replaceAll("backdrop-blur-2xl backdrop-blur-2xl", "backdrop-blur-2xl");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9P OK: residual dark selected sidebar state removed.");