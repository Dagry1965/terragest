const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targetRel = "src/components/erp/operational/ERPOperationalTreeView.tsx";
const target = path.join(ROOT, targetRel);

const reportRel = "docs/audits/Q2-I-C3-operational-tree-view-audit.md";
const report = path.join(ROOT, reportRel);

const checks = [];
const ok = [];
const fail = [];

function addCheck(label, condition, details = "") {
  checks.push({ label, condition, details });
  if (condition) {
    ok.push({ label, details });
  } else {
    fail.push({ label, details });
  }
}

if (!fs.existsSync(target)) {
  throw new Error("Missing file: " + targetRel);
}

const source = fs.readFileSync(target, "utf8");

addCheck(
  "Component file exists",
  fs.existsSync(target),
  targetRel
);

addCheck(
  "Receives RuntimeOperationalTreeNode",
  /RuntimeOperationalTreeNode/.test(source),
  "The component must be typed from the runtime tree resolver contract."
);

addCheck(
  "Displays node label",
  /\bnode\.label\b|\blabel\b/.test(source),
  "Tree nodes must expose the business label."
);

addCheck(
  "Displays node subtitle",
  /\bnode\.subtitle\b|\bsubtitle\b/.test(source),
  "Tree nodes must expose the business subtitle."
);

addCheck(
  "Displays moduleLabel",
  /\bmoduleLabel\b/.test(source),
  "Tree nodes must expose the module label."
);

addCheck(
  "Displays nodeRole",
  /\bnodeRole\b/.test(source),
  "Tree nodes must expose the semantic node role."
);

addCheck(
  "Displays source information",
  /\bsource\b/.test(source) &&
  /sourceScope|sourceType|sourceModule|sourceRecordId|sourceLabel/.test(source),
  "Tree nodes must support documentary/source metadata."
);

addCheck(
  "Supports recursive children rendering",
  /children/.test(source) &&
  /map\(/.test(source) &&
  /ERPOperationalTreeView|TreeNode|renderNode/.test(source),
  "The component must render children recursively or through a recursive renderer."
);

addCheck(
  "Supports local expand/collapse",
  /useState/.test(source) &&
  /expanded|collapsed|isOpen|open/.test(source),
  "Expand/collapse must stay local to the UI component."
);

addCheck(
  "Supports openLabel",
  /\bopenLabel\b/.test(source),
  "The component must expose navigation wording without owning navigation policy."
);

addCheck(
  "Does not read Firestore directly",
  !/firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(source),
  "The UI component must not access Firestore."
);

addCheck(
  "Does not call RuntimeDataBinding.list",
  !/RuntimeDataBinding\.list/.test(source),
  "The UI component must not load data directly."
);

addCheck(
  "Does not hardcode AMARKHYS",
  !/AMARKHYS|amarkhys|ORG_AMARKHYS_001/.test(source),
  "The UI component must remain product/runtime generic."
);

addCheck(
  "Does not use missing operationalUiTokens.card",
  !/operationalUiTokens\.card\b/.test(source),
  "The previous build error must be removed."
);

const lines = [];
lines.push("# Q2-I-C3 — ERPOperationalTreeView generic audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Component: `" + targetRel + "`");
lines.push("- Goal: validate generic runtime-driven tree UI foundation.");
lines.push("- No page wiring in this pass.");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- FAIL: " + fail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Status | Check | Details |");
lines.push("|---|---|---|");

for (const check of checks) {
  lines.push(
    "| " +
      (check.condition ? "OK" : "FAIL") +
      " | " +
      check.label.replace(/\|/g, "\\|") +
      " | " +
      String(check.details || "").replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-C3 is validated. `ERPOperationalTreeView` is ready as a generic UI foundation.");
  lines.push("");
  lines.push("Next step: Q2-I-D can wire the tree into a runtime page/view, after a dedicated readiness audit.");
} else {
  lines.push("Q2-I-C3 is not validated. Fix the failed checks before wiring the tree into any page.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-C3] ERPOperationalTreeView generic audit");
console.log("[OK]", ok.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
