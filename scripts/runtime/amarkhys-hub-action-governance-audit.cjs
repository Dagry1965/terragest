const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "AMARKHYS-HUB-ACTION-GOVERNANCE-AUDIT.md"
);

const SEARCH_TARGETS = [
  "src/runtime",
  "src/components/erp",
  "src/app",
];

const KEYWORDS = [
  "RuntimeActionEngine",
  "RuntimeActionResolver",
  "ERPRuntimeActionBar",
  "RuntimeAction",
  "availableActions",
  "getAvailableActions",
  "executeAction",
  "runtimeOnly",
  "actionKey",
  "actions:",
  "workflow",
  "transition",
  "relancer",
  "relance",
  "paiement",
  "payment",
  "whatsapp",
  "sms",
  "mailto",
  "tel:",
  "ActionBar",
  "ActionButton",
  "button",
  "href",
  "returnTo",
  "clientId",
  "factureId",
  "interventionId",
  "vehiculeId",
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name === "node_modules" ||
        entry.name === ".next" ||
        entry.name === ".git" ||
        entry.name === "dist" ||
        entry.name === "coverage"
      ) {
        return [];
      }

      return walk(full);
    }

    if (!/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(entry.name)) {
      return [];
    }

    if (entry.name.includes(".bak")) {
      return [];
    }

    return [full];
  });
}

function safeRead(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}

function collectHits(file) {
  const content = safeRead(file);
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    const matched = KEYWORDS.filter((keyword) =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matched.length === 0) return;

    const start = Math.max(0, index - 4);
    const end = Math.min(lines.length, index + 10);

    hits.push({
      line: index + 1,
      matched,
      excerpt: lines
        .slice(start, end)
        .map((value, offset) => {
          const number = String(start + offset + 1).padStart(4, " ");
          return `${number}: ${value}`;
        })
        .join("\n"),
    });
  });

  return hits;
}

function section(title, content) {
  return [`## ${title}`, "", content || "_Aucun résultat._", ""].join("\n");
}

const files = SEARCH_TARGETS.flatMap((target) => walk(path.join(ROOT, target)));

const actionFiles = files.filter((file) =>
  /action|workflow|transition|button|bar|relance|paiement|payment|whatsapp|sms/i.test(
    path.basename(file)
  )
);

const hitsByFile = [];

for (const file of files) {
  const hits = collectHits(file);
  if (hits.length === 0) continue;

  hitsByFile.push({
    file: path.relative(ROOT, file),
    hits,
  });
}

const likelyActionEngineFiles = hitsByFile.filter((item) =>
  /runtime.*action|action.*engine|action.*resolver|runtimeaction|actionbar|workflow|transition|business-rules/i.test(
    item.file
  )
);

const hubFiles = hitsByFile.filter((item) =>
  /ERPClientOperationalSheet|clientsauto.*hub|ClientOperationalSheetClient|client.*operational/i.test(
    item.file
  )
);

const paymentCommunicationFiles = hitsByFile.filter((item) =>
  item.hits.some((hit) =>
    hit.matched.some((keyword) =>
      [
        "whatsapp",
        "sms",
        "mailto",
        "tel:",
        "paiement",
        "payment",
        "relancer",
        "relance",
        "factureId",
        "clientId",
        "returnTo",
      ].includes(keyword.toLowerCase())
    )
  )
);

const runtimeActionEngineExact = hitsByFile.filter((item) =>
  item.hits.some((hit) =>
    hit.matched.some((keyword) =>
      [
        "RuntimeActionEngine",
        "RuntimeActionResolver",
        "ERPRuntimeActionBar",
        "getAvailableActions",
        "executeAction",
        "availableActions",
      ].includes(keyword)
    )
  )
);

const report = [
  "# AMARKHYS-HUB-ACTION-GOVERNANCE-AUDIT",
  "",
  "## Objectif",
  "",
  "Auditer le moteur d’actions existant avant d’ajouter les actions de relance dans la fiche client opérationnelle.",
  "",
  "## Règles de la passe",
  "",
  "- Audit seulement.",
  "- Aucune modification de code métier.",
  "- Ne pas ajouter de boutons localement avant de confirmer le moteur d’actions.",
  "- Les futures actions doivent transporter le contexte client / véhicule / RDV / intervention / facture / returnTo.",
  "- AMARKHYS reste consommateur métier ; la solution doit rester runtime/générique autant que possible.",
  "",
  section(
    "Fichiers action/workflow/actionbar candidats",
    actionFiles.map((file) => `- \`${path.relative(ROOT, file)}\``).join("\n")
  ),
  section(
    "Fichiers moteur d’actions exacts ou très probables",
    runtimeActionEngineExact
      .map((item) => `- \`${item.file}\` (${item.hits.length} hit(s))`)
      .join("\n")
  ),
  section(
    "Fichiers probablement liés au moteur d’actions",
    likelyActionEngineFiles
      .map((item) => `- \`${item.file}\` (${item.hits.length} hit(s))`)
      .join("\n")
  ),
  section(
    "Fichiers hub concernés",
    hubFiles
      .map((item) => `- \`${item.file}\` (${item.hits.length} hit(s))`)
      .join("\n")
  ),
  section(
    "Fichiers communication / paiement / relance / contexte candidats",
    paymentCommunicationFiles
      .map((item) => `- \`${item.file}\` (${item.hits.length} hit(s))`)
      .join("\n")
  ),
  "## Détails des occurrences",
  "",
  ...hitsByFile.flatMap((item) => [
    `### \`${item.file}\``,
    "",
    ...item.hits.slice(0, 14).flatMap((hit) => [
      `#### Ligne ${hit.line} — ${hit.matched.join(", ")}`,
      "",
      "```tsx",
      hit.excerpt,
      "```",
      "",
    ]),
    item.hits.length > 14
      ? `_Occurrences supplémentaires non affichées : ${item.hits.length - 14}_\n`
      : "",
  ]),
  "",
  "## Décision attendue après lecture",
  "",
  "Classer la future relance dans une des couches :",
  "",
  "- RuntimeActionEngine existant",
  "- Action metadata module",
  "- ERPRuntimeActionBar / barre d’actions",
  "- Modal action contextuelle du hub branchée sur moteur",
  "- Nouveau moteur à éviter sauf absence réelle",
  "",
  "## Cible fonctionnelle future",
  "",
  "- Relancer client si impayés client > 0.",
  "- Relancer facture si reste à payer > 0.",
  "- Enregistrer paiement si facture non soldée.",
  "- Ouvrir fiche intervention / facture / encaissement avec contexte client.",
  "- Transporter `returnTo` vers la fiche client opérationnelle.",
  "- Prévoir canaux : WhatsApp, SMS, Email, Appel, Courrier, Alerte interne.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log("[AMARKHYS-HUB-ACTION-GOVERNANCE-AUDIT] DONE");
console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[FILES] ${files.length}`);
console.log(`[HITS] ${hitsByFile.length}`);
console.log(`[ACTION_ENGINE_EXACT] ${runtimeActionEngineExact.length}`);
console.log(`[ACTION_ENGINE_CANDIDATES] ${likelyActionEngineFiles.length}`);
console.log(`[PAYMENT_COMMUNICATION_CANDIDATES] ${paymentCommunicationFiles.length}`);
console.log("[NEXT] Open report and review key sections.");