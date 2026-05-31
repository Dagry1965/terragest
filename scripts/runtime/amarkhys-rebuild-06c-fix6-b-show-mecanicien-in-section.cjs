const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX6-B-show-mecanicien-in-section.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-06c-fix6-b-show-mecanicien";
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

function replaceSectionBlock(source, sectionKey, mutateBlock) {
  const marker = `key: "${sectionKey}"`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    return source;
  }

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) {
    fail("Cannot find section start for " + sectionKey);
  }

  const end = findMatchingBrace(source, start);
  if (end === -1) {
    fail("Cannot find section end for " + sectionKey);
  }

  const block = source.slice(start, end + 1);
  const next = mutateBlock(block);

  return source.slice(0, start) + next + source.slice(end + 1);
}

function addAfterFieldInSection(section, afterField, fieldToAdd) {
  if (section.includes(`"${fieldToAdd}"`)) {
    return section;
  }

  const needle = `"${afterField}",`;
  const idx = section.indexOf(needle);

  if (idx === -1) {
    return section;
  }

  return (
    section.slice(0, idx + needle.length) +
    `\n              "${fieldToAdd}",` +
    section.slice(idx + needle.length)
  );
}

// Section réellement rendue : key "infos"
content = replaceSectionBlock(content, "infos", (section) => {
  let next = section;
  next = addAfterFieldInSection(next, "rendezVousId", "mecanicienId");
  return next;
});

// Sécurité : si une section "contexte" est aussi rendue dans certains cas, on l’aligne.
content = replaceSectionBlock(content, "contexte", (section) => {
  let next = section;
  next = addAfterFieldInSection(next, "rendezVousId", "mecanicienId");
  return next;
});

fs.writeFileSync(modulePath, content, "utf8");

function getSectionBlock(source, sectionKey) {
  const marker = `key: "${sectionKey}"`;
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) return "";

  const start = source.lastIndexOf("{", markerIndex);
  if (start === -1) return "";

  const end = findMatchingBrace(source, start);
  if (end === -1) return "";

  return source.slice(start, end + 1);
}

const infosBlock = getSectionBlock(content, "infos");
const contexteBlock = getSectionBlock(content, "contexte");

const checks = [
  {
    label: "mecanicienId existe dans schema.fields",
    ok: content.includes('key: "mecanicienId"'),
  },
  {
    label: "mecanicienId ajouté dans section infos",
    ok: infosBlock.includes('"mecanicienId"'),
  },
  {
    label: "mecanicienId placé après rendezVousId dans infos",
    ok:
      infosBlock.indexOf('"rendezVousId"') !== -1 &&
      infosBlock.indexOf('"mecanicienId"') > infosBlock.indexOf('"rendezVousId"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-06C-FIX6-B — Afficher mecanicienId dans section réelle",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Cause",
  "",
  "mecanicienId existait dans schema.fields et dans tab.fields, mais pas dans la section infos.fields rendue par ERPEnterpriseForm.",
  "",
  "## Correction",
  "",
  "- Ajout de mecanicienId dans la section infos après rendezVousId.",
  "- Alignement éventuel de la section contexte si présente.",
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

console.log("[AMARKHYS-REBUILD-06C-FIX6-B] Show mecanicienId in rendered section");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06C-FIX6-B] DONE");
console.log("[NEXT] Rerun layout audit, build, UI check.");