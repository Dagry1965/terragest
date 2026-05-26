/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const AUDIT_ID = "Q22E-9M-G-C-A";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-G-C-A-planning-ui-runtime-consumption-audit.md"
);

const CHECKS = [
  {
    id: "VIEW_CALLS_RUNTIME_SLOTS",
    severity: "HIGH",
    test: (content) =>
      content.includes("RuntimeSchedulingEngine.getAvailableSlotsWithBookings") ||
      content.includes("RuntimeSchedulingEngine.getAvailableSlotsForDate"),
    ok: "La vue consomme le runtime pour les slots.",
    fail: "La vue ne semble pas consommer le runtime pour les slots.",
  },
  {
    id: "VIEW_NO_VISIBLE_DURATION_HELPER",
    severity: "HIGH",
    test: (content) => !content.includes("getVisibleSchedulingDurationMinutes"),
    ok: "La vue ne contient plus de helper local de résolution de durée.",
    fail: "La vue contient encore getVisibleSchedulingDurationMinutes.",
  },
  {
    id: "VIEW_NO_ENGINE_DURATION_FALLBACK",
    severity: "HIGH",
    test: (content) => !content.includes("RuntimeSchedulingEngine.defaultDurationMinutes"),
    ok: "La vue ne dépend plus du fallback RuntimeSchedulingEngine.defaultDurationMinutes.",
    fail: "La vue dépend encore du fallback RuntimeSchedulingEngine.defaultDurationMinutes.",
  },
  {
    id: "VIEW_NO_DIRECT_BUFFER_CONFIG",
    severity: "HIGH",
    test: (content) =>
      !content.includes("bufferMinutes: schedulingConfig.bufferMinutes") &&
      !content.includes("bufferMinutes: schedulingConfig?.bufferMinutes"),
    ok: "La vue ne transmet plus directement bufferMinutes.",
    fail: "La vue transmet encore directement bufferMinutes.",
  },
  {
    id: "VIEW_NO_DIRECT_DURATION_CONFIG",
    severity: "HIGH",
    test: (content) =>
      !content.includes("schedulingConfig.durationMinutes") &&
      !content.includes("schedulingConfig.defaultDurationMinutes") &&
      !content.includes("schedulingConfig.slotDurationMinutes"),
    ok: "La vue ne lit plus directement duration/defaultDuration/slotDuration depuis schedulingConfig.",
    fail: "La vue lit encore directement une durée depuis schedulingConfig.",
  },
  {
    id: "VIEW_CAPACITY_DISPLAY_ALLOWED",
    severity: "INFO",
    test: (content) =>
      content.includes("remainingCapacity") || content.includes("slot.capacity"),
    ok: "La vue affiche capacity/remainingCapacity comme information UI.",
    fail: "La vue n’affiche pas capacity/remainingCapacity ; ce n’est pas bloquant.",
  },
  {
    id: "VIEW_NO_AMARKHYS_HARDCODE",
    severity: "HIGH",
    test: (content) =>
      !/amarkhys|garage|clientsauto|vehiculesauto|interventionsauto/i.test(content),
    ok: "La vue ne contient pas de hardcode AMARKHYS/garage.",
    fail: "La vue contient du vocabulaire AMARKHYS/garage ou module métier hardcodé.",
  },
];

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${AUDIT_ID}] Fichier introuvable: ${rel(file)}`);
  }

  return fs.readFileSync(file, "utf8");
}

function escapeMd(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

const content = read(TARGET);

const results = CHECKS.map((check) => {
  const ok = check.test(content);

  return {
    ...check,
    status: ok ? "OK" : "FAIL",
    message: ok ? check.ok : check.fail,
  };
});

const failed = results.filter((item) => item.status === "FAIL");
const failHigh = failed.filter((item) => item.severity === "HIGH");
const failInfo = failed.filter((item) => item.severity === "INFO");

function table(rows) {
  if (rows.length === 0) return "_Aucun élément._\n";

  return [
    "| Statut | Sévérité | Check | Message |",
    "|---|---|---|---|",
    ...rows.map(
      (item) =>
        `| ${item.status} | ${item.severity} | ${escapeMd(item.id)} | ${escapeMd(item.message)} |`
    ),
  ].join("\n") + "\n";
}

const report = [
  `# ${AUDIT_ID} — Planning UI runtime consumption audit`,
  "",
  "## Objectif",
  "",
  "Vérifier que `ERPSchedulingPlanningView` consomme les slots calculés par le runtime/policy sans recalculer duration, buffer ou capacity.",
  "",
  "## Doctrine",
  "",
  "La vue affiche. Le runtime calcule. La policy résout. Les metadata déclarent.",
  "",
  "## Résumé",
  "",
  `- Checks : ${results.length}`,
  `- OK : ${results.filter((item) => item.status === "OK").length}`,
  `- FAIL : ${failed.length}`,
  `- FAIL_HIGH : ${failHigh.length}`,
  `- FAIL_INFO : ${failInfo.length}`,
  "",
  "## FAIL HIGH — à corriger avant test UI manuel",
  "",
  table(failHigh),
  "",
  "## FAIL INFO — non bloquant",
  "",
  table(failInfo),
  "",
  "## Tous les checks",
  "",
  table(results),
  "",
  "## Décision attendue",
  "",
  "- Si FAIL_HIGH = 0 : la vue planning est acceptable pour test manuel.",
  "- Si FAIL_HIGH > 0 : corriger avant test manuel.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log(`[${AUDIT_ID}] DONE`);
console.log(`[CHECKS] ${results.length}`);
console.log(`[OK] ${results.filter((item) => item.status === "OK").length}`);
console.log(`[FAIL] ${failed.length}`);
console.log(`[FAIL_HIGH] ${failHigh.length}`);
console.log(`[FAIL_INFO] ${failInfo.length}`);
console.log(`[REPORT] ${rel(REPORT)}`);