const fs = require("fs");
const path = require("path");

const files = [
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
];

function extractKeys(content) {
  const matches = [...content.matchAll(/key\s*:\s*["']([^"']+)["']/g)];
  return [...new Set(matches.map((m) => m[1]))];
}

for (const file of files) {
  const full = path.join(process.cwd(), file);

  if (!fs.existsSync(full)) {
    console.log("\n[MISSING]", file);
    continue;
  }

  const content = fs.readFileSync(full, "utf8");
  const collection =
    content.match(/collection\s*:\s*["']([^"']+)["']/)?.[1] || "?";

  const keys = extractKeys(content);

  console.log("\n==================================================");
  console.log(file);
  console.log("collection:", collection);
  console.log("fields:");

  for (const key of keys) {
    console.log(" -", key);
  }
}