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
 * PASS 2N-Q9O
 * Remplacer le noir de sélection sidebar par du verre doux.
 */

const selectedSoftGlass =
  "rounded-[999px] border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(221,248,241,0.72))] text-[#064E3B] shadow-[0_14px_34px_rgba(0,166,138,0.14),inset_0_1px_0_rgba(255,255,255,0.78)] scale-[1.02] -translate-y-0.5";

const inactiveSoftGlass =
  "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(248,250,252,0.52))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_12px_28px_rgba(0,166,138,0.12),inset_0_1px_0_rgba(255,255,255,0.72)]";

/**
 * 1. Remplacer les états actifs noirs/sombres dans les ternaires.
 */
content = content
  .replaceAll(
    `? "bg-black text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "bg-slate-950 text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "bg-slate-900 text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "bg-[#111827] text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "bg-[#0F172A] text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "bg-[#334155] text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "rounded-2xl bg-[#334155] text-white"`,
    `? "${selectedSoftGlass}"`
  )
  .replaceAll(
    `? "rounded-[24px] bg-[#334155] text-white"`,
    `? "${selectedSoftGlass}"`
  );

/**
 * 2. Remplacer les états actifs déjà longs mais encore sombres.
 */
content = content.replace(
  /\?\s*"[^"]*(?:bg-black|bg-slate-950|bg-slate-900|bg-\[#111827\]|bg-\[#0F172A\]|bg-\[#334155\])[^"]*text-white[^"]*"/g,
  `? "${selectedSoftGlass}"`
);

/**
 * 3. Remplacer aussi les sélections vertes trop fortes si elles existent encore.
 */
content = content.replace(
  /\?\s*"[^"]*bg-\[linear-gradient\(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%\)[^"]*"/g,
  `? "${selectedSoftGlass}"`
);

content = content.replace(
  /\?\s*"[^"]*bg-\[linear-gradient\(135deg,#0EAFAA_0%,#0B8F86_100%\)[^"]*"/g,
  `? "${selectedSoftGlass}"`
);

/**
 * 4. Si les inactifs sont encore trop sombres, les remettre en verre doux.
 */
content = content
  .replaceAll(
    `: "text-[#475569] hover:bg-white/70 hover:text-[#0F172A]"`,
    `: "${inactiveSoftGlass}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`,
    `: "${inactiveSoftGlass}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:border-white/65 hover:bg-white/70 hover:text-[#0F172A]"`,
    `: "${inactiveSoftGlass}"`
  );

/**
 * 5. Sécurité : dans la sidebar, aucun bg noir ne doit rester sur les items.
 */
content = content
  .replaceAll("bg-black", "bg-[rgba(255,255,255,0.72)]")
  .replaceAll("bg-slate-950", "bg-[rgba(255,255,255,0.72)]")
  .replaceAll("bg-slate-900", "bg-[rgba(255,255,255,0.72)]")
  .replaceAll("bg-[#111827]", "bg-[rgba(255,255,255,0.72)]")
  .replaceAll("bg-[#0F172A]", "bg-[rgba(255,255,255,0.72)]")
  .replaceAll("bg-[#334155]", "bg-[rgba(255,255,255,0.72)]");

/**
 * 6. Mais on garde la sidebar elle-même en verre doux, pas blanche dure.
 */
content = content.replaceAll(
  "bg-[rgba(255,255,255,0.72)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl",
  "bg-[rgba(248,250,252,0.42)] p-3 text-[#0F172A] shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl"
);

/**
 * 7. Nettoyage.
 */
content = content
  .replaceAll("text-white", "text-[#0F172A]")
  .replaceAll("rounded-[999px] rounded-[999px]", "rounded-[999px]")
  .replaceAll("scale-[1.02] scale-[1.02]", "scale-[1.02]")
  .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5")
  .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
  .replaceAll("text-[#064E3B] text-[#064E3B]", "text-[#064E3B]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9O OK: dark selected sidebar state replaced by soft glass.");