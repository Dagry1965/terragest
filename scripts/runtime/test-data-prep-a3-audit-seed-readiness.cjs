const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const MODULES = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "produitsauto",
  "stocksauto",
  "fournisseursauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
  "mouvementsstockauto",
  "rappelsauto",
];

const REPORT_PATH = path.join(
  ROOT,
  "docs/audits/TEST-DATA-PREP-A3-seed-readiness.md"
);

function readFileIfExists(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function extractArrayBlock(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  const startIndex = source.indexOf("[", markerIndex);

  if (startIndex === -1) {
    return "";
  }

  let depth = 0;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (char === "[") {
      depth += 1;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  return "";
}

function extractObjectBlock(source, marker) {
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return "";
  }

  const startIndex = source.indexOf("{", markerIndex);

  if (startIndex === -1) {
    return "";
  }

  let depth = 0;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (char === "{") {
      depth += 1;
    }

    if (char === "}") {
      depth -= 1;

      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  return "";
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort();
}

function extractQuotedValues(source, regex) {
  const values = [];
  let match;

  while ((match = regex.exec(source)) !== null) {
    values.push(match[1]);
  }

  return unique(values);
}

function extractFields(source) {
  const fieldsBlock =
    extractArrayBlock(source, "fields:") ||
    extractArrayBlock(source, "schema:") ||
    "";

  const keys = extractQuotedValues(fieldsBlock, /\bkey:\s*"([^"]+)"/g);
  const names = extractQuotedValues(fieldsBlock, /\bname:\s*"([^"]+)"/g);
  const labels = extractQuotedValues(fieldsBlock, /\blabel:\s*"([^"]+)"/g);

  const fieldNames = unique([...keys, ...names]);

  return {
    block: fieldsBlock,
    fieldNames,
    labels,
  };
}

function extractRelations(source) {
  const relationsBlock = extractArrayBlock(source, "relations:");

  const fields = extractQuotedValues(relationsBlock, /\bfield:\s*"([^"]+)"/g);
  const moduleKeys = extractQuotedValues(
    relationsBlock,
    /\bmoduleKey:\s*"([^"]+)"/g
  );
  const foreignKeys = extractQuotedValues(
    source,
    /\bforeignKey:\s*"([^"]+)"/g
  );

  return {
    fields,
    moduleKeys,
    foreignKeys,
  };
}

function extractChildren(source) {
  const childrenBlock = extractArrayBlock(source, "children:");

  const keys = extractQuotedValues(childrenBlock, /\bkey:\s*"([^"]+)"/g);
  const moduleKeys = extractQuotedValues(
    childrenBlock,
    /\bmoduleKey:\s*"([^"]+)"/g
  );
  const titles = extractQuotedValues(childrenBlock, /\btitle:\s*"([^"]+)"/g);
  const displayIn = extractQuotedValues(
    childrenBlock,
    /displayIn:\s*\[([^\]]*)\]/g
  );

  return {
    keys,
    moduleKeys,
    titles,
    displayIn,
  };
}

function extractOptions(source) {
  const optionLikeValues = [];

  const optionBlocks = [
    ...source.matchAll(/options:\s*\[([\s\S]*?)\]/g),
    ...source.matchAll(/values:\s*\[([\s\S]*?)\]/g),
  ];

  for (const blockMatch of optionBlocks) {
    const block = blockMatch[1] || "";

    const values = [
      ...extractQuotedValues(block, /\bvalue:\s*"([^"]+)"/g),
      ...extractQuotedValues(block, /"([^"]+)"/g),
    ];

    optionLikeValues.push(...values);
  }

  const statusLikeValues = extractQuotedValues(
    source,
    /\b(?:statut|status)[A-Za-z0-9_]*\s*[:=]\s*"([^"]+)"/g
  );

  return unique([...optionLikeValues, ...statusLikeValues]);
}

function extractMetadata(source, moduleKey) {
  const metadataBlock = extractObjectBlock(source, "metadata:");

  const keyMatch = metadataBlock.match(/\bkey:\s*"([^"]+)"/);
  const labelMatch = metadataBlock.match(/\blabel:\s*"([^"]+)"/);
  const descriptionMatch = metadataBlock.match(/\bdescription:\s*"([^"]+)"/);

  return {
    key: keyMatch ? keyMatch[1] : moduleKey,
    label: labelMatch ? labelMatch[1] : "",
    description: descriptionMatch ? descriptionMatch[1] : "",
  };
}

