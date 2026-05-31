const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/employes/employes.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX7-F-remove-employes-root-list-detail.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix7-f-remove-root-list-detail";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

function findMatchingBrace(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escape = false;

  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (ch === "\\") {
      escape = true;
      continue;
    }

    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function removeRootObjectProperty(source, propertyName) {
  const marker = `\n  ${propertyName}: {`;
  const start = source.indexOf(marker);

  if (start === -1) {
    return source;
  }

  const openBrace = source.indexOf("{", start);
  if (openBrace === -1) {
    fail("Cannot find opening brace for " + propertyName);
  }

  const closeBrace = findMatchingBrace(source, openBrace);
  if (closeBrace === -1) {
    fail("Cannot find closing brace for " + propertyName);
  }

  let end = closeBrace + 1;

  while (source[end] && /\s/.test(source[end])) {
    end++;
  }

  if (source[end] === ",") {
    end++;
  }

  return source.slice(0, start) + source.slice(end);
}

content = removeRootObjectProperty(content, "list");
content = removeRootObjectProperty(content, "detail");

// Nettoyage virgule éventuelle avant la fermeture de l'objet module.
content = content.replace(/,\s*\n} satisfies ERPModule;/, "\n} satisfies ERPModule;");

fs.writeFileSync(modulePath, content, "utf8");

const checks = [
  {
    label: "root list supprimé",
    ok: !/\n\s{2}list:\s*\{/.test(content),
  },
  {
    label: "root detail supprimé",
    ok: !/\n\s{2}detail:\s*\{/.test(content),
  },
  {
    label: "metadata conservé",
    ok: /metadata:\s*\{[\s\S]*key:\s*"employes"/.test(content),
  },
  {
    label: "schema.collection conservé",
    ok: /schema:\s*\{[\s\S]*collection:\s*"employes"/.test(content),
  },
  {
    label: "form conservé",
    ok: /form:\s*\{[\s\S]*tabs:\s*\[/.test(content),
  },
  {
    label: "field list metadata conservées",
    ok: content.includes("list: { visible: true"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX7-F — Remove employes root list/detail",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Correction",
  "",
  "- Suppression des propriétés racine list/detail non acceptées par ERPModule.",
  "- Conservation des metadata de liste au niveau des champs.",
  "- Conservation de metadata, schema.collection et form.tabs.",
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
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-06C-FIX7-F] Remove employes root list/detail");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX7-F] DONE");
console.log("[NEXT] pnpm build");