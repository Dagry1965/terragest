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

function countOccurrences(content, pattern) {
  const regex = typeof pattern === "string"
    ? new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")
    : pattern;

  const matches = content.match(regex);
  return matches ? matches.length : 0;
}

function findLineNumbers(content, pattern) {
  const lines = content.split(/\r?\n/);
  const results = [];

  const regex = typeof pattern === "string"
    ? new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    : pattern;

  for (let i = 0; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      results.push({
        line: i + 1,
        text: lines[i],
      });
    }
  }

  return results;
}

function getContext(content, lineNumber, before = 4, after = 8) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);

  return lines
    .slice(start, end)
    .map((line, index) => {
      const actualLine = start + index + 1;
      return `${String(actualLine).padStart(4, " ")}: ${line}`;
    })
    .join("\n");
}

function add(checks, area, status, severity, message, file = "", line = "") {
  checks.push({
    area,
    status,
    severity,
    message,
    file,
    line,
  });
}

const files = {
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimeActionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  runtimeWorkflowEngine: "src/runtime/workflows/RuntimeWorkflowEngine.ts",
};

const form = read(files.form);
const runtimePage = read(files.runtimePage);
const checks = [];
const contexts = [];

if (!form) {
  add(checks, "file", "FAIL", "HIGH", "ERPEnterpriseForm file missing.", files.form);
} else {
  add(checks, "file", "OK", "HIGH", "ERPEnterpriseForm file found.", files.form);
}

if (!runtimePage) {
  add(checks, "file", "FAIL", "HIGH", "ERPRuntimePage file missing.", files.runtimePage);
} else {
  add(checks, "file", "OK", "HIGH", "ERPRuntimePage file found.", files.runtimePage);
}

const markers = [
  {
    key: "workflowActions",
    area: "form-props",
    severity: "HIGH",
    message: "ERPEnterpriseForm references workflowActions.",
  },
  {
    key: "RuntimeActionEngine",
    area: "runtime-engine",
    severity: "HIGH",
    message: "ERPEnterpriseForm imports or calls RuntimeActionEngine.",
  },
  {
    key: "RuntimeWorkflowEngine",
    area: "runtime-engine",
    severity: "HIGH",
    message: "ERPEnterpriseForm imports or calls RuntimeWorkflowEngine.",
  },
  {
    key: "executeTransition",
    area: "runtime-workflow",
    severity: "HIGH",
    message: "ERPEnterpriseForm may execute workflow transitions.",
  },
  {
    key: "executeAction",
    area: "runtime-action",
    severity: "HIGH",
    message: "ERPEnterpriseForm may execute runtime actions.",
  },
  {
    key: "handleWorkflow",
    area: "handler",
    severity: "HIGH",
    message: "ERPEnterpriseForm contains a workflow handler.",
  },
  {
    key: "handleRuntimeAction",
    area: "handler",
    severity: "HIGH",
    message: "ERPEnterpriseForm contains a runtime action handler.",
  },
  {
    key: "onClick",
    area: "ui-buttons",
    severity: "MEDIUM",
    message: "ERPEnterpriseForm contains clickable handlers.",
  },
  {
    key: "<button",
    area: "ui-buttons",
    severity: "MEDIUM",
    message: "ERPEnterpriseForm renders native buttons.",
  },
  {
    key: "ERPButton",
    area: "ui-buttons",
    severity: "MEDIUM",
    message: "ERPEnterpriseForm renders ERPButton.",
  },
  {
    key: "type=\"submit\"",
    area: "submit",
    severity: "LOW",
    message: "ERPEnterpriseForm renders submit button.",
  },
  {
    key: "type=\"button\"",
    area: "ui-buttons",
    severity: "MEDIUM",
    message: "ERPEnterpriseForm renders non-submit buttons.",
  },
];

