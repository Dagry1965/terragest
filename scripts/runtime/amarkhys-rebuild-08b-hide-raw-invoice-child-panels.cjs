const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-08B-hide-raw-invoice-child-panels.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const backupPath = modulePath + ".bak-rebuild-08b-hide-raw-invoice-child-panels";
fs.copyFileSync(modulePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(modulePath, "utf8");
const before = content;

function patchChildBlock(source, moduleKey) {
  const marker = `moduleKey: "${moduleKey}"`;
  const markerIndex = source.indexOf(marker);

  if (markerIndex === -1) {
    fail("Cannot find child moduleKey: " + moduleKey);
  }

  const blockStart = source.lastIndexOf("{", markerIndex);
  const nextModuleIndex = source.indexOf("moduleKey:", markerIndex + marker.length);
  const childrenEnd = source.indexOf("]", markerIndex);
  const blockEndCandidate =
    nextModuleIndex !== -1 && nextModuleIndex < childrenEnd
      ? source.lastIndexOf("}", nextModuleIndex)
      : source.indexOf("}", markerIndex);

  const blockEnd = blockEndCandidate;

  if (blockStart === -1 || blockEnd === -1) {
    fail("Cannot isolate child block: " + moduleKey);
  }

  let block = source.slice(blockStart, blockEnd + 1);

  if (!block.includes(marker)) {
    fail("Isolated block does not contain marker: " + moduleKey);
  }

  if (!/displayIn:\s*\[[^\]]*\]/.test(block)) {
    fail("displayIn not found for: " + moduleKey);
  }

  if (!/allowCreate:\s*(true|false)/.test(block)) {
    fail("allowCreate not found for: " + moduleKey);
  }

  block = block.replace(/displayIn:\s*\[[^\]]*\]/, "displayIn: []");
  block = block.replace(/allowCreate:\s*(true|false)/, "allowCreate: false");

  return source.slice(0, blockStart) + block + source.slice(blockEnd + 1);
}

content = patchChildBlock(content, "encaissementsauto");
content = patchChildBlock(content, "echeancespaiementauto");

fs.writeFileSync(modulePath, content, "utf8");

function getChildWindow(source, moduleKey) {
  const marker = `moduleKey: "${moduleKey}"`;
  const index = source.indexOf(marker);
  if (index === -1) return "";
  const start = Math.max(0, source.lastIndexOf("{", index));
  const end = source.indexOf("relations:", index);
  return source.slice(start, end === -1 ? index + 1200 : end);
}

const encaissementsBlock = getChildWindow(content, "encaissementsauto");
const echeancesBlock = getChildWindow(content, "echeancespaiementauto");

const checks = [
  {
    label: "encaissementsauto child existe",
    ok: encaissementsBlock.includes('moduleKey: "encaissementsauto"'),
  },
  {
    label: "encaissementsauto masqué du runtime detail/edit",
    ok: encaissementsBlock.includes("displayIn: []"),
  },
  {
    label: "encaissementsauto création directe désactivée",
    ok: encaissementsBlock.includes("allowCreate: false"),
  },
  {
    label: "echeancespaiementauto child existe",
    ok: echeancesBlock.includes('moduleKey: "echeancespaiementauto"'),
  },
  {
    label: "echeancespaiementauto masqué du runtime detail/edit",
    ok: echeancesBlock.includes("displayIn: []"),
  },
  {
    label: "echeancespaiementauto création directe désactivée",
    ok: echeancesBlock.includes("allowCreate: false"),
  },
  {
    label: "module modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-08B — Hide raw invoice child panels",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision",
  "",
  "- Masquer les panneaux enfants bruts Encaissements et Échéances de paiement sous facturesauto.",
  "- Conserver les blocs métier dédiés : Paiements enregistrés et Paiement en plusieurs fois.",
  "- Désactiver la création directe depuis les panneaux relationnels bruts.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Encaissements block",
  "",
  encaissementsBlock || "- Non trouvé.",
  "",
  "## Échéances block",
  "",
  echeancesBlock || "- Non trouvé.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-08B] Hide raw invoice child panels");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-08B] DONE");
console.log("[NEXT] Run 08A audit, build, UI check.");