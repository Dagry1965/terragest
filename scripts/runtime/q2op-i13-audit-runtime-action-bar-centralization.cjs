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

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function findLines(content, pattern) {
  const regex =
    pattern instanceof RegExp
      ? pattern
      : new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");

  return [...content.matchAll(regex)].map((match) => ({
    line: lineNumberAt(content, match.index ?? 0),
    text: content.split(/\r?\n/)[lineNumberAt(content, match.index ?? 0) - 1] ?? "",
  }));
}

function contextAround(content, line, before = 6, after = 10) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, line - before - 1);
  const end = Math.min(lines.length, line + after);

  return lines
    .slice(start, end)
    .map((text, index) => {
      const actual = start + index + 1;
      return `${String(actual).padStart(4, " ")}: ${text}`;
    })
    .join("\n");
}

const files = {
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  details: "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
};

const form = read(files.form);
const runtimePage = read(files.runtimePage);
const actionBar = read(files.actionBar);
const details = read(files.details);
const relatedPanel = read(files.relatedPanel);

const checks = [];
const contexts = [];

function add(area, status, severity, message, file = "", lines = "") {
  checks.push({ area, status, severity, message, file, lines });
}

function addContexts(file, content, pattern, label, limit = 8) {
  const hits = findLines(content, pattern);

  for (const hit of hits.slice(0, limit)) {
    contexts.push({
      title: `${file} :: ${label} :: line ${hit.line}`,
      body: contextAround(content, hit.line),
    });
  }

  return hits;
}

/**
 * 1. File presence.
 */
for (const [key, file] of Object.entries(files)) {
  const content = read(file);
  add("file", content ? "OK" : "FAIL", "HIGH", `${file} ${content ? "found" : "missing"}`, file);
}

/**
 * 2. Form must not contain workflow/action runtime responsibilities.
 */
const formForbidden = [
  "workflowActions",
  "workflowActions.map",
  "RuntimeActionEngine",
  "RuntimeActionEngine.execute",
  "pendingWorkflowActionRef",
  "handleRuntimeAction",
];

for (const marker of formForbidden) {
  const hits = addContexts(files.form, form, marker, marker, 4);

  if (hits.length > 0) {
    add(
      "form-forbidden",
      "FAIL",
      "HIGH",
      `${marker} still exists in ERPEnterpriseForm`,
      files.form,
      hits.map((hit) => hit.line).join(", ")
    );
  } else {
    add("form-forbidden", "OK", "HIGH", `${marker} absent from ERPEnterpriseForm`, files.form);
  }
}

/**
 * 3. Form may keep non-workflow buttons: submit, cancel, delete, business status if already existing.
 * These are noted, not failed.
 */
const formAllowedMarkers = [
  'type="submit"',
  "handleDeleteRecord",
  "handleBusinessStatusAction",
  "router.push(",
  "ERPButton",
];

for (const marker of formAllowedMarkers) {
  const hits = addContexts(files.form, form, marker, marker, 4);

  add(
    "form-allowed-ui",
    hits.length > 0 ? "INFO" : "WARN",
    "LOW",
    `${marker} ${hits.length > 0 ? "present" : "not found"} in ERPEnterpriseForm`,
    files.form,
    hits.map((hit) => hit.line).join(", ")
  );
}

/**
 * 4. RuntimePage must own runtime action computation and action execution.
 */
const runtimePageRequired = [
  "RuntimeActionEngine",
  "RuntimeActionEngine.getAvailableActions",
  "RuntimeActionEngine.execute",
  "runtimeActions",
  "handleRuntimeAction",
  "ERPRuntimeActionBar",
  "mapRuntimeActionsToActionBarActions",
];

for (const marker of runtimePageRequired) {
  const hits = addContexts(files.runtimePage, runtimePage, marker, marker, 6);

  if (hits.length > 0) {
    add(
      "runtime-page-required",
      "OK",
      "HIGH",
      `${marker} present in ERPRuntimePage`,
      files.runtimePage,
      hits.map((hit) => hit.line).join(", ")
    );
  } else {
    add(
      "runtime-page-required",
      "FAIL",
      "HIGH",
      `${marker} missing from ERPRuntimePage`,
      files.runtimePage
    );
  }
}

/**
 * 5. RuntimePage must no longer pass workflowActions into the form.
 */
const runtimePageForbidden = [
  "workflowActions={",
  "workflowActions=",
];

for (const marker of runtimePageForbidden) {
  const hits = addContexts(files.runtimePage, runtimePage, marker, marker, 6);

  if (hits.length > 0) {
    add(
      "runtime-page-forbidden",
      "FAIL",
      "HIGH",
      `${marker} still passed/rendered in ERPRuntimePage`,
      files.runtimePage,
      hits.map((hit) => hit.line).join(", ")
    );
  } else {
    add(
      "runtime-page-forbidden",
      "OK",
      "HIGH",
      `${marker} absent from ERPRuntimePage`,
      files.runtimePage
    );
  }
}

/**
 * 6. RuntimeActionBar capabilities.
 */
const actionBarRequired = [
  "ERPRuntimeActionBar",
  "ERPRuntimeActionBarAction",
  "data-runtime-action-bar",
  "action.href",
  "action.onClick",
  "RuntimeActionButton",
];

