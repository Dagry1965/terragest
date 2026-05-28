const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/business-rules/runtimeBusinessRules.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
  "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  "src/runtime/workflow-persistence/WorkflowRuntimeService.ts",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  "src/components/erp/runtime/ERPRuntimeTable.tsx"
];

const patterns = [
  "RuntimeStatusGovernanceEngine",
  "RuntimeActionEngine",
  "workflow",
  "actions",
  "rendezvousActions",
  "interventionsautoActions",
  "statut",
  "status",
  "planifie",
  "confirme",
  "en_cours",
  "termine",
  "annule",
  "facture",
  "confirmed",
  "cancel",
  "annuler",
  "cancelledAt",
  "cancelReason",
  "consumedByInterventionId",
  "create",
  "intervention",
  "transition",
  "runtimeOnly",
  "action_only",
  "editMode",
  "visibleStatusKeys",
  "blockingStatuses"
];

function printContext(content, pattern, context = 6) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(pattern.toLowerCase())) {
      hits.push(index);
    }
  });

  return hits.slice(0, 6).map((hit) => {
    const start = Math.max(0, hit - context);
    const end = Math.min(lines.length, hit + context + 1);

    return lines
      .slice(start, end)
      .map((line, idx) => String(start + idx + 1).padStart(4, "0") + ": " + line)
      .join("\n");
  });
}

console.log("");
console.log("[Q1-D-A-STATUS-WORKFLOW-ACTIONS-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING] " + rel);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");

  const found = patterns.filter((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (found.length === 0) {
    continue;
  }

  console.log("");
  console.log("============================================================");
  console.log("FILE: " + rel);
  console.log("MATCHES: " + found.join(", "));
  console.log("============================================================");

  for (const pattern of found) {
    console.log("");
    console.log("---- PATTERN: " + pattern + " ----");

    const blocks = printContext(content, pattern, 6);

    for (const block of blocks.slice(0, 3)) {
      console.log(block);
      console.log("");
    }
  }
}

const outDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const reportPath = path.join(outDir, "Q1-D-A-STATUS-WORKFLOW-ACTIONS-AUDIT.txt");
fs.writeFileSync(
  reportPath,
  "Audit printed in console. Re-run scripts/runtime/q1d-a-status-workflow-actions-audit.cjs to inspect.\n",
  "utf8"
);

console.log("");
console.log("[REPORT]", path.relative(ROOT, reportPath));
console.log("");
console.log("[NEXT]");
console.log("Copie-colle surtout les sections RuntimeStatusGovernanceEngine, RuntimeActionEngine, rendezvous.module/actions et runtimeBusinessRules.");