function classifyFields(fieldNames) {
  const lower = (value) => value.toLowerCase();

  return {
    idFields: fieldNames.filter((field) => field === "id" || field.endsWith("Id")),
    dateFields: fieldNames.filter((field) => lower(field).includes("date")),
    amountFields: fieldNames.filter((field) =>
      /(montant|total|prix|cout|reste|tva|ttc|ht)/i.test(field)
    ),
    quantityFields: fieldNames.filter((field) =>
      /(quantite|quantity|stock|seuil)/i.test(field)
    ),
    statusFields: fieldNames.filter((field) =>
      /(statut|status|etat)/i.test(field)
    ),
    codeFields: fieldNames.filter((field) =>
      /(code|numero|reference|ref)/i.test(field)
    ),
  };
}

function analyzeModule(moduleKey) {
  const filePath = path.join(
    ROOT,
    "src/runtime/modules/generated",
    moduleKey,
    `${moduleKey}.module.ts`
  );

  const source = readFileIfExists(filePath);

  if (!source) {
    return {
      moduleKey,
      filePath,
      exists: false,
    };
  }

  const metadata = extractMetadata(source, moduleKey);
  const fields = extractFields(source);
  const relations = extractRelations(source);
  const children = extractChildren(source);
  const options = extractOptions(source);
  const classified = classifyFields(fields.fieldNames);

  const lockedFields = extractQuotedValues(source, /lockedFields:\s*\[([\s\S]*?)\]/g);
  const labelFields = extractQuotedValues(
    extractArrayBlock(source, "labelFields:"),
    /"([^"]+)"/g
  );
  const subtitleFields = extractQuotedValues(
    extractArrayBlock(source, "subtitleFields:"),
    /"([^"]+)"/g
  );
  const actions = extractQuotedValues(source, /\b(?:key|id):\s*"([^"]+)"/g).filter(
    (value) =>
      /valider|payer|rappel|retirer|confirmer|annuler|terminer|generer|creer/i.test(
        value
      )
  );

  return {
    moduleKey,
    filePath,
    exists: true,
    metadata,
    fields,
    relations,
    children,
    options,
    classified,
    lockedFields,
    labelFields,
    subtitleFields,
    actions,
  };
}

function mdList(values) {
  if (!values || values.length === 0) {
    return "- Aucun élément détecté";
  }

  return values.map((value) => `- \`${value}\``).join("\n");
}

