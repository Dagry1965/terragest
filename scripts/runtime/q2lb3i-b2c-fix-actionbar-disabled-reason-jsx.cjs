const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/runtime/ERPRuntimeActionBar.tsx";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

const marker = "Q2_L_B3_I_B2C_DISABLED_ACTION_REASON";

if (!content.includes(marker)) {
  console.log("[SKIP] marker not found");
  process.exit(0);
}

// Wrap the button + disabled reason in a fragment when the reason was inserted
// directly after </button>.
content = content.replace(
  /(\s*)return\s*\(\s*\n(\s*)<button([\s\S]*?<\/button>)\s*\n\s*\{action\.disabled && action\.description \? \(\s*\n\s*<p([\s\S]*?<\/p>)\s*\n\s*\) : null\}\s*\n\s*\);/m,
  (_, baseIndent, buttonIndent, buttonRest, pRest) => {
    return `${baseIndent}return (
${buttonIndent}<>
${buttonIndent}  <button${buttonRest}
${buttonIndent}  {action.disabled && action.description ? (
${buttonIndent}    <p${pRest}
${buttonIndent}  ) : null}
${buttonIndent}</>
${baseIndent});`;
  }
);

if (content === before) {
  throw new Error("[Q2-L-B3-I-B2C-FIX] Could not wrap button disabled reason. Please paste ERPRuntimeActionBar.tsx around lines 70-115.");
}

fs.writeFileSync(fullPath, content, "utf8");
console.log("[UPDATED]", file);
console.log("[Q2-L-B3-I-B2C-FIX] Done");