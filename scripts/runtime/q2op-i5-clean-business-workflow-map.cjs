const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

function extractString(content, regex, fallback = "") {
  const match = content.match(regex);
  return match ? match[1] : fallback;
}

function extractArrayBlock(content, key) {
  const index = content.indexOf(key);
  if (index === -1) return "";

  const start = content.indexOf("[", index);
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < content.length; i++) {
    const c = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "[") depth++;
    if (c === "]") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  return "";
}

function extractObjectBlock(content, key) {
  const index = content.indexOf(key);
  if (index === -1) return "";

  const start = content.indexOf("{", index);
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < content.length; i++) {
    const c = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "{") depth++;
    if (c === "}") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  return "";
}

function extractStatusOptions(content, statusKey) {
  const keyIndex =
    content.indexOf(`key: "${statusKey}"`) !== -1
      ? content.indexOf(`key: "${statusKey}"`)
      : content.indexOf(`key: '${statusKey}'`);

  if (keyIndex === -1) return [];

  const chunk = content.slice(keyIndex, keyIndex + 2500);
  const optionsBlock = extractArrayBlock(chunk, "options");
  const options = [];
  const regex = /{\s*label:\s*["']([^"']+)["']\s*,\s*value:\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(optionsBlock))) {
    options.push({ label: match[1], value: match[2] });
  }

  return options;
}

function extractStatusFields(content) {
  const schemaBlock = extractObjectBlock(content, "schema");
  const fieldsBlock = extractArrayBlock(schemaBlock, "fields");
  const fields = [];

  const fieldRegex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?label:\s*["']([^"']+)["'][\s\S]*?type:\s*["']([^"']+)["'][\s\S]*?}/g;
  let match;

  while ((match = fieldRegex.exec(fieldsBlock))) {
    const key = match[1];
    const label = match[2];
    const type = match[3];
    const lower = key.toLowerCase();

    if (
      lower === "statut" ||
      lower === "status" ||
      lower.includes("statut") ||
      lower.includes("etat") ||
      lower.includes("état")
    ) {
      fields.push({
        key,
        label,
        type,
        options: extractStatusOptions(content, key),
        defaultValue: extractString(
          match[0],
          /defaultValue:\s*["']([^"']+)["']/,
          ""
        ),
      });
    }
  }

  return fields;
}

