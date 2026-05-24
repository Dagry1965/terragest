const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-fix-q20h5k-action-buttons-block`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-fix-q20h5k-action-buttons-block`);
}

let content = fs.readFileSync(file, "utf8");

const startMarker = `            {!isRemovedRecord ? (`;
const endMarker = `                        {mode === "edit" && Boolean(initialData?.id) && sensitiveBusinessModule ? (`;

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker);

if (start === -1 || end === -1 || end <= start) {
  console.error("[ERROR] Could not locate action buttons block.");
  console.error("Inspect manually:");
  console.error("Get-Content .\\src\\components\\erp\\forms\\enterprise\\ERPEnterpriseForm.tsx | Select-Object -Skip 1868 -First 60");
  process.exit(1);
}

const cleanBlock = `            {!isRemovedRecord ? (
              <>
                <ERPButton
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? "Enregistrement..."
                    : "Enregistrer"}
                </ERPButton>

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
              </>
            ) : null}

`;

content =
  content.slice(0, start) +
  cleanBlock +
  content.slice(end);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Action buttons block repaired.");
console.log("Next: pnpm build");