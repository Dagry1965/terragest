const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targets = [
  {
    rel: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
    prefix: "CLI",
    field: "codeClient",
  },
  {
    rel: "src/runtime/modules/generated/vehicules/vehicules.module.ts",
    prefix: "VEH",
    field: "codeVehicule",
  },
  {
    rel: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    prefix: "RDV",
    field: "codeRendezVous",
  },
];

for (const target of targets) {
  const file = path.join(ROOT, target.rel);

  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + file);
  }

  const original = fs.readFileSync(file, "utf8");
  let content = original;

  const backup = file + ".bak-q1b4-declare-business-code";
  fs.writeFileSync(backup, original, "utf8");

  if (content.includes("businessCode:")) {
    console.log("[SKIP] businessCode deja present:", target.rel);
    continue;
  }

  const marker = "metadata: {";
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("metadata marker introuvable dans " + target.rel);
  }

  const insertAt = index + marker.length;

  const businessCode = `
    businessCode: {
      field: "${target.field}",
      prefix: "${target.prefix}",
      sequenceScope: "year",
      padLength: 6,
      readonly: true,
      required: true,
    },`;

  content = content.slice(0, insertAt) + businessCode + content.slice(insertAt);

  fs.writeFileSync(file, content, "utf8");

  console.log("[DONE]", target.rel);
  console.log("[BACKUP]", path.relative(ROOT, backup));
}

console.log("");
console.log("[DONE] Q1-B4 businessCode declare sur clientsauto / vehicules / rendezvous.");
console.log("");
console.log("Next:");
console.log("pnpm build");