for (const marker of markers) {
  const count = countOccurrences(form, marker.key);
  const hits = findLineNumbers(form, marker.key);

  if (count > 0) {
    const status =
      marker.area === "submit"
        ? "INFO"
        : marker.area === "ui-buttons"
          ? "WARN"
          : "WARN";

    add(
      checks,
      marker.area,
      status,
      marker.severity,
      `${marker.message} Count=${count}.`,
      files.form,
      hits.map((hit) => hit.line).join(", ")
    );

    for (const hit of hits.slice(0, 6)) {
      contexts.push({
        title: `${files.form} :: ${marker.key} :: line ${hit.line}`,
        content: getContext(form, hit.line),
      });
    }
  } else {
    add(
      checks,
      marker.area,
      "OK",
      marker.severity,
      `${marker.message} Not found.`,
      files.form
    );
  }
}

const runtimePageMarkers = [
  {
    key: "workflowActions={",
    area: "runtime-page-pass",
    severity: "HIGH",
    message: "ERPRuntimePage passes workflowActions into ERPEnterpriseForm.",
  },
  {
    key: "workflowActions=",
    area: "runtime-page-pass",
    severity: "HIGH",
    message: "ERPRuntimePage passes workflowActions prop.",
  },
  {
    key: "<ERPEnterpriseForm",
    area: "runtime-page-form",
    severity: "HIGH",
    message: "ERPRuntimePage renders ERPEnterpriseForm.",
  },
  {
    key: "RuntimeActionEngine",
    area: "runtime-page-actions",
    severity: "HIGH",
    message: "ERPRuntimePage uses RuntimeActionEngine.",
  },
  {
    key: "runtimeActions",
    area: "runtime-page-actions",
    severity: "HIGH",
    message: "ERPRuntimePage has runtimeActions.",
  },
  {
    key: "buildInvoicePaymentHref",
    area: "runtime-page-payment",
    severity: "MEDIUM",
    message: "ERPRuntimePage still has invoice payment action helper.",
  },
];

for (const marker of runtimePageMarkers) {
  const count = countOccurrences(runtimePage, marker.key);
  const hits = findLineNumbers(runtimePage, marker.key);

  if (count > 0) {
    add(
      checks,
      marker.area,
      "WARN",
      marker.severity,
      `${marker.message} Count=${count}.`,
      files.runtimePage,
      hits.map((hit) => hit.line).join(", ")
    );

    for (const hit of hits.slice(0, 6)) {
      contexts.push({
        title: `${files.runtimePage} :: ${marker.key} :: line ${hit.line}`,
        content: getContext(runtimePage, hit.line),
      });
    }
  } else {
    add(
      checks,
      marker.area,
      "OK",
      marker.severity,
      `${marker.message} Not found.`,
      files.runtimePage
    );
  }
}

const suspiciousButtonRegexes = [
  {
    label: "workflow map rendering",
    regex: /workflowActions\.map|workflowActions\?\.map|availableTransitions\.map/g,
  },
  {
    label: "runtime action map rendering",
    regex: /runtimeActions\.map|actions\.map|availableActions\.map/g,
  },
  {
    label: "workflow/action button labels",
    regex: /Confirmer|Démarrer|Demarrer|Terminer|Annuler|Facturer|Valider|Rejeter|Relancer|Retirer|Paiement|paiement|workflow|transition/g,
  },
];

for (const item of suspiciousButtonRegexes) {
  const hits = findLineNumbers(form, item.regex);

  if (hits.length > 0) {
    add(
      checks,
      "suspicious-rendering",
      "WARN",
      "HIGH",
      `Suspicious form workflow/action rendering marker: ${item.label}. Count=${hits.length}.`,
      files.form,
      hits.map((hit) => hit.line).join(", ")
    );

    for (const hit of hits.slice(0, 8)) {
      contexts.push({
        title: `${files.form} :: ${item.label} :: line ${hit.line}`,
        content: getContext(form, hit.line, 5, 10),
      });
    }
  } else {
    add(
      checks,
      "suspicious-rendering",
      "OK",
      "HIGH",
      `No suspicious form workflow/action rendering marker: ${item.label}.`,
      files.form
    );
  }
}

const formShouldNotHave = [
  "RuntimeActionEngine",
  "RuntimeWorkflowEngine",
  "workflowActions.map",
  "availableTransitions.map",
  "executeTransition",
  "executeAction",
];

const remainingForbidden = formShouldNotHave.filter((marker) =>
  form.includes(marker)
);

