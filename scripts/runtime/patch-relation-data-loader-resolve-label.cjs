const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "lifecycle",
  "ERPRelationDataLoader.ts"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes("static async resolveLabel(")) {
  console.log("resolveLabel already exists");
  process.exit(0);
}

const method = `
  static async resolveLabel(
    moduleKey: string,
    id: string
  ): Promise<string> {
    if (!moduleKey || !id) {
      return "";
    }

    const module = allERPModules.find(
      (item) => item.metadata.key === moduleKey
    );

    if (!module) {
      return "";
    }

    try {
      const record =
        await RuntimeDataBinding.detail(
          module,
          id
        );

      if (!record) {
        return "";
      }

      return ERPRelationDataLoader.getLabel(
        record as Record<string, unknown>
      );
    } catch {
      return "";
    }
  }

`;

const marker = "  static getLabel(record: Record<string, unknown>) {";

if (!content.includes(marker)) {
  console.error("static getLabel marker not found");
  process.exit(1);
}

content = content.replace(
  marker,
  method + marker
);

if (!content.includes(`const numeroFacture = value("numeroFacture");`)) {
  content = content.replace(
    `    const numero = value("numero");`,
    `    const numero = value("numero");
    const numeroFacture = value("numeroFacture");
    const dateFacture = value("dateFacture");
    const montantTTC = value("montantTTC");`
  );
}

if (!content.includes("Factures AMARKHYS")) {
  content = content.replace(
    `    /**
     * Contrats / factures / documents métier
     */`,
    `    /**
     * Factures AMARKHYS
     */
    const factureLabel = compact(
      numeroFacture || reference || numero,
      montantTTC ? montantTTC + " FCFA" : "",
      dateFacture
    );

    if (factureLabel) {
      return factureLabel;
    }

    /**
     * Contrats / factures / documents métier
     */`
  );

  content = content.replace(
    `    /**
     * Contrats / factures / documents mÃ©tier
     */`,
    `    /**
     * Factures AMARKHYS
     */
    const factureLabel = compact(
      numeroFacture || reference || numero,
      montantTTC ? montantTTC + " FCFA" : "",
      dateFacture
    );

    if (factureLabel) {
      return factureLabel;
    }

    /**
     * Contrats / factures / documents métier
     */`
  );
}

content = content
  .replaceAll("VÃ©hicules", "Véhicules")
  .replaceAll("propriÃ©taires", "propriétaires")
  .replaceAll("oÃ¹", "où")
  .replaceAll("dÃ©jÃ", "déjà")
  .replaceAll("mÃ©tier", "métier");

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED src/runtime/modules/lifecycle/ERPRelationDataLoader.ts");
console.log("DONE patch relation data loader resolveLabel");