function writeReport(results) {
  const found = results.filter((result) => result.exists).length;
  const missing = results.filter((result) => !result.exists).length;

  const lines = [];

  lines.push("# TEST-DATA-PREP-A3 — Audit metadata seed readiness");
  lines.push("");
  lines.push("## Objectif");
  lines.push("");
  lines.push(
    "Auditer les modules générés AMARKHYS avant génération d’un jeu de données démo réaliste, cohérent et rejouable."
  );
  lines.push("");
  lines.push("Cette passe ne touche pas à Firestore.");
  lines.push("");
  lines.push("## Résumé");
  lines.push("");
  lines.push(`- Modules attendus : ${MODULES.length}`);
  lines.push(`- Modules trouvés : ${found}`);
  lines.push(`- Modules manquants : ${missing}`);
  lines.push("");
  lines.push("## Modules audités");
  lines.push("");

  for (const result of results) {
    lines.push(`### ${result.moduleKey}`);
    lines.push("");

    if (!result.exists) {
      lines.push("**Statut : MANQUANT**");
      lines.push("");
      lines.push(`Fichier attendu : \`${path.relative(ROOT, result.filePath)}\``);
      lines.push("");
      continue;
    }

    lines.push("**Statut : OK**");
    lines.push("");
    lines.push(`- Fichier : \`${path.relative(ROOT, result.filePath)}\``);
    lines.push(`- Metadata key : \`${result.metadata.key}\``);
    lines.push(`- Label : ${result.metadata.label || "Non détecté"}`);
    lines.push(`- Description : ${result.metadata.description || "Non détectée"}`);
    lines.push("");

    lines.push("#### Champs détectés");
    lines.push("");
    lines.push(mdList(result.fields.fieldNames));
    lines.push("");

    lines.push("#### Champs relationnels / IDs");
    lines.push("");
    lines.push(mdList(result.classified.idFields));
    lines.push("");

    lines.push("#### Champs dates");
    lines.push("");
    lines.push(mdList(result.classified.dateFields));
    lines.push("");

    lines.push("#### Champs montants/prix/totaux");
    lines.push("");
    lines.push(mdList(result.classified.amountFields));
    lines.push("");

    lines.push("#### Champs quantités/stock");
    lines.push("");
    lines.push(mdList(result.classified.quantityFields));
    lines.push("");

    lines.push("#### Champs statuts");
    lines.push("");
    lines.push(mdList(result.classified.statusFields));
    lines.push("");

    lines.push("#### Champs codes/références");
    lines.push("");
    lines.push(mdList(result.classified.codeFields));
    lines.push("");

    lines.push("#### Relations détectées");
    lines.push("");
    lines.push("- Champs relation :");
    lines.push(mdList(result.relations.fields));
    lines.push("");
    lines.push("- Modules liés :");
    lines.push(mdList(result.relations.moduleKeys));
    lines.push("");
    lines.push("- Foreign keys children :");
    lines.push(mdList(result.relations.foreignKeys));
    lines.push("");

    lines.push("#### Children / panneaux liés");
    lines.push("");
    lines.push("- Keys :");
    lines.push(mdList(result.children.keys));
    lines.push("");
    lines.push("- Modules enfants :");
    lines.push(mdList(result.children.moduleKeys));
    lines.push("");
    lines.push("- Titres :");
    lines.push(mdList(result.children.titles));
    lines.push("");

    lines.push("#### Options / valeurs détectées");
    lines.push("");
    lines.push(mdList(result.options));
    lines.push("");

    lines.push("#### Label fields");
    lines.push("");
    lines.push(mdList(result.labelFields));
    lines.push("");

    lines.push("#### Subtitle fields");
    lines.push("");
    lines.push(mdList(result.subtitleFields));
    lines.push("");

    lines.push("#### Actions runtime probables");
    lines.push("");
    lines.push(mdList(result.actions));
    lines.push("");
  }

  lines.push("## Recommandations pour A3-B");
  lines.push("");
  lines.push("- Utiliser des IDs stables préfixés par `demo-`.");
  lines.push("- Générer les relations dans l’ordre : stocks → fournisseurs → produits → clients → véhicules → commandes → lignes → réceptions → mouvements → RDV → interventions → lignes intervention → factures → encaissements → rappels.");
  lines.push("- Ne créer aucun champ absent des metadata détectées.");
  lines.push("- Respecter les champs relationnels détectés (`clientId`, `vehiculeId`, `produitId`, `stockId`, etc.).");
  lines.push("- Séparer les scénarios anciens de 3 mois et plus des scénarios récents.");
  lines.push("- Générer au minimum des cas : facture payée, facture partielle, facture en retard, rappel, intervention en cours, intervention terminée, RDV planifié, RDV confirmé, produit commandé, produit livré, produit utilisé atelier.");
  lines.push("- Prévoir un audit post-seed pour vérifier les liens, les totaux et les états.");
  lines.push("");

  lines.push("## Conclusion");
  lines.push("");
  if (missing === 0) {
    lines.push("Audit metadata terminé. Tous les modules attendus sont présents. La prochaine étape est A3-B : plan détaillé du seed réaliste.");
  } else {
    lines.push("Audit metadata terminé avec modules manquants. Corriger la liste des modules ou adapter le périmètre du seed avant A3-B.");
  }
  lines.push("");

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, lines.join("\n"), "utf8");
}

const results = MODULES.map(analyzeModule);

writeReport(results);

const found = results.filter((result) => result.exists).length;
const missing = results.filter((result) => !result.exists).length;

console.log("[TEST-DATA-PREP-A3-A] Seed readiness metadata audit");
console.log("[MODULES]", MODULES.length);
console.log("[FOUND]", found);
console.log("[MISSING]", missing);
console.log("[REPORT]", path.relative(ROOT, REPORT_PATH));

if (missing > 0) {
  process.exitCode = 1;
}