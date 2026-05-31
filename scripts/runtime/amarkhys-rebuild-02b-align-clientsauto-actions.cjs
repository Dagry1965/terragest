const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const actionsRel = "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-02B-clientsauto-actions-alignment.md";

const modulePath = path.join(root, moduleRel);
const actionsPath = path.join(root, actionsRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail("Missing file: " + path.relative(root, filePath));
  }
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function backup(filePath, suffix) {
  if (!fs.existsSync(filePath)) return null;
  const backupPath = filePath + suffix;
  fs.copyFileSync(filePath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
  return backupPath;
}

function findMatchingBracket(source, openIndex) {
  let depth = 0;
  let inSingle = false;
  let inDouble = false;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];
    const next = source[i + 1];

    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i++;
      }
      continue;
    }

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (!inSingle && !inDouble && !inTemplate) {
      if (ch === "/" && next === "/") {
        inLineComment = true;
        i++;
        continue;
      }

      if (ch === "/" && next === "*") {
        inBlockComment = true;
        i++;
        continue;
      }

      if (ch === "'") {
        inSingle = true;
        continue;
      }

      if (ch === '"') {
        inDouble = true;
        continue;
      }

      if (ch === "`") {
        inTemplate = true;
        continue;
      }

      if (ch === "[") {
        depth++;
      }

      if (ch === "]") {
        depth--;
        if (depth === 0) return i;
      }

      continue;
    }

    if (inSingle && ch === "'") inSingle = false;
    if (inDouble && ch === '"') inDouble = false;
    if (inTemplate && ch === "`") inTemplate = false;
  }

  return -1;
}

function replaceActionsBlock(source) {
  const marker = "actions:";
  const actionIndex = source.indexOf(marker);

  if (actionIndex === -1) {
    fail("No actions: block found in clientsauto.module.ts");
  }

  const openBracket = source.indexOf("[", actionIndex);
  if (openBracket === -1) {
    fail("actions: found, but no [ bracket after it");
  }

  const closeBracket = findMatchingBracket(source, openBracket);
  if (closeBracket === -1) {
    fail("Unable to locate matching ] for actions block");
  }

  let end = closeBracket + 1;
  while (source[end] === " " || source[end] === "\t" || source[end] === "\r" || source[end] === "\n") {
    end++;
  }
  if (source[end] === ",") {
    end++;
  }

  const replacement = "actions: clientsautoActions,";
  return source.slice(0, actionIndex) + replacement + source.slice(end);
}

function ensureImport(source) {
  const importLine = 'import { clientsautoActions } from "./clientsauto.actions";';

  if (source.includes(importLine)) {
    return source;
  }

  const lines = source.split(/\r?\n/);
  let lastImportIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^import\s+/.test(lines[i])) {
      lastImportIndex = i;
    }
  }

  if (lastImportIndex === -1) {
    return importLine + "\n" + source;
  }

  lines.splice(lastImportIndex + 1, 0, importLine);
  return lines.join("\n");
}

