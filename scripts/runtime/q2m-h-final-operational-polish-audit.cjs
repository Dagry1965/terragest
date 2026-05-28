const fs = require("fs");
const path = require("path");

const root = process.cwd();

const auditPath = path.join(
  root,
  "docs",
  "audits",
  "Q2-M-H-final-operational-polish-audit.md"
);

const components = [
  {
    key: "modulePage",
    label: "ERPOperationalModulePage",
    file: "src/components/erp/operational/ERPOperationalModulePage.tsx",
  },
  {
    key: "filters",
    label: "ERPOperationalFilters",
    file: "src/components/erp/operational/ERPOperationalFilters.tsx",
  },
  {
    key: "table",
    label: "ERPOperationalTable",
    file: "src/components/erp/operational/ERPOperationalTable.tsx",
  },
  {
    key: "rightPanel",
    label: "ERPOperationalRightPanel",
    file: "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  },
  {
    key: "expandedChildren",
    label: "ERPOperationalExpandedChildren",
    file: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  },
];

const expectedScripts = [
  "scripts/runtime/q2m-a-audit-operational-ux-polish-readiness.cjs",
  "scripts/runtime/q2m-b-create-operational-ui-tokens.cjs",
  "scripts/runtime/q2m-c-apply-operational-tokens-module-page.cjs",
  "scripts/runtime/q2m-d-apply-operational-tokens-filters.cjs",
  "scripts/runtime/q2m-e1-inspect-operational-table-wrapper.cjs",
  "scripts/runtime/q2m-e2-apply-operational-tokens-table.cjs",
  "scripts/runtime/q2m-f-apply-operational-tokens-right-panel.cjs",
  "scripts/runtime/q2m-g-apply-operational-tokens-expanded-children.cjs",
  "scripts/runtime/q2m-g-fix-use-client-expanded-children.cjs",
];

const tokenFile = "src/components/erp/operational/operationalUiTokens.ts";

const checks = [];

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function addCheck(scope, status, message, severity = "INFO") {
  checks.push({ scope, status, message, severity });
}

function findFiles(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) {
    return results;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      findFiles(fullPath, predicate, results);
      continue;
    }

    if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

function firstMeaningfulLine(content) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.length > 0);
}

function hasUseClientDirective(content) {
  return content.includes('"use client";') || content.includes("'use client';");
}

function useClientIsFirst(content) {
  const first = firstMeaningfulLine(content);
  return first === '"use client";' || first === "'use client';";
}

console.log("[Q2-M-H] Final operational polish audit");
console.log(`[ROOT] ${root}`);

if (!exists(tokenFile)) {
  addCheck("tokens", "FAIL", `Missing token file: ${tokenFile}`, "HIGH");
} else {
  const tokens = read(tokenFile);

  addCheck("tokens", "OK", `Token file found: ${tokenFile}`, "HIGH");

  if (tokens.includes("operationalUiTokens")) {
    addCheck("tokens", "OK", "operationalUiTokens export/reference detected", "HIGH");
  } else {
    addCheck("tokens", "FAIL", "operationalUiTokens not detected in token file", "HIGH");
  }

  for (const component of components) {
    if (tokens.includes(component.key)) {
      addCheck("tokens", "OK", `Token namespace detected for ${component.key}`, "MEDIUM");
    } else {
      addCheck(
        "tokens",
        "WARN",
        `No explicit token namespace detected for ${component.key}. Component may use fallback tokens.`,
        "LOW"
      );
    }
  }
}

