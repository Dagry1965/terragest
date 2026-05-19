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
 * PASS 2N-Q9M
 * Sidebar AMARKHYS :
 * - normal : verre doux
 * - hover : respire + vert doux
 * - selected : reste gonflé + vert cockpit
 */

const selectedGreen =
  "rounded-[999px] border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_18px_42px_rgba(14,175,170,0.34),inset_0_1px_0_rgba(255,255,255,0.48)] scale-[1.035] -translate-y-0.5";

const normalGlassHoverSoftGreen =
  "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_16px_36px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]";

const selectedModuleGreen =
  "rounded-[999px] border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_32px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.025] -translate-y-0.5";

const normalModuleGlassHoverSoftGreen =
  "rounded-[999px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(248,250,252,0.46))] text-[#475569] shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#8EDFD4]/70 hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B] hover:shadow-[0_12px_28px_rgba(0,166,138,0.14),inset_0_1px_0_rgba(255,255,255,0.70)]";

/**
 * Remplacer les variantes actives existantes.
 */
content = content
  .replaceAll(
    `rounded-[999px] border border-[#27F3D5]/55 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.035] -translate-y-0.5`,
    selectedGreen
  )
  .replaceAll(
    `rounded-[999px] border border-[#27F3D5]/55 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)] scale-[1.025] -translate-y-0.5`,
    selectedModuleGreen
  )
  .replaceAll(
    `rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white shadow-[0_14px_34px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.025]`,
    selectedGreen
  )
  .replaceAll(
    `rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white shadow-[0_12px_28px_rgba(14,175,170,0.26),inset_0_1px_0_rgba(255,255,255,0.32)] scale-[1.02]`,
    selectedModuleGreen
  );

/**
 * Remplacer les variantes normales / hover existantes.
 */
content = content
  .replaceAll(
    `rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)]`,
    normalGlassHoverSoftGreen
  )
  .replaceAll(
    `rounded-[999px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(248,250,252,0.46))] text-[#475569] shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)]`,
    normalModuleGlassHoverSoftGreen
  )
  .replaceAll(
    `rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.72))] hover:text-[#0F172A] hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]`,
    normalGlassHoverSoftGreen
  )
  .replaceAll(
    `rounded-[999px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(248,250,252,0.46))] text-[#475569] shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.70))] hover:text-[#0F172A] hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)]`,
    normalModuleGlassHoverSoftGreen
  );

/**
 * Forcer les ternaires si les styles sont présents entre guillemets.
 */
content = content
  .replaceAll(
    `? "rounded-[999px] border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_18px_42px_rgba(14,175,170,0.34),inset_0_1px_0_rgba(255,255,255,0.48)] scale-[1.035] -translate-y-0.5"`,
    `? "${selectedGreen}"`
  )
  .replaceAll(
    `? "rounded-[999px] border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_32px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.025] -translate-y-0.5"`,
    `? "${selectedModuleGreen}"`
  );

/**
 * Si le hover vert cockpit brutal existe encore, le remplacer par vert doux.
 */
content = content
  .replaceAll(
    `hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F]`,
    `hover:bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] hover:text-[#064E3B]`
  )
  .replaceAll(
    `hover:border-[#27F3D5]/55`,
    `hover:border-[#8EDFD4]/70`
  )
  .replaceAll(
    `hover:shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)]`,
    `hover:shadow-[0_16px_36px_rgba(0,166,138,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]`
  )
  .replaceAll(
    `hover:shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)]`,
    `hover:shadow-[0_12px_28px_rgba(0,166,138,0.14),inset_0_1px_0_rgba(255,255,255,0.70)]`
  );

/**
 * Attention : le selected doit rester cockpit fort.
 * On remet donc les bg selected si un replace global a touché.
 */
content = content
  .replaceAll(
    `border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] text-[#064E3B] shadow-[0_18px_42px_rgba(14,175,170,0.34),inset_0_1px_0_rgba(255,255,255,0.48)] scale-[1.035] -translate-y-0.5`,
    `border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_18px_42px_rgba(14,175,170,0.34),inset_0_1px_0_rgba(255,255,255,0.48)] scale-[1.035] -translate-y-0.5`
  )
  .replaceAll(
    `border border-[#8EDFD4]/70 bg-[linear-gradient(135deg,#F8FFFC_0%,#DDF8F1_100%)] text-[#064E3B] shadow-[0_14px_32px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.025] -translate-y-0.5`,
    `border border-[#27F3D5]/60 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_32px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.025] -translate-y-0.5`
  );

/**
 * Nettoyage.
 */
content = content
  .replaceAll("hover:scale-[1.035] hover:scale-[1.035]", "hover:scale-[1.035]")
  .replaceAll("hover:scale-[1.025] hover:scale-[1.025]", "hover:scale-[1.025]")
  .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
  .replaceAll("scale-[1.035] scale-[1.035]", "scale-[1.035]")
  .replaceAll("scale-[1.025] scale-[1.025]", "scale-[1.025]")
  .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5")
  .replaceAll("text-[#064E3B] text-[#064E3B]", "text-[#064E3B]")
  .replaceAll("text-[#02110F] text-[#02110F]", "text-[#02110F]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9M OK: sidebar normal/hover/selected states refined.");