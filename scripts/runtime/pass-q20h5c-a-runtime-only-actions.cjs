const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleTypesPath = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "ERPModule.ts"
);

const actionEnginePath = path.join(
  root,
  "src",
  "runtime",
  "actions",
  "RuntimeActionEngine.ts"
);

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(root, file)}`);
}

function backup(file, suffix) {
  const backupPath = `${file}.bak-${suffix}`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(file, backupPath);
    console.log(`[BACKUP] ${path.relative(root, backupPath)}`);
  }
}

backup(moduleTypesPath, "q20h5c-runtime-only-actions");
backup(actionEnginePath, "q20h5c-runtime-only-actions");

let moduleTypes = read(moduleTypesPath);

if (!moduleTypes.includes("runtimeOnly?: boolean;")) {
  moduleTypes = moduleTypes.replace(
`  href?: string;
}`,
`  href?: string;

  /**
   * Action métier runtime qui n'est pas forcément une transition workflow.
   * Exemple : retirer une ligne sans réintroduire un statut utilisateur "annulée".
   */
  runtimeOnly?: boolean;
}`
  );

  write(moduleTypesPath, moduleTypes);
} else {
  console.log("[SKIP] ERPModuleAction.runtimeOnly déjà présent.");
}

let actionEngine = read(actionEnginePath);

if (!actionEngine.includes("Q20H5C_RUNTIME_ONLY_ACTIONS")) {
  const oldBlock = `      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key)
      ) {
        return false;
      }`;

  const newBlock = `      // Q20H5C_RUNTIME_ONLY_ACTIONS
      // Une action runtimeOnly est une action métier contrôlée
      // qui ne correspond pas forcément à une transition de statut.
      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key) &&
        !action.runtimeOnly
      ) {
        return false;
      }`;

  if (!actionEngine.includes(oldBlock)) {
    throw new Error("Bloc de filtrage actions/workflow introuvable.");
  }

  actionEngine = actionEngine.replace(oldBlock, newBlock);
  write(actionEnginePath, actionEngine);
} else {
  console.log("[SKIP] RuntimeActionEngine runtimeOnly déjà appliqué.");
}

console.log("");
console.log("[Q20H5C_A_DONE] Actions runtimeOnly supportées.");
console.log("");
console.log("Next:");
console.log("  pnpm build");