const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/business-rules/runtimeBusinessRules.ts",
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/workflow-persistence/WorkflowRuntimeService.ts",
  "src/runtime/data-binding/RuntimeDataBinding.ts",
  "src/runtime/firestore/FirestoreRuntimeMutation.ts"
];

const patterns = [
  "rendezVousId",
  "rendezvousId",
  "rdvId",
  "consumedByInterventionId",
  "clientId",
  "vehiculeId",
  "statut",
  "annule",
  "annulee",
  "ouverte",
  "diagnostic",
  "en_cours",
  "terminee",
  "termine",
  "RuntimeDataBinding.update",
  "RuntimeDataBinding.list",
  "interventionsauto",
  "rendezvous"
];

console.log("");
console.log("[Q1-D-E-AUDIT-CASCADE-RDV-INTERVENTION]");
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

    for (const hit of hits.slice(0, 4)) {
      const start = Math.max(0, hit - 5);
      const end = Math.min(lines.length, hit + 12);

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
console.log("Copie-colle surtout les sections interventionsauto.module.ts + rendezvous.module.ts + workflow service.");
