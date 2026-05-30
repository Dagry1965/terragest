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

function walk(relativeDir, results = []) {
  const absoluteDir = full(relativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolute = path.join(absoluteDir, entry.name);
    const relative = path.relative(root, absolute).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist", "coverage"].includes(entry.name)) {
        continue;
      }

      walk(relative, results);
      continue;
    }

    if (entry.name.endsWith(".module.ts")) {
      results.push(relative);
    }
  }

  return results;
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

function extractFieldBlocks(schemaBlock) {
  const fieldsBlock = extractArrayBlock(schemaBlock, "fields");
  const fields = [];
  let cursor = 0;

  while (cursor < fieldsBlock.length) {
    const keyIndex = fieldsBlock.indexOf("key:", cursor);
    if (keyIndex === -1) break;

    const objectStart = fieldsBlock.lastIndexOf("{", keyIndex);
    if (objectStart === -1) break;

    let depth = 0;
    let inString = false;
    let quote = "";
    let escaped = false;
    let objectEnd = -1;

    for (let i = objectStart; i < fieldsBlock.length; i++) {
      const c = fieldsBlock[i];

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
        objectEnd = i + 1;
        break;
      }
    }

    if (objectEnd === -1) break;

    const block = fieldsBlock.slice(objectStart, objectEnd);
    const key = extractString(block, /key:\s*["']([^"']+)["']/, "");
    const label = extractString(block, /label:\s*["']([^"']+)["']/, key);
    const type = extractString(block, /type:\s*["']([^"']+)["']/, "");
    const defaultValue = extractString(block, /defaultValue:\s*["']([^"']+)["']/, "");

    if (key) {
      fields.push({
        key,
        label,
        type,
        defaultValue,
        block,
      });
    }

    cursor = objectEnd;
  }

  return fields;
}

