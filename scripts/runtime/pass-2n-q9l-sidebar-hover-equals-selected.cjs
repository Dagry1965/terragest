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
 * PASS 2N-Q9L
 * Sidebar :
 * - hover = respiration + vert cockpit
 * - selected = même état que hover, mais permanent
 */

const greenPillSelected =
  "rounded-[999px] border border-[#27F3D5]/55 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)] scale-[1.035] -translate-y-0.5";

const greyPillHoverGreen =
  "rounded-[999px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.58))] text-[#475569] shadow-[0_8px_22px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] hover:scale-[1.035] hover:-translate-y-0.5 hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)]";

const moduleGreenSelected =
  "rounded-[999px] border border-[#27F3D5]/55 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)] scale-[1.025] -translate-y-0.5";

const moduleGreyHoverGreen =
  "rounded-[999px] border border-white/50 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(248,250,252,0.46))] text-[#475569] shadow-[0_6px_18px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.70)] hover:scale-[1.025] hover:-translate-y-0.5 hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)]";

/**
 * 1. Remplacer anciens états actifs verts.
 */
const activePatterns = [
  /rounded-\[999px\] border border-\[#27F3D5\]\/45 bg-\[linear-gradient\(135deg,#0EAFAA_0%,#0B8F86_100%\)\] text-white shadow-\[0_14px_34px_rgba\(14,175,170,0\.28\),inset_0_1px_0_rgba\(255,255,255,0\.35\)\] scale-\[1\.025\]/g,
  /rounded-\[999px\] border border-\[#27F3D5\]\/45 bg-\[linear-gradient\(135deg,#0EAFAA_0%,#0B8F86_100%\)\] text-white shadow-\[0_12px_28px_rgba\(14,175,170,0\.26\),inset_0_1px_0_rgba\(255,255,255,0\.32\)\] scale-\[1\.02\]/g,
  /rounded-\[24px\] border border-white\/70 bg-white\/85 text-\[#0F172A\] shadow-\[0_16px_38px_rgba\(15,23,42,0\.12\)\] scale-\[1\.02\]/g,
];

for (const pattern of activePatterns) {
  content = content.replace(pattern, greenPillSelected);
}

/**
 * 2. Remplacer anciens états inactifs.
 */
const inactivePatterns = [
  /rounded-\[999px\] border border-white\/55 bg-\[linear-gradient\(135deg,rgba\(255,255,255,0\.82\),rgba\(248,250,252,0\.58\)\)\] text-\[#475569\] shadow-\[0_8px_22px_rgba\(15,23,42,0\.06\),inset_0_1px_0_rgba\(255,255,255,0\.75\)\] hover:scale-\[1\.035\] hover:-translate-y-0\.5 hover:border-\[#27F3D5\]\/35 hover:bg-\[linear-gradient\(135deg,rgba\(255,255,255,0\.95\),rgba\(221,248,241,0\.72\)\)\] hover:text-\[#0F172A\] hover:shadow-\[0_14px_34px_rgba\(15,23,42,0\.10\)\]/g,
  /rounded-\[999px\] border border-white\/50 bg-\[linear-gradient\(135deg,rgba\(255,255,255,0\.72\),rgba\(248,250,252,0\.46\)\)\] text-\[#475569\] shadow-\[0_6px_18px_rgba\(15,23,42,0\.05\),inset_0_1px_0_rgba\(255,255,255,0\.70\)\] hover:scale-\[1\.025\] hover:-translate-y-0\.5 hover:border-\[#27F3D5\]\/35 hover:bg-\[linear-gradient\(135deg,rgba\(255,255,255,0\.95\),rgba\(221,248,241,0\.70\)\)\] hover:text-\[#0F172A\] hover:shadow-\[0_10px_24px_rgba\(15,23,42,0\.09\)\]/g,
];

if (inactivePatterns[0].test(content)) {
  content = content.replace(inactivePatterns[0], greyPillHoverGreen);
}
if (inactivePatterns[1].test(content)) {
  content = content.replace(inactivePatterns[1], moduleGreyHoverGreen);
}

/**
 * 3. Remplacements simples si les chaînes sont déjà partiellement modifiées.
 */
content = content
  .replaceAll(
    `hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.72))] hover:text-[#0F172A] hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)]`,
    `hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_16px_38px_rgba(14,175,170,0.30),inset_0_1px_0_rgba(255,255,255,0.45)]`
  )
  .replaceAll(
    `hover:border-[#27F3D5]/35 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(221,248,241,0.70))] hover:text-[#0F172A] hover:shadow-[0_10px_24px_rgba(15,23,42,0.09)]`,
    `hover:border-[#27F3D5]/55 hover:bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] hover:text-[#02110F] hover:shadow-[0_14px_32px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.42)]`
  )
  .replaceAll(
    `bg-[linear-gradient(135deg,#0EAFAA_0%,#0B8F86_100%)] text-white`,
    `bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F]`
  );

/**
 * 4. Si des ternaires ont encore les styles actifs/inactifs directs, forcer.
 */
content = content
  .replaceAll(
    `? "rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_14px_34px_rgba(14,175,170,0.28),inset_0_1px_0_rgba(255,255,255,0.35)] scale-[1.025]"`,
    `? "${greenPillSelected}"`
  )
  .replaceAll(
    `? "rounded-[999px] border border-[#27F3D5]/45 bg-[linear-gradient(135deg,#27F3D5_0%,#0EAFAA_48%,#0B8F86_100%)] text-[#02110F] shadow-[0_12px_28px_rgba(14,175,170,0.26),inset_0_1px_0_rgba(255,255,255,0.32)] scale-[1.02]"`,
    `? "${moduleGreenSelected}"`
  );

/**
 * 5. Nettoyage.
 */
content = content
  .replaceAll("hover:scale-[1.035] hover:scale-[1.035]", "hover:scale-[1.035]")
  .replaceAll("hover:scale-[1.025] hover:scale-[1.025]", "hover:scale-[1.025]")
  .replaceAll("hover:-translate-y-0.5 hover:-translate-y-0.5", "hover:-translate-y-0.5")
  .replaceAll("scale-[1.035] scale-[1.035]", "scale-[1.035]")
  .replaceAll("scale-[1.025] scale-[1.025]", "scale-[1.025]")
  .replaceAll("-translate-y-0.5 -translate-y-0.5", "-translate-y-0.5")
  .replaceAll("text-[#02110F] text-[#02110F]", "text-[#02110F]");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q9L OK: sidebar hover and selected states unified.");