for (const marker of actionBarRequired) {
  const hits = addContexts(files.actionBar, actionBar, marker, marker, 4);

  if (hits.length > 0) {
    add(
      "action-bar-required",
      "OK",
      "HIGH",
      `${marker} present in ERPRuntimeActionBar`,
      files.actionBar,
      hits.map((hit) => hit.line).join(", ")
    );
  } else {
    add(
      "action-bar-required",
      "FAIL",
      "HIGH",
      `${marker} missing from ERPRuntimeActionBar`,
      files.actionBar
    );
  }
}

/**
 * 7. Detect remaining legacy direct action button maps in runtime page.
 * These are not always fatal, because detail may still have legacy buttons,
 * but they should be flagged as migration debt.
 */
const legacyRuntimePageButtonMarkers = [
  "runtimeActions.map",
  "<button",
  "handleRuntimeAction(action)",
];

for (const marker of legacyRuntimePageButtonMarkers) {
  const hits = addContexts(files.runtimePage, runtimePage, marker, marker, 8);

  add(
    "runtime-page-legacy",
    hits.length > 0 ? "WARN" : "OK",
    hits.length > 0 ? "MEDIUM" : "LOW",
    `${marker} ${hits.length > 0 ? "still present" : "absent"} in ERPRuntimePage`,
    files.runtimePage,
    hits.map((hit) => hit.line).join(", ")
  );
}

/**
 * 8. Detect duplicate action rendering risk:
 * If ERPRuntimeActionBar exists AND runtimeActions.map still exists,
 * user might see duplicate buttons on detail pages.
 */
const hasActionBar = runtimePage.includes("ERPRuntimeActionBar");
const hasLegacyRuntimeActionsMap = runtimePage.includes("runtimeActions.map");

if (hasActionBar && hasLegacyRuntimeActionsMap) {
  add(
    "duplicate-risk",
    "WARN",
    "HIGH",
    "ERPRuntimePage has both ERPRuntimeActionBar and legacy runtimeActions.map. Possible duplicate action buttons.",
    files.runtimePage
  );
} else if (hasActionBar) {
  add(
    "duplicate-risk",
    "OK",
    "HIGH",
    "Runtime action rendering appears centralized through ERPRuntimeActionBar.",
    files.runtimePage
  );
}

/**
 * 9. Related/details payment buttons are noted separately.
 */
const detailPaymentMarkers = [
  "encaissement",
  "paiement",
  "buildRuntimeFactureEncaissementCreateHref",
];

for (const marker of detailPaymentMarkers) {
  const detailHits = addContexts(files.details, details, marker, marker, 4);
  const panelHits = addContexts(files.relatedPanel, relatedPanel, marker, marker, 4);

  add(
    "payment-related-buttons",
    detailHits.length + panelHits.length > 0 ? "INFO" : "OK",
    "MEDIUM",
    `${marker} occurrences in details/panels: ${detailHits.length + panelHits.length}`,
    `${files.details} / ${files.relatedPanel}`,
    [...detailHits, ...panelHits].map((hit) => hit.line).join(", ")
  );
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const warnHigh = checks.filter((c) => c.status === "WARN" && c.severity === "HIGH").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I13 — Audit centralisation des boutons métier côté Runtime Action Bar");
report.push("");
report.push("Objectif : vérifier que les boutons workflow/actions métier ne sont plus rendus par `ERPEnterpriseForm`, et que la responsabilité est centralisée côté `ERPRuntimePage` / `ERPRuntimeActionBar`.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- INFO : ${info}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Doctrine cible");
report.push("");
report.push("- `ERPEnterpriseForm` = champs, validation, submit, annuler, supprimer.");
report.push("- `ERPEnterpriseForm` ne doit pas connaître `RuntimeActionEngine`.");
report.push("- `ERPEnterpriseForm` ne doit plus recevoir `workflowActions`.");
report.push("- `ERPRuntimePage` orchestre le module, le record, les permissions et les actions.");
report.push("- `ERPRuntimeActionBar` rend les boutons métier.");
report.push("");
report.push("## Checks");
report.push("");
report.push("| Area | Status | Severity | File | Lines | Message |");
report.push("|---|---:|---:|---|---|---|");

for (const check of checks) {
  report.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.lines || ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Contextes utiles");
report.push("");

for (const ctx of contexts.slice(0, 80)) {
  report.push(`### ${ctx.title}`);
  report.push("");
  report.push("```tsx");
  report.push(ctx.body);
  report.push("```");
  report.push("");
}

report.push("## Conclusion");
report.push("");

if (failHigh > 0) {
  report.push("La centralisation n’est pas encore validée : il reste des responsabilités workflow/action dans le formulaire ou des props workflowActions passées au formulaire.");
} else if (warnHigh > 0) {
  report.push("La séparation formulaire/runtime est globalement en place, mais il reste un risque de doublon ou une dette de migration côté `ERPRuntimePage`.");
} else {
  report.push("La centralisation des boutons métier côté runtime action bar est validée.");
}

report.push("");
report.push("## Prochaine passe recommandée");
report.push("");
report.push("- Si `runtimeActions.map` existe encore dans `ERPRuntimePage`, faire `Q2-OP-I14` pour supprimer le rendu legacy direct et ne garder que `ERPRuntimeActionBar`.");
report.push("- Sinon, passer à la formalisation des workflows metadata prioritaire : `rendezvous`, `interventionsauto`, `lignesinterventionauto`, `facturesauto`, `encaissementsauto`.");

write("docs/audits/Q2-OP-I13-runtime-action-bar-centralization-audit.md", report.join("\n"));

console.log("[Q2-OP-I13] Runtime action bar centralization audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I13-runtime-action-bar-centralization-audit.md");
console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.lines ? " :: lines " + check.lines : ""}`
    );
  }
}