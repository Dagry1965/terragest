const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/components/public/PublicAppointmentService.ts",
  "src/runtime/scheduling/contract/RuntimeAppointmentNormalizer.ts",
  "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts",
  "src/runtime/relations/RuntimeRelationLabelEngine.ts",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/forms/enterprise/ERPFormField.tsx",
  "src/components/erp/runtime/ERPRuntimeTable.tsx",
  "src/components/erp/runtime/ERPRuntimeDetails.tsx",
  "src/runtime/modules/renderer/GenericListPage.tsx",
];

const patterns = [
  "heureRendezVous",
  "dateRendezVous",
  "startAt",
  "endAt",
  "slotLabel",
  "creneau",
  "créneau",
  "formatDate",
  "format",
  "type: \"time\"",
  "type:\"time\"",
  "type: \"text\"",
  "labelFields",
  "list:",
  "visible",
];

console.log("");
console.log("[Q1-C-RDV-DATE-TIME-DISPLAY-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING]", rel);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  const lines = content.split(/\r?\n/);

  const hasAny = patterns.some((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (!hasAny) continue;

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

    for (const hit of hits.slice(0, 4)) {
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
console.log("Copie-colle surtout les sections rendezvous.module.ts + ERPFormField/ERPEnterpriseForm si elles sortent.");
