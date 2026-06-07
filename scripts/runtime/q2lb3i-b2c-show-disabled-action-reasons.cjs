const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/components/erp/runtime/ERPRuntimeActionBar.tsx";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

if (!content.includes("Q2_L_B3_I_B2C_DISABLED_ACTION_REASON")) {
  content = content.replace(
    /(\{action\.description \?[\s\S]*?\) : null\})/,
    `$1`
  );

  const buttonBlockRegex =
    /(\s*<button[\s\S]*?<\/button>)/;

  if (!buttonBlockRegex.test(content)) {
    throw new Error("[Q2-L-B3-I-B2C] Could not find button block in ERPRuntimeActionBar.tsx");
  }

  content = content.replace(
    buttonBlockRegex,
    `$1
                    {action.disabled && action.description ? (
                      <p
                        className="mt-2 max-w-[18rem] text-xs font-semibold leading-5 text-amber-700"
                        data-runtime-action-disabled-reason={action.key}
                      >
                        {/* Q2_L_B3_I_B2C_DISABLED_ACTION_REASON */}
                        {action.description}
                      </p>
                    ) : null}`
  );
}

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[Q2-L-B3-I-B2C] Done");