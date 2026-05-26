/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9M-F-A";

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-F-A-final-scheduling-policy-chain-audit.md"
);

const FILES = {
  policy: "src/runtime/scheduling/SchedulingSlotPolicy.ts",
  schedulingIndex: "src/runtime/scheduling/index.ts",
  engine: "src/runtime/scheduling/RuntimeSchedulingEngine.ts",
  guard: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  planningView: "src/components/erp/scheduling/ERPSchedulingPlanningView.tsx",
  settingsEngine: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsEngine.ts",
  settingsResolver: "src/runtime/scheduling/settings/RuntimeSchedulingSettingsResolver.ts",
  rendezvousModule: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
};

const CHECKS = [
  {
    id: "POLICY_FILE_EXISTS",
    file: "policy",
    severity: "HIGH",
    test: (content) => content.includes("export class SchedulingSlotPolicyResolver"),
    ok: "SchedulingSlotPolicyResolver existe.",
    fail: "SchedulingSlotPolicyResolver absent.",
  },
  {
    id: "POLICY_EXPORTED",
    file: "schedulingIndex",
    severity: "HIGH",
    test: (content) => content.includes('export * from "./SchedulingSlotPolicy";'),
    ok: "SchedulingSlotPolicy est exportée par le barrel scheduling.",
    fail: "SchedulingSlotPolicy n'est pas exportée dans src/runtime/scheduling/index.ts.",
  },
  {
    id: "ENGINE_CONSUMES_POLICY",
    file: "engine",
    severity: "HIGH",
    test: (content) => content.includes("SchedulingSlotPolicyResolver"),
    ok: "RuntimeSchedulingEngine consomme SchedulingSlotPolicyResolver.",
    fail: "RuntimeSchedulingEngine ne consomme pas SchedulingSlotPolicyResolver.",
  },
  {
    id: "GUARD_CONSUMES_POLICY",
    file: "guard",
    severity: "HIGH",
    test: (content) => content.includes("SchedulingSlotPolicyResolver.resolve"),
    ok: "processRuntimeBeforeMutationGuards consomme SchedulingSlotPolicyResolver.",
    fail: "processRuntimeBeforeMutationGuards ne consomme pas SchedulingSlotPolicyResolver.",
  },
  {
    id: "VIEW_NO_DURATION_HELPER",
    file: "planningView",
    severity: "HIGH",
    test: (content) => !content.includes("getVisibleSchedulingDurationMinutes"),
    ok: "La vue ne contient plus getVisibleSchedulingDurationMinutes.",
    fail: "La vue contient encore getVisibleSchedulingDurationMinutes.",
  },
  {
    id: "VIEW_NO_ENGINE_DEFAULT_DURATION",
    file: "planningView",
    severity: "HIGH",
    test: (content) => !content.includes("RuntimeSchedulingEngine.defaultDurationMinutes"),
    ok: "La vue ne dépend plus de RuntimeSchedulingEngine.defaultDurationMinutes.",
    fail: "La vue dépend encore de RuntimeSchedulingEngine.defaultDurationMinutes.",
  },
  {
    id: "VIEW_NO_DIRECT_BUFFER",
    file: "planningView",
    severity: "HIGH",
    test: (content) => !content.includes("bufferMinutes: schedulingConfig.bufferMinutes"),
    ok: "La vue ne transmet plus bufferMinutes directement.",
    fail: "La vue transmet encore bufferMinutes depuis schedulingConfig.",
  },
  {
    id: "ENGINE_NO_LOCAL_NON_BLOCKING_CONSTANT",
    file: "engine",
    severity: "REVIEW",
    test: (content) => !content.includes("DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = ["),
    ok: "Le moteur ne porte plus la constante locale non-blocking statuses.",
    fail: "Le moteur porte encore une constante locale non-blocking statuses.",
  },
  {
    id: "ENGINE_USES_POLICY_NON_BLOCKING",
    file: "engine",
    severity: "HIGH",
    test: (content) =>
      content.includes("SchedulingSlotPolicyResolver.isNonBlockingRecord"),
    ok: "Le moteur utilise la policy pour les statuts non bloquants.",
    fail: "Le moteur n'utilise pas la policy pour les statuts non bloquants.",
  },
  {
    id: "GUARD_NO_LOCAL_CAPACITY_CALC",
    file: "guard",
    severity: "HIGH",
    test: (content) => !content.includes("Number(schedulingConfig?.capacity ?? 1)"),
    ok: "Le guard ne recalcule plus localement capacity.",
    fail: "Le guard recalcule encore localement capacity.",
  },
  {
    id: "GUARD_NO_LOCAL_NORMALIZED_DURATION_CALC",
    file: "guard",
    severity: "HIGH",
    test: (content) =>
      !content.includes("Number(normalizedRecord.durationMinutes ?? 0) || undefined"),
    ok: "Le guard ne recalcule plus localement normalizedRecord.durationMinutes.",
    fail: "Le guard recalcule encore localement normalizedRecord.durationMinutes.",
  },
  {
    id: "GUARD_USES_POLICY_BUFFER",
    file: "guard",
    severity: "HIGH",
    test: (content) => content.includes("bufferMinutes: slotPolicy.bufferMinutes"),
    ok: "Le guard transmet slotPolicy.bufferMinutes au moteur.",
    fail: "Le guard ne transmet pas slotPolicy.bufferMinutes au moteur.",
  },
  {
    id: "SETTINGS_ENGINE_HAS_EFFECTIVE_CONFIG",
    file: "settingsEngine",
    severity: "REVIEW",
    test: (content) =>
      content.includes("defaultDurationMinutes") &&
      content.includes("bufferMinutes") &&
      content.includes("capacity") &&
      content.includes("openingHoursProfile"),
    ok: "Settings engine couvre duration, buffer, capacity et openingHoursProfile.",
    fail: "Settings engine semble incomplet sur duration/buffer/capacity/openingHoursProfile.",
  },
  {
    id: "RENDEZVOUS_MODULE_METADATA_CONSUMER",
    file: "rendezvousModule",
    severity: "INFO",
    test: (content) =>
      content.includes("scheduling") &&
      content.includes("dateField") &&
      content.includes("timeField") &&
      content.includes("durationField") &&
      content.includes("bufferMinutes") &&
      content.includes("capacity"),
    ok: "rendezvous.module.ts reste consommateur metadata scheduling.",
    fail: "rendezvous.module.ts ne déclare pas clairement les metadata scheduling attendues.",
  },
];

