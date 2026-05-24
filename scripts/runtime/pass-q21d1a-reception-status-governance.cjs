const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/status/RuntimeStatusGovernanceEngine.ts";
const file = path.join(ROOT, rel);
const backup = path.join(
  ROOT,
  `${rel}.bak-q21d1a-reception-status-governance`
);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d1a-reception-status-governance`);
}

let content = fs.readFileSync(file, "utf8");

if (content.includes(`moduleKey: "receptionsstockauto"`)) {
  console.log("[SKIP] receptionsstockauto governance already exists.");
  process.exit(0);
}

const insertBefore = `];

function getPolicy(moduleKey: string):`;

const policy = `  {
    moduleKey: "receptionsstockauto",
    statusField: "statut",
    editMode: "manual",
    statuses: [
      {
        key: "brouillon",
        label: "Brouillon",
        description:
          "La reception est en preparation. Elle ne declenche aucun mouvement stock.",
        visibility: "visible",
        tone: "default",
      },
      {
        key: "validee",
        label: "Validee",
        description:
          "La reception est validee. Elle cree une entree stock et ne doit plus etre modifiee librement.",
        visibility: "visible",
        tone: "success",
      },
      {
        key: "annulee",
        label: "Annulee",
        description:
          "L'annulation d'une reception validee devra passer par une action controlee avec mouvement inverse.",
        visibility: "hidden",
        tone: "danger",
      },
    ],
    guidance: [
      {
        whenStatus: "brouillon",
        title: "Reception en brouillon",
        description:
          "Verifiez la commande, le produit, le stock destination et la quantite recue avant validation.",
        tone: "warning",
      },
      {
        whenStatus: "validee",
        title: "Reception validee",
        description:
          "Cette reception a un impact stock. Les champs critiques doivent rester stables apres validation.",
        tone: "success",
      },
    ],
    technicalFields: [
      "mouvementStockId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],
  },
`;

if (!content.includes(insertBefore)) {
  console.error("[ERROR] Could not locate runtimeStatusPolicies closing marker.");
  process.exit(1);
}

content = content.replace(insertBefore, policy + insertBefore);

fs.writeFileSync(file, content, "utf8");

console.log("[Q21D1A_DONE] Reception stock status governance added.");
console.log("Next: pnpm build");