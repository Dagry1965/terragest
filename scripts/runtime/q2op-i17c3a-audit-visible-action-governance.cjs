const fs = require("fs");
const path = require("path");

const root = process.cwd();

const modules = [
  {
    key: "rendezvous",
    visibleButtons: [
      "Reporter RDV",
      "Confirmer le RDV",
      "Démarrer le RDV",
      "Terminer le RDV",
      "Annuler",
    ],
  },
  {
    key: "interventionsauto",
    visibleButtons: [
      "Demarrer intervention",
      "Démarrer l’intervention",
      "Passer en diagnostic",
      "Terminer l’intervention",
      "Générer la facture",
      "Annuler",
    ],
  },
  {
    key: "facturesauto",
    visibleButtons: [
      "Valider la facture",
      "Marquer payée",
      "Enregistrer un paiement",
      "Marquer comme envoyée",
      "Relancer le client",
      "Annuler",
      "Envoyer facture",
      "Annuler facture",
    ],
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/\brdv\b/g, "rendezvous")
    .replace(/\bl\b/g, "")
    .replace(/\ble\b/g, "")
    .replace(/\bla\b/g, "")
    .replace(/\bles\b/g, "")
    .replace(/\bune\b/g, "")
    .replace(/\bun\b/g, "")
    .replace(/\bcomme\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function intention(value) {
  const n = normalize(value);

  if (n.includes("reporter")) return "reporter";
  if (n.includes("confirmer") || n.includes("valider")) return "valider/confirmer";
  if (n.includes("demarrer")) return "demarrer";
  if (n.includes("terminer")) return "terminer";
  if (n.includes("diagnostic")) return "diagnostic";
  if (n.includes("generer") && n.includes("facture")) return "generer-facture";
  if (n.includes("envoyer") || n.includes("envoyee")) return "envoyer";
  if (n.includes("payer") || n.includes("payee") || n.includes("paiement")) return "paiement";
  if (n.includes("relancer")) return "relancer";
  if (n.includes("annuler")) return "annuler";

  return n;
}

function extractActionObjects(source, sourceFile) {
  const results = [];

  const regex =
    /key:\s*["']([^"']+)["'][\s\S]{0,500}?label:\s*["']([^"']+)["'][\s\S]{0,500}?type:\s*["']([^"']+)["']/g;

  let match;
  while ((match = regex.exec(source)) !== null) {
    results.push({
      key: match[1],
      label: match[2],
      type: match[3],
      sourceFile,
      sourceType: sourceFile.endsWith(".actions.ts") ? "actions.ts" : "module.ts",
      line: lineNumberAt(source, match.index),
      normalizedLabel: normalize(match[2]),
      intention: intention(match[2]),
      recentlyAdded:
        [
          "reporter-rdv",
          "demarrer-intervention",
          "envoyer-facture",
          "annuler-facture",
          "envoyer-commande",
          "annuler-commande",
          "valider-reception",
        ].includes(match[1]),
    });
  }

  return results;
}

function extractWorkflowLikeLabels(source, sourceFile) {
  const results = [];
  const regex = /label:\s*["']([^"']+)["']/g;

  let match;
  while ((match = regex.exec(source)) !== null) {
    const label = match[1];
    const n = normalize(label);
    const i = intention(label);

    if (
      [
        "reporter",
        "valider/confirmer",
        "demarrer",
        "terminer",
        "diagnostic",
        "generer-facture",
        "envoyer",
        "paiement",
        "relancer",
        "annuler",
      ].includes(i)
    ) {
      results.push({
        label,
        sourceFile,
        sourceType: "workflow/module-label",
        line: lineNumberAt(source, match.index),
        normalizedLabel: n,
        intention: i,
      });
    }
  }

  return results;
}

const checks = [];
const report = [];

report.push("# Q2-OP-I17-C3-A — Audit gouvernance actions visibles");
report.push("");
report.push("Objectif : identifier si les boutons visibles viennent d’actions historiques, de workflows/transitions, ou d’actions runtimeOnly ajoutées récemment.");
report.push("");

console.log("[Q2-OP-I17-C3-A] Visible runtime actions governance audit");
console.log("[ROOT]", root);
console.log("[IMPORTANT]");

for (const module of modules) {
  const moduleFile = `src/runtime/modules/generated/${module.key}/${module.key}.module.ts`;
  const actionsFile = `src/runtime/modules/generated/${module.key}/${module.key}.actions.ts`;

  const moduleSource = read(moduleFile);
  const actionsSource = read(actionsFile);

  const actions = [
    ...extractActionObjects(moduleSource, moduleFile),
    ...extractActionObjects(actionsSource, actionsFile),
  ];

  const workflowLabels = extractWorkflowLikeLabels(moduleSource, moduleFile);

  report.push(`## ${module.key}`);
  report.push("");

  report.push("### Boutons visibles transmis par le test utilisateur");
  report.push("");
  for (const visible of module.visibleButtons) {
    const visibleIntention = intention(visible);
    const candidates = [
      ...actions.filter((a) => a.intention === visibleIntention),
      ...workflowLabels.filter((a) => a.intention === visibleIntention),
    ];

    const duplicateIntentions = actions.filter((a) => a.intention === visibleIntention);

    console.log(`[VISIBLE] ${module.key} :: "${visible}" intention=${visibleIntention} candidates=${candidates.length}`);

    report.push(`#### "${visible}"`);
    report.push("");
    report.push(`- Intention normalisée : \`${visibleIntention}\``);
    report.push(`- Candidats détectés : ${candidates.length}`);
    report.push("");

    if (candidates.length === 0) {
      report.push("- Aucun candidat détecté dans module/actions.");
      checks.push({
        module: module.key,
        status: "WARN",
        message: `No source candidate for visible button ${visible}`,
      });
    } else {
      for (const candidate of candidates) {
        const key = candidate.key ? `\`${candidate.key}\`` : "(workflow label)";
        const recent = candidate.recentlyAdded ? " — RECENT_I16" : "";
        report.push(
          `- ${key} — "${candidate.label}" — ${candidate.sourceType} — ${candidate.sourceFile}:${candidate.line}${recent}`
        );
      }
    }

    if (duplicateIntentions.length > 1) {
      report.push("");
      report.push("⚠️ Doublon sémantique potentiel :");
      for (const duplicate of duplicateIntentions) {
        report.push(
          `- \`${duplicate.key}\` — "${duplicate.label}" — ${duplicate.sourceType} — recent=${duplicate.recentlyAdded}`
        );
      }

      checks.push({
        module: module.key,
        status: "WARN",
        message: `Duplicate semantic intention ${visibleIntention}`,
      });
    }

    report.push("");
  }

  report.push("### Toutes les actions extraites");
  report.push("");
  if (actions.length === 0) {
    report.push("- Aucune action extraite.");
  } else {
    for (const action of actions) {
      report.push(
        `- \`${action.key}\` — "${action.label}" — intention=\`${action.intention}\` — ${action.sourceType} — ${action.sourceFile}:${action.line} — recent=${action.recentlyAdded}`
      );
    }
  }

  report.push("");

  report.push("### Décision recommandée");
  report.push("");

  if (module.key === "facturesauto") {
    report.push("- Si `Marquer comme envoyée` existe déjà, ne pas afficher en plus `Envoyer facture`.");
    report.push("- Si `Annuler` existe déjà, ne pas afficher en plus `Annuler facture`.");
    report.push("- Garder une seule action visible par intention métier.");
  } else if (module.key === "interventionsauto") {
    report.push("- `Demarrer intervention` et `Démarrer l’intervention` semblent être le même métier.");
    report.push("- Garder la version historique si elle est déjà branchée à un workflow réel.");
    report.push("- Ne garder l’action récente que si l’action historique ne s’exécute pas.");
  } else if (module.key === "rendezvous") {
    report.push("- `Reporter RDV` existe bien comme intention reporter si détecté.");
    report.push("- Le libellé exact n’est pas prioritaire ; la présence de l’action l’est.");
  }

  report.push("");
}

const warn = checks.filter((c) => c.status === "WARN").length;

report.push("## Résumé");
report.push("");
report.push(`- WARN gouvernance : ${warn}`);
report.push("");
report.push("## Conclusion");
report.push("");
report.push("Les doublons doivent être traités par gouvernance runtime centrale, pas par formulaire.");
report.push("Décision cible : une seule action visible par intention métier et par module.");

const out = "docs/audits/Q2-OP-I17-C3-A-visible-action-governance-audit.md";
write(out, report.join("\n"));

console.log("[WARN]", warn);
console.log("[REPORT]", out);
for (const check of checks) {
  console.log(`[${check.status}] ${check.module} :: ${check.message}`);
}