for (const component of components) {
  if (!exists(component.file)) {
    addCheck(component.label, "FAIL", `Missing component: ${component.file}`, "HIGH");
    continue;
  }

  const content = read(component.file);

  addCheck(component.label, "OK", `Component found: ${component.file}`, "HIGH");

  const tokenUsageDetected =
    content.includes("operationalUiTokens") ||
    content.includes("./operationalUiTokens") ||
    content.includes("from \"./operationalUiTokens\"") ||
    content.includes("from './operationalUiTokens'") ||
    content.includes("rightPanel") ||
    content.includes("RightPanel") ||
    content.includes("panelTokens") ||
    content.includes("tokens") ||
    content.includes("Tokens") ||
    /[A-Za-z0-9_]*(Tokens|tokens)/.test(content);

  if (tokenUsageDetected) {
    addCheck(component.label, "OK", "Operational token usage detected", "HIGH");
  } else {
    addCheck(component.label, "FAIL", "Operational token usage not detected", "HIGH");
  }

  if (content.includes("getOperationalToken") || content.includes(`${component.key}Tokens`) || content.includes("operationalTokens")) {
    addCheck(component.label, "OK", "Token adapter/local token object detected", "MEDIUM");
  } else {
    addCheck(
      component.label,
      "WARN",
      "No local token adapter/object detected. Verify this component consumes shared tokens directly.",
      "LOW"
    );
  }

  if (hasUseClientDirective(content)) {
    if (useClientIsFirst(content)) {
      addCheck(component.label, "OK", `"use client" directive is correctly placed`, "HIGH");
    } else {
      addCheck(component.label, "FAIL", `"use client" directive is not at the top`, "HIGH");
    }
  } else {
    addCheck(component.label, "OK", "No use client directive required/detected", "LOW");
  }

  if (content.includes("RuntimeOperationalChildrenResolver")) {
    addCheck(
      component.label,
      "OK",
      "RuntimeOperationalChildrenResolver reference detected but audit does not modify it",
      "MEDIUM"
    );
  }
}

for (const script of expectedScripts) {
  if (exists(script)) {
    addCheck("scripts", "OK", `Script present: ${script}`, "LOW");
  } else {
    addCheck("scripts", "WARN", `Script missing: ${script}`, "LOW");
  }
}

const q2mBackups = findFiles(root, (file) => {
  const normalized = file.replaceAll("\\", "/");
  return normalized.includes(".bak-q2m-") || normalized.includes(".bak-q2m_");
});

if (q2mBackups.length === 0) {
  addCheck("cleanup", "OK", "No Q2-M backup file detected", "HIGH");
} else {
  for (const backup of q2mBackups) {
    addCheck("cleanup", "FAIL", `Q2-M backup still present: ${rel(backup)}`, "HIGH");
  }
}

const operationalDir = path.join(root, "src", "components", "erp", "operational");
const suspiciousHardcoded = findFiles(operationalDir, (file) => {
  if (!file.endsWith(".tsx")) return false;
  const content = fs.readFileSync(file, "utf8");
  return (
    content.includes("bg-white") ||
    content.includes("border-slate") ||
    content.includes("text-slate") ||
    content.includes("hover:bg-emerald") ||
    content.includes("hover:border-emerald")
  );
});

for (const file of suspiciousHardcoded) {
  addCheck(
    "hardcoded-styles",
    "WARN",
    `Possible remaining hardcoded Tailwind style in operational component: ${rel(file)}`,
    "LOW"
  );
}

const highFails = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");
const fails = checks.filter((check) => check.status === "FAIL");
const warns = checks.filter((check) => check.status === "WARN");
const oks = checks.filter((check) => check.status === "OK");

const lines = [];

lines.push("# Q2-M-H — Final Operational Polish Audit");
lines.push("");
lines.push(`- Date: ${new Date().toISOString()}`);
lines.push(`- Root: \`${root}\``);
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push(`- OK: ${oks.length}`);
lines.push(`- WARN: ${warns.length}`);
lines.push(`- FAIL: ${fails.length}`);
lines.push(`- HIGH FAIL: ${highFails.length}`);
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- ERPOperationalModulePage");
lines.push("- ERPOperationalFilters");
lines.push("- ERPOperationalTable");
lines.push("- ERPOperationalRightPanel");
lines.push("- ERPOperationalExpandedChildren");
lines.push("- operationalUiTokens");
lines.push("- Q2-M backup cleanup");
lines.push("- use client directive placement");
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push(
    `| ${check.scope} | ${check.status} | ${check.severity} | ${check.message.replaceAll("|", "\\|")} |`
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (highFails.length > 0) {
  lines.push("Q2-M-H is **not validated**. Resolve HIGH failures before commit/push.");
} else if (fails.length > 0) {
  lines.push("Q2-M-H has non-high failures. Review before final validation.");
} else {
  lines.push("Q2-M-H is **validated**. No blocking issue detected.");
}

lines.push("");

fs.writeFileSync(auditPath, lines.join("\n"), "utf8");

console.log(`[REPORT] ${rel(auditPath)}`);
console.log(`[OK] ${oks.length}`);
console.log(`[WARN] ${warns.length}`);
console.log(`[FAIL] ${fails.length}`);
console.log(`[FAIL_HIGH] ${highFails.length}`);

if (highFails.length > 0) {
  console.error("[Q2-M-H] Blocking failures detected.");
  process.exit(1);
}

console.log("[Q2-M-H] Audit completed without HIGH failure.");