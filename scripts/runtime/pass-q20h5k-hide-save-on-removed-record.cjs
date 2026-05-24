const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-hide-save-on-removed-record`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-hide-save-on-removed-record`);
}

let content = fs.readFileSync(file, "utf8");

// Hide status guidance for removed records.
content = content.replace(
  /const statusGuidance\s*=\s*statusGovernance\?\.guidance\?\.\[0\] \?\? null;/,
  `const statusGuidance =
    isRemovedRecord
      ? null
      : statusGovernance?.guidance?.[0] ?? null;`
);

// Hide action-only status notice for removed records.
content = content.replace(
  /const isStatusActionOnly\s*=\s*\/\/ Q20H4D_ACTION_ONLY_STATUS_NOTICE\s*statusGovernance\?\.editMode === "action_only";/,
  `const isStatusActionOnly =
    // Q20H4D_ACTION_ONLY_STATUS_NOTICE
    !isRemovedRecord && statusGovernance?.editMode === "action_only";`
);

// Hide "Ligne confirmee" guidance for removed records if it is rendered from statusGuidance.
// Also hide the submit button itself for removed records.
content = content.replace(
  /<ERPButton\s*type="submit"\s*disabled=\{saving \|\| isRemovedRecord\}\s*>\s*\{saving\s*\? "Enregistrement\.\.\."\s*: "Enregistrer"\}\s*<\/ERPButton>/,
  `{!isRemovedRecord ? (
              <ERPButton
                type="submit"
                disabled={saving}
              >
                {saving
                  ? "Enregistrement..."
                  : "Enregistrer"}
              </ERPButton>
            ) : null}`
);

// Keep cancel/back button visible.
content = content.replaceAll(
  "disabled={saving || isRemovedRecord}",
  "disabled={saving}"
);

// But keep delete disabled for removed records.
content = content.replace(
  /variant="danger"\s*disabled=\{saving\}/,
  `variant="danger"
                disabled={saving || isRemovedRecord}`
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Save/action guidance hidden for removed records.");
console.log("Next: pnpm build");