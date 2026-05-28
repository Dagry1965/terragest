const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function backup(file, suffix) {
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, file + suffix));
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, file));
}

/**
 * Q1-B5
 * - Ajoute les champs codeVehicule / codeRendezVous aux schemas visibles
 * - Supprime crypto.randomUUID() dans PublicAppointmentService
 * - Laisse FirestoreRuntimeMutation générer les codes via businessCode metadata
 */

const vehiculesFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "vehicules",
  "vehicules.module.ts"
);

const rdvFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

const publicServiceFile = path.join(
  ROOT,
  "src",
  "components",
  "public",
  "PublicAppointmentService.ts"
);

for (const file of [vehiculesFile, rdvFile, publicServiceFile]) {
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }
}

/**
 * 1. Ajouter codeVehicule dans vehicules.module.ts si absent.
 */
{
  backup(vehiculesFile, ".bak-q1b5-add-code-vehicule-field");

  let content = fs.readFileSync(vehiculesFile, "utf8");

  if (!content.includes('key:"codeVehicule"') && !content.includes('key: "codeVehicule"')) {
    content = content.replace(
      /fields:\s*\[/,
      `fields: [
{
        key:"codeVehicule",
        label:"Code véhicule",
        type:"text",
        required:true,
        unique:true,
        searchable:true,
        list:{ visible:true, order:1 },
        grid:{ cols:4 }
      },`
    );
  }

  write(vehiculesFile, content);
}

/**
 * 2. Ajouter codeRendezVous dans rendezvous.module.ts si absent.
 */
{
  backup(rdvFile, ".bak-q1b5-add-code-rendezvous-field");

  let content = fs.readFileSync(rdvFile, "utf8");

  if (!content.includes('key: "codeRendezVous"') && !content.includes('key:"codeRendezVous"')) {
    content = content.replace(
      /fields:\s*\[/,
      `fields: [
{
        key: "codeRendezVous",
        label: "Code rendez-vous",
        type: "text",
        required: true,
        unique: true,
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 },
      },`
    );
  }

  /**
   * Décaler les ordres existants si besoin pour garder le code en première colonne.
   */
  content = content.replace(
    /list:\s*\{\s*visible:\s*true,\s*order:\s*1\s*\}/g,
    (match, offset) => {
      const before = content.slice(Math.max(0, offset - 200), offset);
      if (before.includes("codeRendezVous")) return match;
      return "list: { visible: true, order: 2 }";
    }
  );

  write(rdvFile, content);
}

/**
 * 3. Supprimer crypto.randomUUID() du service public.
 */
{
  backup(publicServiceFile, ".bak-q1b5-remove-public-code-randomuuid");

  let content = fs.readFileSync(publicServiceFile, "utf8");

  content = content.replace(
    /\s*codeClient:\s*crypto\.randomUUID\(\),/g,
    ""
  );

  if (content.includes("codeClient: crypto.randomUUID()")) {
    console.log("[FAIL] crypto.randomUUID encore présent dans codeClient.");
    process.exit(1);
  }

  write(publicServiceFile, content);
}

console.log("");
console.log("[DONE] Q1-B5 champs codes visibles + suppression randomUUID public.");
console.log("");
console.log("Next:");
console.log("pnpm build");
