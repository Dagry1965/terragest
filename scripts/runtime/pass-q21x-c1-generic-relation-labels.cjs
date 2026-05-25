const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c1-generic-relation-labels`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c1-generic-relation-labels`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("Q21X_C1_GENERIC_LABEL_FIELDS")) {
  console.log("[SKIP] Q21X-C1 already installed.");
  process.exit(0);
}

const marker = `    const statusLabel = (input: string) => {`;

if (!content.includes(marker)) {
  console.error("[ERROR] Cannot locate statusLabel marker.");
  process.exit(1);
}

const helper = `    // Q21X_C1_GENERIC_LABEL_FIELDS
    // Relation labels must be metadata-driven first.
    // Module-specific fallbacks remain temporary compatibility only.
    const getModuleDefinition = () =>
      allERPModules.find(
        (item) =>
          item.metadata.key === moduleKey ||
          item.schema?.collection === moduleKey
      );

    const fieldLabelValue = (fieldKey: string) => {
      const raw = record[fieldKey];

      if (raw === null || raw === undefined || raw === "") {
        return "";
      }

      const text = String(raw).trim();

      if (!text) {
        return "";
      }

      if (
        fieldKey.toLowerCase().includes("statut") ||
        fieldKey.toLowerCase().includes("status")
      ) {
        return statusLabel(text) || text;
      }

      if (
        fieldKey.toLowerCase().includes("montant") ||
        fieldKey.toLowerCase().includes("prix")
      ) {
        const amount = Number(raw);
        return Number.isFinite(amount)
          ? amount.toLocaleString("fr-FR") + " FCFA"
          : text;
      }

      return text;
    };

    const buildLabelFromMetadata = () => {
      const moduleDefinition = getModuleDefinition();

      const labelFields =
        (moduleDefinition?.composition as { labelFields?: string[] } | undefined)
          ?.labelFields ?? [];

      const metadataLabel = compact(
        ...labelFields.map((fieldKey) => fieldLabelValue(fieldKey))
      );

      if (metadataLabel) {
        return metadataLabel;
      }

      return "";
    };

    const metadataDrivenLabel = buildLabelFromMetadata();

    if (metadataDrivenLabel) {
      return metadataDrivenLabel;
    }

`;

content = content.replace(marker, helper + marker);

// Improve the final fallback. Never show only "Enregistrement lié" if we have an id.
content = content.replace(
  `    return "Enregistrement lié";`,
  `    if (id) {
      return "Enregistrement " + id.slice(0, 8);
    }

    return "Enregistrement";`
);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21X_C1_DONE] Generic relation labels now use composition.labelFields first.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");