if (remainingForbidden.length > 0) {
  add(
    checks,
    "target-architecture",
    "WARN",
    "HIGH",
    "ERPEnterpriseForm violates target architecture. Forbidden markers: " + remainingForbidden.join(", "),
    files.form
  );
} else {
  add(
    checks,
    "target-architecture",
    "OK",
    "HIGH",
    "ERPEnterpriseForm has no high-level forbidden workflow/action markers.",
    files.form
  );
}

const runtimePagePassesWorkflowActions =
  runtimePage.includes("workflowActions={") ||
  runtimePage.includes("workflowActions=");

if (runtimePagePassesWorkflowActions) {
  add(
    checks,
    "target-architecture",
    "WARN",
    "HIGH",
    "ERPRuntimePage still passes workflowActions into ERPEnterpriseForm. Target is ERPRuntimeActionBar outside form.",
    files.runtimePage
  );
} else {
  add(
    checks,
    "target-architecture",
    "OK",
    "HIGH",
    "ERPRuntimePage does not pass workflowActions into ERPEnterpriseForm.",
    files.runtimePage
  );
}

const ok = checks.filter((check) => check.status === "OK").length;
const info = checks.filter((check) => check.status === "INFO").length;
const warn = checks.filter((check) => check.status === "WARN").length;
const fail = checks.filter((check) => check.status === "FAIL").length;
const warnHigh = checks.filter((check) => check.status === "WARN" && check.severity === "HIGH").length;
const failHigh = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I9 — Audit précis des boutons workflow/actions dans ERPEnterpriseForm");
report.push("");
report.push("Objectif : identifier précisément si le formulaire enterprise porte encore des boutons workflow/actions, handlers ou moteurs runtime qui doivent être déplacés vers une barre d’actions runtime.");
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
report.push("- `ERPEnterpriseForm` doit afficher/saisir les champs.");
report.push("- `ERPEnterpriseForm` ne doit pas rendre les boutons workflow.");
report.push("- `ERPEnterpriseForm` ne doit pas déclencher RuntimeActionEngine / RuntimeWorkflowEngine.");
report.push("- Les actions doivent être rendues dans une future `ERPRuntimeActionBar` contrôlée par `ERPRuntimePage`.");
report.push("");
report.push("## Checks");
report.push("");
report.push("| Area | Status | Severity | File | Lines | Message |");
report.push("|---|---:|---:|---|---|---|");

for (const check of checks) {
  report.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.file ? "`" + check.file + "`" : ""} | ${check.line || ""} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Contextes importants");
report.push("");

for (const context of contexts.slice(0, 80)) {
  report.push(`### ${context.title}`);
  report.push("");
  report.push("```tsx");
  report.push(context.content);
  report.push("```");
  report.push("");
}

report.push("## Conclusion");
report.push("");

if (warnHigh > 0 || failHigh > 0) {
  report.push("Le formulaire porte encore des traces de workflow/action ou reçoit encore des props d’action. La prochaine passe doit créer une barre d’actions runtime et déplacer ces responsabilités hors formulaire.");
} else {
  report.push("Aucun marqueur workflow/action critique n’a été détecté dans le formulaire. La future barre d’actions runtime peut être ajoutée sans extraction majeure.");
}

report.push("");
report.push("## Prochaine passe recommandée");
report.push("");
report.push("Q2-OP-I10 — Créer `ERPRuntimeActionBar` générique sans modifier encore les workflows.");
report.push("");
report.push("Puis Q2-OP-I11 — Déplacer l’affichage des actions hors `ERPEnterpriseForm`.");

write("docs/audits/Q2-OP-I9-enterprise-form-workflow-buttons-audit.md", report.join("\n"));

console.log("[Q2-OP-I9] Enterprise form workflow buttons audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I9-enterprise-form-workflow-buttons-audit.md");

console.log("[IMPORTANT]");
for (const check of checks) {
  if (check.status === "WARN" || check.status === "FAIL") {
    console.log(
      `[${check.status}] [${check.severity}] [${check.area}] ${check.message}${check.file ? " :: " + check.file : ""}${check.line ? " :: lines " + check.line : ""}`
    );
  }
}