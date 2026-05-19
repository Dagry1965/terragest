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
 * PASS 2N-Q9K
 * Sidebar AMARKHYS :
 * - menus ovales type boutons bombés
 * - menu sélectionné en vert cockpit / vert flèche
 * - hover breathing doux
 * - rendu lisse premium
 */

const activeWorkspace =
  `rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white shadow-[0_14px_34px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.025]`;

const inactiveWorkspace =
  `rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.72))] hover:text-[#0F172A] hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]`;

const activeModule =
  `rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white shadow-[0_12px_28px_rgba(14,175,170,0.26),inset_0_1px_0_rgba(255,255,255,0.32)] scale-[1.02]`;

const inactiveModule =
  `rounded-[999px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(248,250,252,0.46))] text-[#475569] shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.70))] hover:text-[#0F172A] hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)]`;

/**
 * 1. Remplacer les états actifs/inactifs principaux.
 */
content = content
  .replaceAll(
    `? "rounded-[24px] border border-white/70 bg-white/85 text-[#0F172A] shadow-[0_16px_38px_rgba(15,23,42,0.12)] scale-[1.02]"`,
    `? "${activeWorkspace}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:border-white/65 hover:bg-white/70 hover:text-[#0F172A]"`,
    `: "${inactiveWorkspace}"`
  )
  .replaceAll(
    `? "rounded-2xl border border-white/60 bg-white/75 text-[#0F172A] shadow-[0_10px_28px_rgba(15,23,42,0.08)]"`,
    `? "${activeWorkspace}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`,
    `: "${inactiveWorkspace}"`
  );

/**
 * 2. Remplacer les classes de base des boutons workspace.
 */
content = content
  .replaceAll(
    `className="rounded-[24px] border border-transparent px-4 py-3 text-sm font-bold transition-all duration-300 ease-out hover:scale-[1.035] hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)] active:scale-[0.99]"`,
    `className="px-4 py-3 text-sm font-black transition-all duration-300 ease-out active:scale-[0.99]"`
  )
  .replaceAll(
    `className="rounded-2xl border border-transparent px-4 py-3 text-sm font-bold transition"`,
    `className="px-4 py-3 text-sm font-black transition-all duration-300 ease-out active:scale-[0.99]"`
  )
  .replaceAll(
    `className="rounded-2xl px-4 py-3 text-sm font-bold transition"`,
    `className="px-4 py-3 text-sm font-black transition-all duration-300 ease-out active:scale-[0.99]"`
  );

/**
 * 3. Sous-menus : états actifs/inactifs en boutons bombés aussi.
 */
content = content
  .replaceAll(
    `? "rounded-[24px] border border-white/70 bg-white/85 text-[#0F172A] shadow-[0_16px_38px_rgba(15,23,42,0.12)] scale-[1.02]"`,
    `? "${activeModule}"`
  )
  .replaceAll(
    `? "rounded-2xl border border-white/60 bg-white/75 text-[#0F172A] shadow-[0_10px_28px_rgba(15,23,42,0.08)]"`,
    `? "${activeModule}"`
  );

/**
 * 4. Remplacer classes de base des liens modules.
 */
content = content
  .replaceAll(
    `className="block rounded-[22px] border border-transparent px-4 py-2 text-sm font-semibold transition-all duration-300 ease-out hover:scale-[1.025] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/70 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] active:scale-[0.99]"`,
    `className="block px-4 py-2.5 text-sm font-bold transition-all duration-300 ease-out active:scale-[0.99]"`
  )
  .replaceAll(
    `className="block rounded-2xl px-4 py-2 text-sm font-semibold transition"`,
    `className="block px-4 py-2.5 text-sm font-bold transition-all duration-300 ease-out active:scale-[0.99]"`
  )
  .replaceAll(
    `className="block rounded-xl px-4 py-2 text-sm font-semibold transition"`,
    `className="block px-4 py-2.5 text-sm font-bold transition-all duration-300 ease-out active:scale-[0.99]"`
  );

/**
 * 5. Si le fichier utilise encore des ternaires simples pour modules,
 * renforcer les chaînes inactives.
 */
content = content
  .replaceAll(
    `: "text-[#475569] hover:border-white/65 hover:bg-white/70 hover:text-[#0F172A]"`,
    `: "${inactiveModule}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:bg-white/55 hover:text-[#0F172A]"`,
    `: "${inactiveModule}"`
  )
  .replaceAll(
    `: "text-[#475569] hover:bg-white/70 hover:text-[#0F172A]"`,
    `: "${inactiveModule}"`
  );

/**
 * 6. Sous-menu conteneur : plus aéré pour laisser voir les ovales.
 */
content = content
  .replaceAll(
    `className="mt-3 space-y-1 rounded-[28px] border border-white/45 bg-white/30 p-2 shadow-inner shadow-white/20 backdrop-blur-xl"`,
    `className="mt-3 space-y-2 rounded-[30px] border border-white/45 bg-white/24 p-2.5 shadow-inner shadow-white/20 backdrop-blur-xl"`
  );

/**
 * 7. Le cockpit / dashboard doit être vert quand sélectionné.
 * On force toutes les occurrences du style actif vers le vert cockpit.
 */
content = content
  .replaceAll("bg-[#334155] text-white", "bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white")
  .replaceAll("hover:bg-[#1F2937]", "hover:bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)]");

/**
 * 8. Nettoyage.
 */
content = content
  .replaceAll("rounded-[999px] rounded-[999px]", "rounded-[999px]")
  .replaceAll("transition-all duration-300 ease-out transition-all duration-300 ease-out", "transition-all duration-300 ease-out")
  .replaceAll("active:scale-[0.99] active:scale-[0.99]", "active:scale-[0.99]")
  .replaceAll("hover:scale-[1.035] hover:scale-[1.035]", "hover:scale-[1.035]")
  .replaceAll("hover:scale-[1.025] hover:scale-[1.025]", "hover:scale-[1.025]")
  .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
  .replaceAll("text-[#0F172A] text-[#0F172A]", "text-[#0F172A]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9K OK: sidebar pill buttons green active applied.");