function extractOptions(block) {
  const optionsBlock = extractArrayBlock(block, "options");
  const options = [];

  const regex = /{\s*label:\s*["']([^"']+)["']\s*,\s*value:\s*["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(optionsBlock))) {
    options.push({
      label: match[1],
      value: match[2],
    });
  }

  return options;
}

function extractWorkflows(content) {
  const workflowsBlock = extractArrayBlock(content, "workflows");
  const workflows = [];

  if (!workflowsBlock) return workflows;

  let cursor = 0;

  while (cursor < workflowsBlock.length) {
    const keyIndex = workflowsBlock.indexOf("key:", cursor);
    if (keyIndex === -1) break;

    const objectStart = workflowsBlock.lastIndexOf("{", keyIndex);
    if (objectStart === -1) break;

    let depth = 0;
    let inString = false;
    let quote = "";
    let escaped = false;
    let objectEnd = -1;

    for (let i = objectStart; i < workflowsBlock.length; i++) {
      const c = workflowsBlock[i];

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
        objectEnd = i + 1;
        break;
      }
    }

    if (objectEnd === -1) break;

    const block = workflowsBlock.slice(objectStart, objectEnd);
    const key = extractString(block, /key:\s*["']([^"']+)["']/, "");
    const label = extractString(block, /label:\s*["']([^"']+)["']/, key);
    const initialState = extractString(block, /initialState:\s*["']([^"']+)["']/, "");

    const statesBlock = extractArrayBlock(block, "states");
    const states = [];
    const stateRegex = /{\s*key:\s*["']([^"']+)["']\s*,\s*label:\s*["']([^"']+)["'][\s\S]*?(?:color:\s*["']([^"']+)["'])?/g;
    let stateMatch;

    while ((stateMatch = stateRegex.exec(statesBlock))) {
      states.push({
        key: stateMatch[1],
        label: stateMatch[2],
        color: stateMatch[3] || "",
      });
    }

    const transitionsBlock = extractArrayBlock(block, "transitions");
    const transitions = [];
    const transitionRegex = /{\s*from:\s*["']([^"']+)["']\s*,\s*to:\s*["']([^"']+)["']\s*,\s*action:\s*["']([^"']+)["']/g;
    let transitionMatch;

    while ((transitionMatch = transitionRegex.exec(transitionsBlock))) {
      transitions.push({
        from: transitionMatch[1],
        to: transitionMatch[2],
        action: transitionMatch[3],
      });
    }

    workflows.push({
      key,
      label,
      initialState,
      states,
      transitions,
    });

    cursor = objectEnd;
  }

  return workflows;
}

function extractActions(moduleFile, content) {
  const dir = path.dirname(moduleFile);
  const base = path.basename(moduleFile).replace(".module.ts", ".actions.ts");
  const actionFile = path.join(dir, base).replace(/\\/g, "/");
  const actionContent = read(actionFile);
  const combined = content + "\n" + actionContent;

  const actions = [];
  const regex = /{\s*key:\s*["']([^"']+)["'][\s\S]*?label:\s*["']([^"']+)["'][\s\S]*?(?:type:\s*["']([^"']+)["'])?/g;
  let match;

  while ((match = regex.exec(combined))) {
    const key = match[1];
    const label = match[2];
    const type = match[3] || "";

    if (!key || !label) continue;

    actions.push({
      key,
      label,
      type,
    });
  }

  const unique = new Map();
  for (const action of actions) {
    unique.set(action.key + "::" + action.label, action);
  }

  return {
    actionFile: fs.existsSync(full(actionFile)) ? actionFile : "",
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

function processDefinition(moduleKey) {
  const map = {
    clientsauto: {
      manages: [
        "Le dossier client automobile.",
        "Les informations d’identité, contact, type client, relation avec les véhicules.",
        "Point d’entrée de la fiche opérationnelle client."
      ],
      statusRules: [
        "Le client est généralement un référentiel. Il ne doit pas porter trop de workflow métier lourd.",
        "Le type client influence l’affichage : particulier en cartes, flotte/entreprise en tableau compact."
      ],
      effects: [
        "Sélection client → filtre les véhicules.",
        "Création véhicule depuis client → client prérempli et verrouillé.",
        "Recherche client/voiture → ouvre la fiche opérationnelle client."
      ],
    },
    vehicules: {
      manages: [
        "Le véhicule rattaché à un client.",
        "La fiche technique : marque, modèle, immatriculation, kilométrage, carburant.",
        "Le véhicule sert de pivot vers RDV, interventions, factures."
      ],
      statusRules: [
        "Le statut véhicule doit indiquer sa disponibilité ou son état de suivi, pas déclencher seul des effets métier.",
        "La sélection d’un véhicule dans la fiche client doit filtrer les rendez-vous puis les interventions."
      ],
      effects: [
        "Véhicule sélectionné → tableau des rendez-vous du véhicule.",
        "Création RDV depuis véhicule → véhicule et client préremplis.",
        "Navigation fiche véhicule → conserve le contexte retour vers la fiche client."
      ],
    },
    rendezvous: {
      manages: [
        "La demande ou planification de passage atelier.",
        "Le créneau, le service souhaité, la durée, le client et le véhicule.",
        "Le point de départ vers l’intervention."
      ],
      statusRules: [
        "Le RDV confirmé est un état métier fort.",
        "Un statut RDV ne doit pas être changé librement si cela déclenche des effets.",
        "Un RDV consommé ne doit pas recréer une deuxième intervention."
      ],
      effects: [
        "RDV confirmé → création automatique d’une intervention liée.",
        "RDV planifié → occupe un créneau planning.",
        "RDV annulé/reporté → doit libérer ou déplacer le créneau selon le moteur planning.",
        "Dans la fiche client, sélection d’un RDV → filtre le bloc interventions."
      ],
    },
    interventionsauto: {
      manages: [
        "L’exécution atelier sur un véhicule.",
        "Le lien avec le RDV, le client, le véhicule.",
        "Le point central vers les lignes, factures et encaissements."
      ],
      statusRules: [
        "L’intervention représente l’avancement réel des travaux.",
        "Les champs hérités du RDV/client/véhicule doivent être verrouillés.",
        "Une intervention terminée peut déclencher la facture."
      ],
      effects: [
        "Intervention créée depuis RDV confirmé.",
        "Intervention terminée → facture générée automatiquement.",
        "Intervention sélectionnée → affiche lignes d’intervention, facture et encaissements."
      ],
    },
    lignesinterventionauto: {
      manages: [
        "Les lignes de détail d’une intervention : pièce, service, main-d’œuvre.",
        "Les quantités, prix unitaires, montants et éventuels impacts stock.",
        "Les totaux qui alimentent intervention/facture."
      ],
      statusRules: [
        "brouillon : ligne en préparation, non comptabilisée.",
        "validée : ligne confirmée, comptabilisée dans les totaux.",
        "retirée : ligne écartée mais conservée pour audit.",
        "Les lignes brouillon ou retirées ne doivent pas compter dans les montants."
      ],
      effects: [
        "Validation ligne → entre dans les totaux.",
        "Validation ligne pièce → peut déclencher sortie stock.",
        "Retrait ligne → peut réintégrer stock si mouvement existant.",
        "ERPRelatedRecordsPanel doit afficher les totaux des lignes validées."
      ],
    },
    facturesauto: {
      manages: [
        "La preuve commerciale liée à une intervention.",
        "Les montants HT/TTC, TVA, statut facture, statut paiement.",
        "Le lien vers encaissements et échéances."
      ],
      statusRules: [
        "statutFacture : cycle commercial de la facture.",
        "statutPaiement : état financier calculé depuis les encaissements.",
        "Les montants doivent être calculés, pas saisis librement.",
        "Un paiement ne doit pas modifier une facture hors contexte."
      ],
      effects: [
        "Intervention terminée → facture créée.",
        "Encaissement validé → montant payé et reste à payer recalculés.",
        "Somme encaissements >= total TTC → facture payée.",
        "Facture partiellement payée → statut partiel.",
        "Facture sans encaissement → en attente."
      ],
    },
    encaissementsauto: {
      manages: [
        "Le paiement réel reçu sur une facture.",
        "Le montant payé, date paiement, mode paiement, reçu, transaction.",
        "La preuve financière qui met à jour la facture."
      ],
      statusRules: [
        "Un encaissement doit être créé depuis sa facture parent.",
        "Un encaissement validé est comptabilisé.",
        "Le formulaire doit recevoir factureId, clientId, vehiculeId préremplis et verrouillés."
      ],
      effects: [
        "Création encaissement → met à jour facture.",
        "Encaissement lié à facture → recalcule montant payé et reste à payer.",
        "Le lien de création doit toujours transporter parentModuleKey, parentRecordId, parentForeignKey."
      ],
    },
    produitsauto: {
      manages: [
        "Le catalogue article/service atelier.",
        "La désignation, type article, famille, prix, caractère stockable.",
        "Le produit pilote les lignes d’intervention, stocks et commandes."
      ],
      statusRules: [
        "Le type article doit être porté par le produit, pas librement par la ligne.",
        "Stockable/non stockable pilote les comportements stock.",
        "Les prix et champs calculés doivent être protégés selon le contexte."
      ],
      effects: [
        "Choix produit dans ligne → type article et prix auto-remplis.",
        "Produit stockable → sélection/contrôle du stock.",
        "Produit non stockable → pas de mouvement stock obligatoire."
      ],
    },
    stocksauto: {
      manages: [
        "L’état courant du stock par produit/emplacement.",
        "La quantité disponible, seuils, valeur stock.",
        "La lecture du stock résultant des mouvements."
      ],
      statusRules: [
        "Le stock n’est pas une saisie libre.",
        "currentStock / quantite doivent être pilotés par mouvements.",
        "Les stocks faibles doivent être détectés via seuils."
      ],
      effects: [
        "Mouvement entrée → augmente stock.",
        "Mouvement sortie → diminue stock.",
        "Correction → ajuste stock avec audit.",
        "Aucune modification stock sans mouvement."
      ],
    },
    mouvementsstockauto: {
      manages: [
        "La preuve de variation stock.",
        "Entrée, sortie, correction, réintégration.",
        "Les quantités avant/après et la source métier."
      ],
      statusRules: [
        "Un mouvement validé matérialise une variation.",
        "Le mouvement doit porter sourceModule/sourceId.",
        "Un mouvement ne doit pas être modifié pour maquiller un stock."
      ],
      effects: [
        "Réception validée → mouvement entrée.",
        "Ligne intervention validée pièce → mouvement sortie.",
        "Ligne retirée avec stock mouvement → mouvement inverse."
      ],
    },
    fournisseursauto: {
      manages: [
        "Le référentiel fournisseur.",
        "Identité, contact, conditions, relation avec commandes stock.",
        "Point d’entrée achat."
      ],
      statusRules: [
        "Référentiel peu workflow.",
        "Le fournisseur peut être actif/inactif selon besoin."
      ],
      effects: [
        "Fournisseur sélectionné → commandes stock filtrées.",
        "Commande stock créée depuis fournisseur → fournisseur prérempli."
      ],
    },
    commandesstockauto: {
      manages: [
        "L’intention d’achat stock.",
        "Le fournisseur, les lignes de commande, montants calculés.",
        "Le cycle brouillon/envoyée."
      ],
      statusRules: [
        "brouillon : commande préparée.",
        "envoyée : intention d’achat transmise.",
        "La commande ne modifie pas le stock.",
        "Les statuts de réception doivent être calculés depuis les réceptions, pas manipulés librement."
      ],
      effects: [
        "Commande envoyée → fige l’intention.",
        "Lignes commande validées → base des réceptions possibles.",
        "Réception réelle → seule elle impacte le stock."
      ],
    },
    lignescommandestockauto: {
      manages: [
        "Le détail produit/quantité/prix d’une commande stock.",
        "La base des réceptions stock.",
        "Les montants de commande."
      ],
      statusRules: [
        "brouillon : ligne préparée.",
        "validée : ligne confirmée et réceptionnable.",
        "La ligne de commande ne choisit pas le stock destination."
      ],
      effects: [
        "Choix produit → designation/prix achat snapshot.",
        "Ligne validée → peut être proposée dans réception.",
        "Ligne déjà réceptionnée → doit être exclue sauf réception partielle gérée."
      ],
    },
    receptionsstockauto: {
      manages: [
        "L’entrée réelle de stock à partir d’une commande.",
        "Le lien commande, ligne commande, produit, stock destination.",
        "La preuve opérationnelle avant mouvement stock."
      ],
      statusRules: [
        "brouillon : réception préparée.",
        "validée : réception réelle confirmée.",
        "Une réception validée ne doit pas être traitée deux fois."
      ],
      effects: [
        "Réception validée → crée mouvement stock entrée.",
        "Mouvement créé → stock augmenté.",
        "mouvementStockId renseigné → anti double traitement."
      ],
    },
    echeancespaiementauto: {
      manages: [
        "Les échéances ou plans de paiement liés à une facture.",
        "Les montants prévus/payés, date échéance, relances.",
        "Le suivi de paiement échelonné."
      ],
      statusRules: [
        "Une échéance doit être liée à une facture.",
        "Le paiement d’échéance doit contribuer à l’état financier de la facture selon règles."
      ],
      effects: [
        "Échéance créée depuis facture → factureId/client/vehicule hérités.",
        "Échéance payée → peut créer ou référencer un encaissement."
      ],
    },
  };

  return map[moduleKey] || {
    manages: [
      "Module détecté automatiquement.",
      "Le rôle métier détaillé doit être confirmé selon le processus."
    ],
    statusRules: [
      "Les statuts éventuels doivent rester pilotés par actions runtime.",
      "Les changements d’état ne doivent pas être des modifications libres du formulaire."
    ],
    effects: [
      "Effets métier à confirmer dans les règles runtime.",
      "Relations parent/enfant à gérer via composition et contexte parent."
    ],
  };
}

function inspectModule(file) {
  const content = read(file);
  const schemaBlock = extractObjectBlock(content, "schema");
  const fields = extractFieldBlocks(schemaBlock);

  const moduleKey =
    extractString(content, /metadata:\s*{[\s\S]*?key:\s*["']([^"']+)["']/, "") ||
    path.basename(file).replace(".module.ts", "");

  const label =
    extractString(content, /metadata:\s*{[\s\S]*?label:\s*["']([^"']+)["']/, moduleKey);

  const description =
    extractString(content, /description:\s*["']([^"']+)["']/, "");

  const statusFields = fields
    .filter((field) => {
      const key = field.key.toLowerCase();
      return key === "statut" || key === "status" || key.includes("statut") || key.includes("etat") || key.includes("état");
    })
    .map((field) => ({
      ...field,
      options: extractOptions(field.block),
    }));

  const workflows = extractWorkflows(content);
  const actionsData = extractActions(file, content);
  const children = extractChildren(content);
  const business = processDefinition(moduleKey);

  return {
    file,
    moduleKey,
    label,
    description,
    statusFields,
    workflows,
    actions: actionsData.actions,
    actionFile: actionsData.actionFile,
    children,
    business,
  };
}

function transitionEffect(moduleKey, transition) {
  const action = transition.action.toLowerCase();
  const from = transition.from;
  const to = transition.to;

  if (moduleKey === "rendezvous" && (to.includes("confirm") || action.includes("confirm"))) {
    return "Le RDV devient confirmé. Le runtime doit vérifier le planning, puis créer ou lier une intervention si elle n’existe pas déjà.";
  }

  if (moduleKey === "rendezvous" && (to.includes("annul") || action.includes("annul"))) {
    return "Le RDV est annulé. Le créneau ne doit plus être considéré comme occupé sauf règle contraire.";
  }

  if (moduleKey === "interventionsauto" && (to.includes("term") || action.includes("termin"))) {
    return "L’intervention est terminée. Le runtime peut créer la facture liée avec les montants issus des lignes validées.";
  }

  if (moduleKey === "facturesauto" && (to.includes("paye") || action.includes("finaliser"))) {
    return "La facture devient payée. Cela doit résulter des encaissements, pas d’un simple changement manuel.";
  }

  if (moduleKey === "facturesauto" && (to.includes("partiel") || action.includes("paiement"))) {
    return "La facture devient partiellement payée. Le montant payé et le reste à payer doivent être recalculés.";
  }

  if (moduleKey === "lignesinterventionauto" && (to.includes("valid") || action.includes("valid"))) {
    return "La ligne devient comptabilisable. Elle entre dans les totaux et peut impacter le stock selon le type produit.";
  }

  if (moduleKey === "receptionsstockauto" && (to.includes("valid") || action.includes("valid"))) {
    return "La réception devient réelle. Le runtime crée un mouvement stock entrant et augmente le stock.";
  }

  if (moduleKey === "commandesstockauto" && (to.includes("envoy") || action.includes("envoy"))) {
    return "La commande est envoyée. Elle reste une intention d’achat et ne modifie pas le stock.";
  }

  return `Transition contrôlée de \`${from}\` vers \`${to}\`. Les effets doivent être appliqués par RuntimeActionEngine / RuntimeWorkflowEngine / règles métier.`;
}

function buttonExpectation(moduleKey, transition) {
  return `Bouton "${transition.action}" dans la barre d’actions runtime, visible seulement si l’état courant est \`${transition.from}\`. Il ne doit pas être dans le formulaire.`;
}

const priorityOrder = [
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "encaissementsauto",
  "echeancespaiementauto",
  "produitsauto",
  "stocksauto",
  "mouvementsstockauto",
  "fournisseursauto",
  "commandesstockauto",
  "lignescommandestockauto",
  "receptionsstockauto",
];

const moduleFiles = walk("src/runtime/modules/generated").filter((file) => file.endsWith(".module.ts"));
const modules = moduleFiles.map(inspectModule);

modules.sort((a, b) => {
  const ia = priorityOrder.indexOf(a.moduleKey);
  const ib = priorityOrder.indexOf(b.moduleKey);

  if (ia !== -1 && ib !== -1) return ia - ib;
  if (ia !== -1) return -1;
  if (ib !== -1) return 1;

  return a.moduleKey.localeCompare(b.moduleKey);
});

const report = [];

report.push("# Q2-OP-I4 — Carte métier détaillée par module");
report.push("");
report.push("Objectif : détailler module par module ce que le module gère, ses statuts, ses workflows, ses règles, les effets produits, les boutons attendus et les éléments qui doivent rester hors formulaire.");
report.push("");
report.push("## Règle d’architecture globale");
report.push("");
report.push("- Les formulaires ne portent pas les boutons de workflow.");
report.push("- Les formulaires affichent et saisissent les champs.");
report.push("- Les boutons de transition/action apparaissent dans une barre runtime hors formulaire.");
report.push("- Les statuts ne sont pas des commandes libres.");
report.push("- Les changements de statut passent par des actions runtime contrôlées.");
report.push("- Les effets métier sont produits par RuntimeActionEngine, RuntimeWorkflowEngine, Business Rules, guards et services runtime.");
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
  for (const item of module.business.manages) {
    report.push(`- ${item}`);
  }
  report.push("");

  report.push("### 2. Statuts détectés et rôle métier");
  report.push("");

  if (module.statusFields.length === 0) {
    report.push("- Aucun champ de statut détecté automatiquement.");
    report.push("- Règle : si le module reçoit un statut plus tard, il devra être piloté par actions runtime.");
  } else {
    for (const statusField of module.statusFields) {
      report.push(`#### Champ \`${statusField.key}\` — ${statusField.label}`);
      report.push("");
      report.push(`- Type : \`${statusField.type || "non détecté"}\``);
      if (statusField.defaultValue) {
        report.push(`- Valeur initiale détectée : \`${statusField.defaultValue}\``);
      }

      if (statusField.options.length > 0) {
        report.push("- Valeurs possibles :");
        for (const option of statusField.options) {
          report.push(`  - \`${option.value}\` : ${option.label}`);
        }
      } else {
        report.push("- Options non détectées automatiquement.");
      }
      report.push("");
    }
  }

  report.push("Règles de statut du module :");
  for (const item of module.business.statusRules) {
    report.push(`- ${item}`);
  }
  report.push("");

  report.push("### 3. Workflows détectés");
  report.push("");

  if (module.workflows.length === 0) {
    report.push("- Aucun workflow déclaré détecté.");
    report.push("- Cela ne signifie pas qu’il n’y a pas de règles métier : certaines règles peuvent être dans les Business Rules ou services runtime.");
  } else {
    for (const workflow of module.workflows) {
      report.push(`#### Workflow : ${workflow.label || workflow.key}`);
      report.push("");
      if (workflow.initialState) {
        report.push(`- État initial : \`${workflow.initialState}\``);
      }

      if (workflow.states.length > 0) {
        report.push("- États du workflow :");
        for (const state of workflow.states) {
          report.push(`  - \`${state.key}\` : ${state.label}${state.color ? ` — couleur ${state.color}` : ""}`);
        }
      }

      if (workflow.transitions.length > 0) {
        report.push("");
        report.push("##### Transitions, déclencheurs et effets");
        report.push("");
        report.push("| État départ | Bouton/action | État arrivée | Ce que cela fait / gère | Où le bouton doit apparaître |");
        report.push("|---|---|---|---|---|");

        for (const transition of workflow.transitions) {
          report.push(
            `| \`${transition.from}\` | ${transition.action} | \`${transition.to}\` | ${transitionEffect(module.moduleKey, transition)} | ${buttonExpectation(module.moduleKey, transition)} |`
          );
        }
      } else {
        report.push("- Aucune transition détectée dans ce workflow.");
      }
      report.push("");
    }
  }

  report.push("### 4. Actions / boutons détectés");
  report.push("");

  if (module.actions.length === 0) {
    report.push("- Aucune action explicite détectée automatiquement.");
  } else {
    report.push("| Action technique | Label utilisateur | Type | Rôle attendu |");
    report.push("|---|---|---|---|");

    for (const action of module.actions.slice(0, 40)) {
      report.push(
        `| \`${action.key}\` | ${action.label} | ${action.type || "-"} | Action runtime hors formulaire. À afficher uniquement si les conditions métier sont remplies. |`
      );
    }
  }

  report.push("");
  report.push("### 5. Règles métier détaillées");
  report.push("");

  for (const item of module.business.effects) {
    report.push(`- ${item}`);
  }

  report.push("");
  report.push("### 6. Relations parent/enfant et panneaux liés");
  report.push("");

  if (module.children.length === 0) {
    report.push("- Aucun enfant de composition détecté.");
  } else {
    report.push("| Relation | Module enfant | Clé étrangère | Création autorisée | Total | Ce que cela gère |");
    report.push("|---|---|---|---:|---|---|");

    for (const child of module.children) {
      report.push(
        `| ${child.title} | \`${child.moduleKey}\` | \`${child.foreignKey}\` | ${child.allowCreate ? "oui" : "non"} | ${child.totalField || "-"} | Panneau lié runtime. Doit apparaître hors formulaire, généralement après la fiche détail/edit. |`
      );
    }
  }

  report.push("");
  report.push("### 7. Ce qui doit apparaître dans l’interface");
  report.push("");
  report.push("- Les champs : dans le formulaire ou détail runtime.");
  report.push("- Les statuts : visibles comme état courant, mais non utilisés comme commande libre si une transition existe.");
  report.push("- Les boutons de workflow : dans la barre d’actions runtime.");
  report.push("- Les enfants liés : dans les panneaux runtime liés, pas dans le corps du formulaire.");
  report.push("- Les créations enfants : via RuntimeChildCreateHrefBuilder ou composition.children.");
  report.push("");

  report.push("### 8. Ce qui ne doit pas être dans le formulaire");
  report.push("");
  report.push("- Boutons de workflow.");
  report.push("- Boutons métier de transition d’état.");
  report.push("- Actions qui déclenchent des créations automatiques.");
  report.push("- Modifications manuelles de champs calculés ou hérités.");
  report.push("- Liens enfants construits à la main sans contexte parent.");
  report.push("");

  report.push("---");
  report.push("");
}

const reportPath = full("docs/audits/Q2-OP-I4-detailed-module-business-map.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[Q2-OP-I4] Detailed module business map generated");
console.log("[ROOT]", root);
console.log("[MODULES]", modules.length);
console.log("[REPORT]", path.relative(root, reportPath));

console.log("[SUMMARY]");
for (const module of modules) {
  const transitionCount = module.workflows.reduce((sum, workflow) => sum + workflow.transitions.length, 0);
  console.log(
    `- ${module.moduleKey}: statusFields=${module.statusFields.length}, workflows=${module.workflows.length}, transitions=${transitionCount}, actions=${module.actions.length}, children=${module.children.length}`
  );
}