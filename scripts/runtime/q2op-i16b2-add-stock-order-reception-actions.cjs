const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    key: "receptionsstockauto",
    file: "src/runtime/modules/generated/receptionsstockauto/receptionsstockauto.module.ts",
    actionsBlock: `  actions: [
    {
      key: "valider-reception",
      label: "Valider reception",
      type: "primary",
      runtimeOnly: true,
      description:
        "Valide la reception, cree le mouvement de stock d'entree et met a jour le stock destination.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
    },
  ],`,
  },
  {
    key: "commandesstockauto",
    file: "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts",
    actionsBlock: `  actions: [
    {
      key: "envoyer-commande",
      label: "Envoyer commande",
      type: "primary",
      runtimeOnly: true,
      description:
        "Marque la commande comme envoyee au fournisseur sans impacter le stock.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
    },
    {
      key: "annuler-commande",
      label: "Annuler commande",
      type: "danger",
      runtimeOnly: true,
      description:
        "Annule la commande stock tout en conservant l'historique.",
      visibleWhen: {
        field: "statut",
        equals: "brouillon",
      },
    },
  ],`,
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function backup(relativePath, suffix) {
  const file = full(relativePath);

  if (!fs.existsSync(file)) {
    console.error("[MISSING]", relativePath);
    process.exit(1);
  }

  const bak = `${file}.${suffix}`;

  if (!fs.existsSync(bak)) {
    fs.copyFileSync(file, bak);
    console.log("[BACKUP]", path.relative(root, bak));
  }
}

function insertActionsBeforeFeatures(source, actionsBlock, key) {
  if (source.includes("actions: [")) {
    console.log("[SKIP]", key, "actions block already exists");
    return source;
  }

  const featuresIndex = source.indexOf("  features:");

  if (featuresIndex !== -1) {
    return (
      source.slice(0, featuresIndex) +
      actionsBlock +
      "\n\n" +
      source.slice(featuresIndex)
    );
  }

  const workflowsIndex = source.indexOf("  workflows:");

  if (workflowsIndex !== -1) {
    return (
      source.slice(0, workflowsIndex) +
      actionsBlock +
      "\n\n" +
      source.slice(workflowsIndex)
    );
  }

  const lastObjectClose = source.lastIndexOf("\n};");

  if (lastObjectClose === -1) {
    console.error("[PATCH_FAILED]", key, "could not find module object end.");
    process.exit(1);
  }

  return (
    source.slice(0, lastObjectClose) +
    "\n" +
    actionsBlock +
    source.slice(lastObjectClose)
  );
}

for (const target of targets) {
  backup(target.file, "bak-q2op-i16b2-add-actions");

  let source = fs.readFileSync(full(target.file), "utf8");

  source = insertActionsBeforeFeatures(
    source,
    target.actionsBlock,
    target.key
  );

  for (const marker of ["actions: [", "runtimeOnly: true"]) {
    if (!source.includes(marker)) {
      console.error("[PATCH_FAILED]", target.key, "missing marker:", marker);
      process.exit(1);
    }
  }

  if (target.key === "receptionsstockauto") {
    for (const marker of ["valider-reception", "Valider reception"]) {
      if (!source.includes(marker)) {
        console.error("[PATCH_FAILED]", target.key, "missing marker:", marker);
        process.exit(1);
      }
    }
  }

  if (target.key === "commandesstockauto") {
    for (const marker of [
      "envoyer-commande",
      "annuler-commande",
      "Envoyer commande",
      "Annuler commande",
    ]) {
      if (!source.includes(marker)) {
        console.error("[PATCH_FAILED]", target.key, "missing marker:", marker);
        process.exit(1);
      }
    }
  }

  fs.writeFileSync(full(target.file), source, "utf8");
  console.log("[WRITTEN]", target.file);
}

console.log("[Q2-OP-I16-B2] Runtime metadata actions added for stock order/reception modules.");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\q2op-i16b1-audit-stock-order-reception-actions.cjs");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");