const fs = require("fs");
const path = require("path");

const root = process.cwd();

const pagePath = "src/app/(private)/produitsauto/hub/page.tsx";
const selectedPath = "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx";

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const source = full(relativePath);
  const target = `${source}.${suffix}`;

  if (!fs.existsSync(source)) {
    console.error("[MISSING]", relativePath);
    process.exit(1);
  }

  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", path.relative(root, target));
  }
}

function write(relativePath, content) {
  fs.writeFileSync(full(relativePath), content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

backup(pagePath, "bak-q2ol-a-secondary-details");
backup(selectedPath, "bak-q2ol-a-secondary-details");

let page = fs.readFileSync(full(pagePath), "utf8");

const oldSubtitle = 'subtitleFields: ["createdAt", "sourceType", "sourceId"],';
const newSubtitle = 'subtitleFields: ["createdAt", "sourceType"],';

if (!page.includes(oldSubtitle) && !page.includes(newSubtitle)) {
  console.error("[PATCH_FAILED] Mouvements subtitleFields block not found.");
  process.exit(1);
}

page = page.replace(oldSubtitle, newSubtitle);
write(pagePath, page);

let selected = fs.readFileSync(full(selectedPath), "utf8");

const oldMessage = `<p className="mt-1 text-sm text-emerald-800/80">
          Sélectionnez un élément à gauche pour afficher ses détails opérationnels.
        </p>`;

const newMessage = `<p className="mt-1 text-sm text-emerald-800/80">
          {selectedRecord
            ? "Consultez les informations op\\u00e9rationnelles li\\u00e9es \\u00e0 cet \\u00e9l\\u00e9ment."
            : "S\\u00e9lectionnez un \\u00e9l\\u00e9ment \\u00e0 gauche pour afficher ses d\\u00e9tails op\\u00e9rationnels."}
        </p>`;

if (!selected.includes(oldMessage) && !selected.includes("Consultez les informations op\\u00e9rationnelles")) {
  console.error("[PATCH_FAILED] Selected details message block not found.");
  process.exit(1);
}

selected = selected.replace(oldMessage, newMessage);

write(selectedPath, selected);

console.log("[Q2-OL-A] Product / Stock secondary details polish applied.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");