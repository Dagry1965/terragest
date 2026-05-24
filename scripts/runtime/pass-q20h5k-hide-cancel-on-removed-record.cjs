const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q20h5k-hide-cancel-on-removed-record`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q20h5k-hide-cancel-on-removed-record`);
}

let content = fs.readFileSync(file, "utf8");

// Hide the secondary cancel/back button on removed records.
// We keep the page fully read-only and without action buttons.
content = content.replace(
  /<ERPButton\s+variant="secondary"\s+type="button"[\s\S]*?<\/ERPButton>/,
  `{!isRemovedRecord ? (
              <ERPButton
                variant="secondary"
                type="button"
                disabled={saving}
                onClick={() =>
                  router.push(
                    returnTo ??
                      module.metadata.routes?.list ??
                      \`/\${module.metadata.key}\`
                  )
                }
              >
                Annuler
              </ERPButton>
            ) : null}`
);

// Safety: removed records must never show submit.
content = content.replace(
  /<ERPButton\s+type="submit"[\s\S]*?<\/ERPButton>/,
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

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Removed records no longer show save/cancel buttons.");
console.log("Next: pnpm build");