function extractWorkflows(content) {
  const workflowsBlock = extractArrayBlock(content, "workflows");
  const workflows = [];

  if (!workflowsBlock) return workflows;

  const workflowRegex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?label:\s*["']([^"']+)["'][\s\S]*?initialState:\s*["']([^"']+)["'][\s\S]*?transitions:\s*\[/g;
  let match;

  while ((match = workflowRegex.exec(workflowsBlock))) {
    const start = workflowsBlock.lastIndexOf("{", match.index);
    const block = workflowsBlock.slice(start, start + 6000);

    const key = match[1];
    const label = match[2];
    const initialState = match[3];

    const states = [];
    const statesBlock = extractArrayBlock(block, "states");
    const stateRegex = /{\s*key:\s*["']([^"']+)["']\s*,\s*label:\s*["']([^"']+)["'][\s\S]*?(?:color:\s*["']([^"']+)["'])?/g;
    let stateMatch;

    while ((stateMatch = stateRegex.exec(statesBlock))) {
      states.push({
        key: stateMatch[1],
        label: stateMatch[2],
        color: stateMatch[3] || "",
      });
    }

    const transitions = [];
    const transitionsBlock = extractArrayBlock(block, "transitions");
    const transitionRegex = /{\s*from:\s*["']([^"']+)["']\s*,\s*to:\s*["']([^"']+)["']\s*,\s*action:\s*["']([^"']+)["']/g;
    let transitionMatch;

    while ((transitionMatch = transitionRegex.exec(transitionsBlock))) {
      transitions.push({
        from: transitionMatch[1],
        to: transitionMatch[2],
        action: transitionMatch[3],
      });
    }

    if (transitions.length > 0 || states.length > 0) {
      workflows.push({
        key,
        label,
        initialState,
        states,
        transitions,
      });
    }
  }

  return workflows;
}

function extractRealActions(moduleFile, content) {
  const dir = path.dirname(moduleFile);
  const actionFile = path
    .join(dir, path.basename(moduleFile).replace(".module.ts", ".actions.ts"))
    .replace(/\\/g, "/");

  const actionContent = read(actionFile);
  const source = actionContent || "";

  if (!source) {
    return { actionFile: "", actions: [] };
  }

  const actions = [];
  const regex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?label:\s*["']([^"']+)["'][\s\S]*?(?:type:\s*["']([^"']+)["'])?/g;
  let match;

  while ((match = regex.exec(source))) {
    const key = match[1];
    const label = match[2];
    const type = match[3] || "";

    const looksLikeBusinessAction =
      /confirmer|démarrer|demarrer|terminer|annuler|facturer|valider|rejeter|relancer|retirer|envoyer|marquer|payer|paiement|générer|generer|ouvrir|archiver/i.test(
        key + " " + label
      );

    if (looksLikeBusinessAction) {
      actions.push({ key, label, type });
    }
  }

  const unique = new Map();

  for (const action of actions) {
    unique.set(action.key + "::" + action.label, action);
  }

  return {
    actionFile: actionFile && fs.existsSync(full(actionFile)) ? actionFile : "",
    actions: Array.from(unique.values()),
  };
}

function extractChildren(content) {
  const compositionBlock = extractObjectBlock(content, "composition");
  const childrenBlock = extractArrayBlock(compositionBlock, "children");
  const children = [];

  const regex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?moduleKey:\s*["']([^"']+)["'][\s\S]*?foreignKey:\s*["']([^"']+)["'][\s\S]*?(?:title:\s*["']([^"']+)["'])?/g;
  let match;

  while ((match = regex.exec(childrenBlock))) {
    children.push({
      key: match[1],
      moduleKey: match[2],
      foreignKey: match[3],
      title: match[4] || match[1],
      allowCreate: /allowCreate:\s*true/.test(match[0]),
      totalField: extractString(match[0], /totalField:\s*["']([^"']+)["']/, ""),
    });
  }

  return children;
}

const moduleNarratives = {
  clientsauto: {
    manages: [
      "Le dossier client automobile.",
      "L’identité, les coordonnées, le type client et le rattachement aux véhicules.",
      "Le point d’entrée de la fiche client opérationnelle.",
    ],
    expectedButtons: [
      "Ajouter un véhicule depuis le client",
      "Voir la fiche client",
      "Ouvrir la fiche opérationnelle",
    ],
    rules: [
      "Le client est un référentiel : il ne doit pas porter un workflow lourd.",
      "Le type client pilote l’affichage des véhicules : particulier en cartes, flotte/entreprise en tableau.",
      "La recherche client doit aussi permettre de retrouver par véhicule/immatriculation.",
    ],
  },

  vehicules: {
    manages: [
      "La fiche véhicule rattachée à un client.",
      "Les informations techniques : immatriculation, marque, modèle, kilométrage.",
      "Le pivot vers les rendez-vous, interventions et factures.",
    ],
    expectedButtons: [
      "Créer un rendez-vous pour ce véhicule",
      "Voir la fiche véhicule",
      "Retour fiche client opérationnelle",
    ],
    rules: [
      "Le véhicule sélectionné filtre les rendez-vous.",
      "Le véhicule sélectionné filtre les interventions après sélection du RDV.",
      "La création RDV depuis véhicule doit préremplir clientId et vehiculeId.",
    ],
  },

  rendezvous: {
    manages: [
      "La planification atelier.",
      "Le créneau, le type de service, la durée, le client et le véhicule.",
      "Le point de départ vers l’intervention.",
    ],
    expectedButtons: [
      "Confirmer RDV",
      "Démarrer RDV",
      "Terminer RDV",
      "Annuler RDV",
      "Reporter RDV",
    ],
    rules: [
      "Un RDV confirmé peut créer automatiquement une intervention.",
      "Un RDV déjà consommé ne doit pas créer une deuxième intervention.",
      "Un créneau occupé ne doit pas être proposé comme disponible.",
      "Le RDV doit conserver typeService et durationMinutes.",
      "Dans la fiche client : véhicule sélectionné → tableau RDV → RDV sélectionné → interventions filtrées.",
    ],
  },

  interventionsauto: {
    manages: [
      "L’exécution atelier sur un véhicule.",
      "Le lien RDV/client/véhicule.",
      "Le pivot vers lignes d’intervention, facture et encaissements.",
    ],
    expectedButtons: [
      "Démarrer intervention",
      "Passer en diagnostic",
      "Terminer intervention",
      "Générer facture",
      "Annuler intervention",
    ],
    rules: [
      "L’intervention est créée depuis un RDV confirmé.",
      "Une intervention terminée peut générer une facture.",
      "Les champs hérités RDV/client/véhicule doivent être verrouillés.",
      "Les lignes validées alimentent les montants de l’intervention.",
    ],
  },

  lignesinterventionauto: {
    manages: [
      "Les pièces, services et main-d’œuvre d’une intervention.",
      "Les quantités, prix, TVA, montants et impact stock éventuel.",
      "La base des totaux intervention/facture.",
    ],
    expectedButtons: [
      "Valider la ligne",
      "Retirer la ligne",
    ],
    rules: [
      "brouillon : ne compte pas dans les totaux.",
      "validée : compte dans les totaux.",
      "retirée : reste auditée mais ne compte pas.",
      "Une pièce validée peut déclencher une sortie stock.",
      "Le type article doit venir du produit, pas être choisi librement sur la ligne.",
    ],
  },

  facturesauto: {
    manages: [
      "La preuve commerciale liée à une intervention.",
      "Les montants HT/TTC, TVA, montant payé, reste à payer.",
      "Le statut facture et le statut paiement.",
      "Les encaissements et échéances liés.",
    ],
    expectedButtons: [
      "Valider facture",
      "Envoyer facture",
      "Annuler facture",
      "Voir historique encaissements",
      "Ajouter paiement via historique encaissements",
    ],
    rules: [
      "La facture est créée depuis une intervention terminée.",
      "Les montants facture viennent des lignes validées.",
      "Le statut paiement est calculé depuis les encaissements.",
      "Une action paiement ne doit pas être dupliquée.",
      "Un encaissement doit être créé avec contexte parent facture.",
    ],
  },

  encaissementsauto: {
    manages: [
      "Le paiement réel reçu sur une facture.",
      "Le montant encaissé, la date, le mode de paiement, le reçu.",
      "La mise à jour financière de la facture.",
    ],
    expectedButtons: [
      "Valider encaissement",
      "Rejeter encaissement",
      "Annuler encaissement",
      "Envoyer reçu",
    ],
    rules: [
      "Un encaissement doit être créé depuis sa facture parent.",
      "Le lien doit transporter parentModuleKey, parentRecordId et parentForeignKey.",
      "Un encaissement validé met à jour montant payé, reste à payer et statut paiement facture.",
      "factureId, clientId et vehiculeId doivent être préremplis/verrouillés.",
    ],
  },

  echeancespaiementauto: {
    manages: [
      "Les échéances et plans de paiement liés à une facture.",
      "Les relances de paiement.",
      "Le suivi des montants prévus/payés.",
    ],
    expectedButtons: [
      "Marquer payée",
      "Relancer client",
      "Annuler échéance",
    ],
    rules: [
      "Une échéance doit être liée à une facture.",
      "Une échéance payée doit contribuer au suivi financier.",
      "Une relance doit être auditée.",
    ],
  },

  produitsauto: {
    manages: [
      "Le catalogue produits, pièces, services et consommables.",
      "Le type article, famille, prix, TVA, caractère stockable.",
      "La donnée source pour lignes d’intervention, stock et commandes.",
    ],
    expectedButtons: [
      "Créer stock associé",
      "Voir hub produit/stock",
      "Archiver produit",
    ],
    rules: [
      "Le produit porte le type article.",
      "Un produit stockable doit pouvoir être lié à un stock.",
      "Un produit non stockable ne doit pas déclencher de mouvement stock obligatoire.",
      "Le choix produit doit auto-remplir type article, désignation et prix snapshot.",
    ],
  },

  stocksauto: {
    manages: [
      "L’état courant du stock par produit/emplacement.",
      "La quantité disponible et les seuils.",
      "La conséquence des mouvements stock.",
    ],
    expectedButtons: [
      "Voir mouvements",
      "Créer correction stock contrôlée",
    ],
    rules: [
      "Le stock ne doit pas être modifié sans mouvement.",
      "Les entrées/sorties/corrections doivent passer par mouvementsstockauto.",
      "Les seuils doivent déclencher alertes stock faible.",
    ],
  },

  mouvementsstockauto: {
    manages: [
      "La preuve de variation stock.",
      "Entrées, sorties, corrections, réintégrations.",
      "Les quantités avant/après et la source métier.",
    ],
    expectedButtons: [
      "Valider mouvement",
      "Annuler mouvement si autorisé",
    ],
    rules: [
      "Un mouvement stock doit porter sourceModule et sourceId.",
      "Il doit conserver quantiteAvant et quantiteApres.",
      "Il est la seule preuve fiable de modification stock.",
    ],
  },

  fournisseursauto: {
    manages: [
      "Le référentiel fournisseur.",
      "Les informations de contact fournisseur.",
      "Le point d’entrée des commandes stock.",
    ],
    expectedButtons: [
      "Créer commande fournisseur",
      "Voir commandes fournisseur",
    ],
    rules: [
      "Un fournisseur peut être actif/inactif.",
      "Les commandes stock doivent être rattachées à un fournisseur.",
    ],
  },

  commandesstockauto: {
    manages: [
      "L’intention d’achat stock.",
      "Le fournisseur, les lignes de commande, les montants.",
      "Le suivi avant réception réelle.",
    ],
    expectedButtons: [
      "Valider commande",
      "Envoyer commande",
      "Créer réception",
      "Annuler commande",
    ],
    rules: [
      "La commande est une intention d’achat, pas une entrée stock.",
      "Envoyer une commande ne modifie pas le stock.",
      "Les montants doivent venir des lignes de commande.",
      "Le statut de réception doit être calculé depuis les réceptions.",
    ],
  },

  lignescommandestockauto: {
    manages: [
      "Les produits et quantités commandés.",
      "Le prix d’achat snapshot.",
      "La base de réception stock.",
    ],
    expectedButtons: [
      "Valider ligne commande",
      "Annuler ligne commande",
    ],
    rules: [
      "La ligne commande ne choisit pas le stock destination.",
      "Produit choisi → désignation/prix achat snapshot.",
      "Une ligne déjà réceptionnée ne doit pas être proposée à nouveau sauf réception partielle gérée.",
    ],
  },

  receptionsstockauto: {
    manages: [
      "L’entrée réelle de stock.",
      "Le lien commande, ligne commande, produit et stock destination.",
      "La création du mouvement stock entrant.",
    ],
    expectedButtons: [
      "Valider réception",
      "Annuler réception",
    ],
    rules: [
      "Réception validée → mouvement stock entrée.",
      "Mouvement créé → stock augmenté.",
      "mouvementStockId empêche le double traitement.",
      "Le stock destination est choisi selon le produit.",
    ],
  },
};

function transitionEffect(moduleKey, transition) {
  const text = `${transition.action} ${transition.from} ${transition.to}`.toLowerCase();

  if (moduleKey === "rendezvous" && text.includes("confirm")) {
    return "Confirme le créneau et peut déclencher la création d’une intervention.";
  }

  if (moduleKey === "rendezvous" && text.includes("annul")) {
    return "Annule le rendez-vous et doit libérer ou neutraliser le créneau.";
  }

  if (moduleKey === "interventionsauto" && (text.includes("termin") || text.includes("factur"))) {
    return "Clôture l’intervention et peut déclencher la génération de la facture.";
  }

  if (moduleKey === "lignesinterventionauto" && text.includes("valid")) {
    return "Rend la ligne comptabilisable dans les totaux et éventuellement dans le stock.";
  }

  if (moduleKey === "facturesauto" && (text.includes("paiement") || text.includes("paye"))) {
    return "Met à jour l’état financier de la facture selon les encaissements.";
  }

  if (moduleKey === "encaissementsauto" && text.includes("valid")) {
    return "Valide le paiement et recalcule la facture liée.";
  }

  if (moduleKey === "receptionsstockauto" && text.includes("valid")) {
    return "Transforme la réception en entrée réelle de stock.";
  }

  return "Transition métier contrôlée par le runtime. Les effets doivent être exécutés par les règles/services runtime.";
}

function walkModules(relativeDir, results = []) {
  const absolute = full(relativeDir);
  if (!fs.existsSync(absolute)) return results;

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const abs = path.join(absolute, entry.name);
    const rel = path.relative(root, abs).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      walkModules(rel, results);
      continue;
    }

    if (entry.name.endsWith(".module.ts")) {
      results.push(rel);
    }
  }

  return results;
}

const priorityOrder = Object.keys(moduleNarratives);

const modules = walkModules("src/runtime/modules/generated").map((file) => {
  const content = read(file);

  const moduleKey =
    extractString(content, /metadata:\s*{[\s\S]*?key:\s*["']([^"']+)["']/, "") ||
    path.basename(file).replace(".module.ts", "");

  const label =
    extractString(content, /metadata:\s*{[\s\S]*?label:\s*["']([^"']+)["']/, moduleKey);

  const description =
    extractString(content, /description:\s*["']([^"']+)["']/, "");

  const actionsInfo = extractRealActions(file, content);

  return {
    file,
    moduleKey,
    label,
    description,
    statusFields: extractStatusFields(content),
    workflows: extractWorkflows(content),
    actions: actionsInfo.actions,
    actionFile: actionsInfo.actionFile,
    children: extractChildren(content),
    narrative: moduleNarratives[moduleKey] || {
      manages: ["Module détecté. Rôle métier à préciser."],
      expectedButtons: ["Actions runtime à définir selon le processus."],
      rules: [
        "Les statuts doivent être pilotés par runtime.",
        "Les boutons ne doivent pas être dans le formulaire.",
      ],
    },
  };
});

modules.sort((a, b) => {
  const ia = priorityOrder.indexOf(a.moduleKey);
  const ib = priorityOrder.indexOf(b.moduleKey);

  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;

  return a.moduleKey.localeCompare(b.moduleKey);
});

const report = [];

report.push("# Q2-OP-I5 — Carte métier nettoyée modules / statuts / workflows / règles");
report.push("");
report.push("Cette version ne confond plus les champs avec des workflows ou des actions.");
report.push("");
report.push("## Doctrine");
report.push("");
report.push("- Un champ n’est pas un workflow.");
report.push("- Un onglet, une section, un KPI ou un filtre n’est pas une action métier.");
report.push("- Un bouton métier correspond à une transition ou à une opération contrôlée.");
report.push("- Les boutons métier apparaissent dans une barre runtime hors formulaire.");
report.push("- Les formulaires ne portent pas les workflows.");
report.push("- Les statuts ne sont pas des commandes libres.");
report.push("");

for (const module of modules) {
  report.push(`## ${module.label} — \`${module.moduleKey}\``);
  report.push("");
  report.push(`- Fichier : \`${module.file}\``);
  if (module.actionFile) {
    report.push(`- Fichier actions : \`${module.actionFile}\``);
  }
  if (module.description) {
    report.push(`- Description : ${module.description}`);
  }
  report.push("");

  report.push("### 1. Ce que le module gère");
  report.push("");
  for (const line of module.narrative.manages) {
    report.push(`- ${line}`);
  }
  report.push("");

  report.push("### 2. Statuts");
  report.push("");
  if (module.statusFields.length === 0) {
    report.push("- Aucun champ de statut détecté.");
  } else {
    for (const field of module.statusFields) {
      report.push(`#### \`${field.key}\` — ${field.label}`);
      if (field.defaultValue) {
        report.push(`- Valeur initiale : \`${field.defaultValue}\``);
      }
      if (field.options.length > 0) {
        report.push("- Valeurs :");
        for (const option of field.options) {
          report.push(`  - \`${option.value}\` : ${option.label}`);
        }
      } else {
        report.push("- Valeurs non détectées automatiquement.");
      }
      report.push("");
    }
  }

  report.push("### 3. Workflows réels détectés");
  report.push("");
  if (module.workflows.length === 0) {
    report.push("- Aucun workflow réel déclaré détecté.");
  } else {
    for (const workflow of module.workflows) {
      report.push(`#### ${workflow.label || workflow.key}`);
      if (workflow.initialState) {
        report.push(`- État initial : \`${workflow.initialState}\``);
      }
      if (workflow.states.length > 0) {
        report.push("- États :");
        for (const state of workflow.states) {
          report.push(`  - \`${state.key}\` : ${state.label}${state.color ? ` (${state.color})` : ""}`);
        }
      }
      if (workflow.transitions.length > 0) {
        report.push("");
        report.push("| Départ | Bouton/action | Arrivée | Effet métier | Apparition bouton |");
        report.push("|---|---|---|---|---|");
        for (const transition of workflow.transitions) {
          report.push(
            `| \`${transition.from}\` | ${transition.action} | \`${transition.to}\` | ${transitionEffect(module.moduleKey, transition)} | Barre d’actions runtime, hors formulaire |`
          );
        }
      } else {
        report.push("- Aucun passage d’état détecté.");
      }
    }
  }
  report.push("");

  report.push("### 4. Boutons métier attendus");
  report.push("");
  for (const button of module.narrative.expectedButtons) {
    report.push(`- ${button}`);
  }
  report.push("");
  report.push("Emplacement cible : barre d’actions runtime, jamais dans le formulaire.");
  report.push("");

  report.push("### 5. Actions métier réellement détectées");
  report.push("");
  if (module.actions.length === 0) {
    report.push("- Aucune action métier réelle détectée automatiquement dans le fichier actions.");
  } else {
    report.push("| Key | Label | Type |");
    report.push("|---|---|---|");
    for (const action of module.actions) {
      report.push(`| \`${action.key}\` | ${action.label} | ${action.type || "-"} |`);
    }
  }
  report.push("");

  report.push("### 6. Règles métier détaillées");
  report.push("");
  for (const rule of module.narrative.rules) {
    report.push(`- ${rule}`);
  }
  report.push("");

  report.push("### 7. Relations parent/enfant");
  report.push("");
  if (module.children.length === 0) {
    report.push("- Aucun enfant de composition détecté.");
  } else {
    report.push("| Panneau | Module enfant | Clé étrangère | Création | Total |");
    report.push("|---|---|---|---:|---|");
    for (const child of module.children) {
      report.push(
        `| ${child.title} | \`${child.moduleKey}\` | \`${child.foreignKey}\` | ${child.allowCreate ? "oui" : "non"} | ${child.totalField || "-"} |`
      );
    }
  }
  report.push("");

  report.push("### 8. Ce que le module doit gérer automatiquement");
  report.push("");
  if (module.moduleKey === "rendezvous") {
    report.push("- Vérifier les conflits planning.");
    report.push("- Créer une intervention après confirmation si applicable.");
    report.push("- Empêcher la double création d’intervention.");
  } else if (module.moduleKey === "interventionsauto") {
    report.push("- Agréger les lignes validées.");
    report.push("- Déclencher la facture à la fin de l’intervention.");
  } else if (module.moduleKey === "facturesauto") {
    report.push("- Recalculer montant payé, reste à payer et statut paiement.");
    report.push("- Afficher encaissements et échéances comme enfants runtime.");
  } else if (module.moduleKey === "encaissementsauto") {
    report.push("- Mettre à jour la facture parent.");
    report.push("- Conserver la preuve de paiement.");
  } else if (module.moduleKey.includes("stock") || module.moduleKey.includes("mouvement")) {
    report.push("- Garantir qu’aucune variation stock n’existe sans mouvement.");
    report.push("- Conserver source métier, quantité avant et quantité après.");
  } else {
    report.push("- Appliquer les règles runtime du module.");
    report.push("- Respecter parent/enfant, verrouillage et audit.");
  }
  report.push("");

  report.push("### 9. Ce qui ne doit pas être dans le formulaire");
  report.push("");
  report.push("- Boutons workflow.");
  report.push("- Boutons de transition statut.");
  report.push("- Créations automatiques.");
  report.push("- Modifications directes de champs calculés.");
  report.push("- Liens enfants construits sans contexte parent.");
  report.push("");
  report.push("---");
  report.push("");
}

const reportPath = "docs/audits/Q2-OP-I5-clean-business-workflow-map.md";
write(reportPath, report.join("\n"));

console.log("[Q2-OP-I5] Clean business workflow map generated");
console.log("[ROOT]", root);
console.log("[MODULES]", modules.length);
console.log("[REPORT]", reportPath);
console.log("[SUMMARY]");
for (const module of modules) {
  const transitions = module.workflows.reduce(
    (sum, workflow) => sum + workflow.transitions.length,
    0
  );
  console.log(
    `- ${module.moduleKey}: statusFields=${module.statusFields.length}, workflows=${module.workflows.length}, transitions=${transitions}, realActions=${module.actions.length}, children=${module.children.length}`
  );
}