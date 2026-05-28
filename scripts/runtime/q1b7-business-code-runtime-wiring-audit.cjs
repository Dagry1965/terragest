const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/firestore/FirestoreRuntimeMutation.ts",
  "src/runtime/codes/RuntimeBusinessCodeGenerator.ts",
  "src/runtime/codes/RuntimeBusinessSequenceRepository.ts",
  "src/components/public/PublicAppointmentService.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
];

const patterns = [
  "RuntimeBusinessCodeGenerator",
  "businessCodedData",
  "processRuntimeBeforeMutationGuards",
  "FirestoreRuntimeRepository.create",
  "businessCode",
  "codeClient",
  "codeVehicule",
  "codeRendezVous",
  "runtimeBusinessSequences",
  "runTransaction",
  "tenantId",
  "workspace",
  "workspaceId",
  "crypto.randomUUID",
];

console.log("");
console.log("[Q1-B7-BUSINESS-CODE-RUNTIME-WIRING-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING]", rel);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  console.log("");
  console.log("============================================================");
  console.log("FILE:", rel);
  console.log("============================================================");

  for (const pattern of patterns) {
    const hits = [];

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes(pattern.toLowerCase())) {
        hits.push(index);
      }
    });

    if (hits.length === 0) continue;

    console.log("");
    console.log("---- PATTERN:", pattern, "----");

    for (const hit of hits.slice(0, 5)) {
      const start = Math.max(0, hit - 5);
      const end = Math.min(lines.length, hit + 10);

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
console.log("Copie-colle les sections FirestoreRuntimeMutation + PublicAppointmentService.");
