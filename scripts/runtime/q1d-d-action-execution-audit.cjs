const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/workflow-persistence/WorkflowRuntimeService.ts",
  "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/runtime/ERPRuntimeTable.tsx"
];

const patterns = [
  "static async execute",
  "execute(",
  "executeAction",
  "WorkflowRuntimeService",
  "applyTransition",
  "runTransition",
  "transition",
  "action.key",
  "RuntimeDataBinding.update",
  "module.metadata.key",
  "rendezvous",
  "Annuler",
  "success",
  "message"
];

console.log("");
console.log("[Q1-D-D-ACTION-EXECUTION-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING]", rel);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const found = patterns.filter((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (found.length === 0) continue;

  console.log("");
  console.log("============================================================");
  console.log("FILE:", rel);
  console.log("MATCHES:", found.join(", "));
  console.log("============================================================");

  for (const pattern of found) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");

    const hits = [];
    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(pattern.toLowerCase())) {
        hits.push(index);
      }
    });

    for (const hit of hits.slice(0, 5)) {
      const start = Math.max(0, hit - 8);
      const end = Math.min(lines.length, hit + 18);

      console.log(
        lines
          .slice(start, end)
          .map((line, idx) => String(start + idx + 1).padStart(4, "0") + ": " + line)
          .join("\n")
      );
      console.log("");
    }
  }
}

console.log("");
console.log("[NEXT]");
console.log("Copie-colle surtout RuntimeActionEngine.execute et WorkflowRuntimeService.");