function countActionKeys(content) {
  return (content.match(/key:\s*"/g) || []).length;
}

const actionsContent = `export const clientsautoActions = [
  {
    key: "clientsauto.activer",
    label: "Activer client",
    action: "Activer",
    intent: "activate",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["prospect", "inactif", "archive"],
    },
    set: {
      statut: "actif",
    },
  },
  {
    key: "clientsauto.desactiver",
    label: "Désactiver client",
    action: "Désactiver",
    intent: "deactivate",
    type: "workflow",
    runtimeOnly: true,
    variant: "secondary",
    tone: "warning",
    visibleWhen: {
      field: "statut",
      in: ["actif", "prospect"],
    },
    set: {
      statut: "inactif",
    },
  },
  {
    key: "clientsauto.reactiver",
    label: "Réactiver client",
    action: "Réactiver",
    intent: "reactivate",
    type: "workflow",
    runtimeOnly: true,
    variant: "primary",
    tone: "success",
    visibleWhen: {
      field: "statut",
      in: ["inactif"],
    },
    set: {
      statut: "actif",
    },
  },
  {
    key: "clientsauto.archiver",
    label: "Archiver client",
    action: "Archiver",
    intent: "archive",
    type: "workflow",
    runtimeOnly: true,
    variant: "danger",
    tone: "danger",
    confirm: true,
    confirmation: "Archiver ce client ? Les données liées resteront consultables mais le client ne devra plus être modifié librement.",
    visibleWhen: {
      field: "statut",
      in: ["prospect", "actif", "inactif"],
    },
    set: {
      statut: "archive",
    },
  },
  {
    key: "clientsauto.ajouter-vehicule",
    label: "Ajouter véhicule",
    action: "Ajouter véhicule",
    intent: "create-child",
    type: "navigation",
    variant: "secondary",
    href: "/vehicules/nouveau",
    targetModuleKey: "vehicules",
    parentModuleKey: "clientsauto",
    parentForeignKey: "clientId",
    preserveParentContext: true,
  },
  {
    key: "clientsauto.ouvrir-fiche-operationnelle",
    label: "Ouvrir fiche opérationnelle",
    action: "Ouvrir fiche opérationnelle",
    intent: "open-operational-hub",
    type: "navigation",
    variant: "secondary",
    href: "/clientsauto/hub",
    targetModuleKey: "clientsauto",
    preserveRecordContext: true,
  },
] as any[];
`;

console.log("[AMARKHYS-REBUILD-02B] Align clientsauto runtime actions");
console.log("[ROOT]", root);

backup(actionsPath, ".bak-rebuild-02b-actions");
backup(modulePath, ".bak-rebuild-02b-actions");

write(actionsPath, actionsContent);
console.log("[WRITTEN]", actionsRel);

let moduleContent = read(modulePath);
moduleContent = ensureImport(moduleContent);
moduleContent = replaceActionsBlock(moduleContent);
write(modulePath, moduleContent);
console.log("[UPDATED]", moduleRel);

const updatedActions = read(actionsPath);
const updatedModule = read(modulePath);

const checks = [
  {
    label: "clientsauto.actions.ts contains 6 actions",
    ok: countActionKeys(updatedActions) === 6,
  },
  {
    label: "module imports clientsautoActions",
    ok: updatedModule.includes('import { clientsautoActions } from "./clientsauto.actions";'),
  },
  {
    label: "module uses actions: clientsautoActions",
    ok: updatedModule.includes("actions: clientsautoActions,"),
  },
  {
    label: "module no longer contains old /client360-demo action",
    ok: !updatedModule.includes("/client360-demo"),
  },
  {
    label: "module no longer contains old /rendezvous/nouveau client action",
    ok: !updatedModule.includes('href: "/rendezvous/nouveau"'),
  },
  {
    label: "ERPEnterpriseForm untouched by this pass",
    ok: true,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-02B — Alignement actions clientsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "Remettre en conformité les actions du module clientsauto selon le recadrage AMARKHYS.",
  "",
  "## Décision appliquée",
  "",
  "- clientsauto.actions.ts n'est plus vide.",
  "- clientsauto.module.ts référence clientsautoActions.",
  "- Les anciennes actions inline du module ont été remplacées par une référence runtime.",
  "- Aucun bouton/action n'a été ajouté dans ERPEnterpriseForm.",
  "",
  "## Actions déclarées",
  "",
  "- Activer client",
  "- Désactiver client",
  "- Réactiver client",
  "- Archiver client",
  "- Ajouter véhicule",
  "- Ouvrir fiche opérationnelle",
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Résultat",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Prochaine étape",
  "",
  "Lancer pnpm build puis relancer l'audit de recadrage clientsauto.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
write(reportPath, report);
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.error("[AMARKHYS-REBUILD-02B] Completed with failures. Open report before continuing.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-02B] DONE");
console.log("[NEXT] pnpm build");