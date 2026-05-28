const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/firestore/FirestoreRuntimeMutation.ts",
  "src/runtime/firestore/FirestoreRuntimeRepository.ts",
  "src/runtime/firestore/FirestoreRuntimeQuery.ts",
  "src/runtime/firebase/runtime-firestore.ts",
  "src/runtime/data-binding.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/ERPModuleDefinition.ts",
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
];

const patterns = [
  "runtimeFirestore",
  "db",
  "getFirestore",
  "collection",
  "doc",
  "setDoc",
  "addDoc",
  "updateDoc",
  "runTransaction",
  "serverTimestamp",
  "tenantId",
  "workspace",
  "workspaceId",
  "moduleKey",
  "RuntimeDataBinding.create",
  "create(",
  "FirestoreRuntimeMutation",
  "applyRuntimeIsolation",
  "applyComputedFields",
];

console.log("");
console.log("[Q1-B1-SEQUENCE-RUNTIME-READINESS-AUDIT]");
console.log("");

for (const rel of files) {
  const full = path.join(ROOT, rel);

  if (!fs.existsSync(full)) {
    console.log("[MISSING] " + rel);
    continue;
  }

  const content = fs.readFileSync(full, "utf8");
  const lines = content.split(/\r?\n/);

  console.log("");
  console.log("============================================================");
  console.log("FILE: " + rel);
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
    console.log("---- PATTERN: " + pattern + " ----");

    for (const hit of hits.slice(0, 4)) {
      const start = Math.max(0, hit - 5);
      const end = Math.min(lines.length, hit + 8);

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

const outDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(outDir, { recursive: true });

const reportPath = path.join(outDir, "Q1-B1-SEQUENCE-RUNTIME-READINESS-AUDIT.txt");
fs.writeFileSync(reportPath, "Audit printed in console. Re-run script to inspect.\n", "utf8");

console.log("");
console.log("[REPORT]", path.relative(ROOT, reportPath));
console.log("");
console.log("[NEXT] Copie-colle surtout les sections FirestoreRuntimeMutation, runtime-firestore et ERPModule.");