function rel(filePath) {
  return filePath.split(path.sep).join("/");
}

function readProjectFile(relativePath) {
  const absolute = path.join(ROOT, relativePath);

  if (!fs.existsSync(absolute)) {
    return null;
  }

  return fs.readFileSync(absolute, "utf8");
}

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

const results = [];

for (const check of CHECKS) {
  const relativePath = FILES[check.file];
  const content = readProjectFile(relativePath);

  if (content === null) {
    results.push({
      ...check,
      status: "FAIL",
      file: relativePath,
      message: `Fichier introuvable: ${relativePath}`,
    });
    continue;
  }

  const passed = check.test(content);

  results.push({
    ...check,
    status: passed ? "OK" : "FAIL",
    file: relativePath,
    message: passed ? check.ok : check.fail,
  });
}

const failed = results.filter((item) => item.status === "FAIL");
const highFailed = failed.filter((item) => item.severity === "HIGH");
const reviewFailed = failed.filter((item) => item.severity === "REVIEW");
const infoFailed = failed.filter((item) => item.severity === "INFO");

function table(rows) {
  if (rows.length === 0) return "_Aucun élément._\n";

  return [
    "| Statut | Sévérité | Check | Fichier | Message |",
    "|---|---|---|---|---|",
    ...rows.map(
      (item) =>
        `| ${item.status} | ${item.severity} | ${escapeMd(item.id)} | \`${escapeMd(item.file)}\` | ${escapeMd(item.message)} |`
    ),
  ].join("\n") + "\n";
}

const report = [
  `# ${AUDIT_ID} — Final scheduling policy chain audit`,
  "",
  "## Objectif",
  "",
  "Vérifier la chaîne finale settings → policy → engine → guard → vue avant tests fonctionnels du planning.",
  "",
  "## Doctrine",
  "",
  "Les settings/résolveurs fournissent la configuration effective. La policy résout duration, buffer, capacity et status policy. Le moteur calcule. Les guards protègent. La vue affiche.",
  "",
  "## Résumé",
  "",
  `- Checks : ${results.length}`,
  `- OK : ${results.filter((item) => item.status === "OK").length}`,
  `- FAIL : ${failed.length}`,
  `- FAIL HIGH : ${highFailed.length}`,
  `- FAIL REVIEW : ${reviewFailed.length}`,
  `- FAIL INFO : ${infoFailed.length}`,
  "",
  "## FAIL HIGH — à corriger avant tests fonctionnels",
  "",
  table(highFailed),
  "",
  "## FAIL REVIEW — à classer",
  "",
  table(reviewFailed),
  "",
  "## FAIL INFO — informatif",
  "",
  table(infoFailed),
  "",
  "## Tous les checks",
  "",
  table(results),
  "",
  "## Décision attendue",
  "",
  "- Si FAIL HIGH = 0 : chaîne scheduling policy acceptable pour tests fonctionnels.",
  "- Si FAIL HIGH > 0 : corriger avant tests UI.",
  "- Les REVIEW peuvent devenir des passes ultérieures si non bloquantes.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[CHECKS] ${results.length}`);
console.log(`[OK] ${results.filter((item) => item.status === "OK").length}`);
console.log(`[FAIL] ${failed.length}`);
console.log(`[FAIL_HIGH] ${highFailed.length}`);
console.log(`[FAIL_REVIEW] ${reviewFailed.length}`);
console.log(`[FAIL_INFO] ${infoFailed.length}`);
console.log(`[REPORT] ${rel(path.relative(ROOT, REPORT))}`);