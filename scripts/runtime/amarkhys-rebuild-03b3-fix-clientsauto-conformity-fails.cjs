const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-03B3-fix-clientsauto-conformity-fails.md";

const modulePath = path.join(root, moduleRel);
const formPath = path.join(root, formRel);
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
  const backupPath = filePath + suffix;
  fs.copyFileSync(filePath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
  return backupPath;
}

function findObjectStartBeforeKey(source, keyIndex) {
  const before = source.slice(0, keyIndex);
  const objectStart = before.lastIndexOf("{");
  if (objectStart === -1) {
    fail("Cannot find object start before key index " + keyIndex);
  }
  return objectStart;
}

function findMatchingBrace(source, openIndex) {
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

      if (ch === "{") {
        depth++;
      }

      if (ch === "}") {
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

function removeObjectByKey(source, key) {
  const marker = `key: "${key}"`;
  const keyIndex = source.indexOf(marker);

  if (keyIndex === -1) {
    return {
      source,
      removed: false,
    };
  }

  let start = findObjectStartBeforeKey(source, keyIndex);
  let end = findMatchingBrace(source, start);

  if (end === -1) {
    fail("Cannot find matching brace for object " + key);
  }

  end++;

  while (source[end] === " " || source[end] === "\t" || source[end] === "\r" || source[end] === "\n") {
    end++;
  }

  if (source[end] === ",") {
    end++;
  } else {
    let beforeStart = start - 1;
    while (
      beforeStart >= 0 &&
      (source[beforeStart] === " " ||
        source[beforeStart] === "\t" ||
        source[beforeStart] === "\r" ||
        source[beforeStart] === "\n")
    ) {
      beforeStart--;
    }

    if (source[beforeStart] === ",") {
      start = beforeStart;
    }
  }

  return {
    source: source.slice(0, start) + source.slice(end),
    removed: true,
  };
}

function removeClientsautoBusinessStatusAction(source) {
  const marker = 'if (moduleKey === "clientsauto" && currentStatus !== "archive")';
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return {
      source,
      removed: false,
    };
  }

  const start = markerIndex;
  const openBrace = source.indexOf("{", markerIndex);

  if (openBrace === -1) {
    fail("Cannot find clientsauto if open brace");
  }

  const closeBrace = findMatchingBrace(source, openBrace);

  if (closeBrace === -1) {
    fail("Cannot find clientsauto if close brace");
  }

  let end = closeBrace + 1;

  while (source[end] === " " || source[end] === "\t" || source[end] === "\r" || source[end] === "\n") {
    end++;
  }

  const replacement =
    '    // clientsauto status actions are declared in clientsauto.actions.ts and rendered by the runtime action bar.\n\n';

  return {
    source: source.slice(0, start) + replacement + source.slice(end),
    removed: true,
  };
}

console.log("[AMARKHYS-REBUILD-03B3] Fix clientsauto conformity FAILs");
console.log("[ROOT]", root);

backup(modulePath, ".bak-rebuild-03b3-clientsauto-conformity");
backup(formPath, ".bak-rebuild-03b3-clientsauto-conformity");

let moduleContent = read(modulePath);
let formContent = read(formPath);

const removedRelated = [];

for (const key of ["interventions-client", "factures-client", "encaissements-client"]) {
  const result = removeObjectByKey(moduleContent, key);
  moduleContent = result.source;
  removedRelated.push({
    key,
    removed: result.removed,
  });
}

const formResult = removeClientsautoBusinessStatusAction(formContent);
formContent = formResult.source;

write(modulePath, moduleContent);
write(formPath, formContent);

const checks = [
  {
    label: "Bloc interventions-client supprimé du module client",
    ok: !moduleContent.includes('key: "interventions-client"'),
  },
  {
    label: "Bloc factures-client supprimé du module client",
    ok: !moduleContent.includes('key: "factures-client"'),
  },
  {
    label: "Bloc encaissements-client supprimé du module client",
    ok: !moduleContent.includes('key: "encaissements-client"'),
  },
  {
    label: "client module ne référence plus interventionId",
    ok: !moduleContent.includes("interventionId"),
  },
  {
    label: "client module ne référence plus factureId",
    ok: !moduleContent.includes("factureId"),
  },
  {
    label: "ERPEnterpriseForm ne contient plus l'action Archiver client",
    ok: !formContent.includes('label: "Archiver client"'),
  },
  {
    label: "ERPEnterpriseForm conserve les autres actions métier non client",
    ok:
      formContent.includes('moduleKey === "receptionsstockauto"') &&
      formContent.includes('moduleKey === "vehicules"'),
  },
  {
    label: "clientsauto actions dédiées non modifiées ici",
    ok: fs.readFileSync(path.join(root, "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts"), "utf8").includes("Archiver client"),
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-03B3 — Correction ciblée conformité clientsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Corrections appliquées",
  "",
  "- Retrait de l'action hardcodée Archiver client depuis ERPEnterpriseForm.",
  "- Retrait des blocs related directs interventions-client, factures-client et encaissements-client depuis clientsauto.module.ts.",
  "- Conservation du principe : les actions clients sont déclarées dans clientsauto.actions.ts.",
  "- Conservation du hub opérationnel client pour la lecture composée du parcours.",
  "",
  "## Related blocks retirés",
  "",
  ...removedRelated.map((item) => `- ${item.removed ? "OK" : "MISSING"} — ${item.key}`),
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
write(reportPath, report);

console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.error("[AMARKHYS-REBUILD-03B3] FAIL");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-03B3] DONE");
console.log("[NEXT] Remove backups after verification, then rerun 03A audit and pnpm build.");