const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2h-a1-add-client-filter", original, "utf8");

if (original.includes('key: "clientId"')) {
  console.log("[SKIP] clientId existe déjà quelque part dans le module.");
  process.exit(0);
}

const filtersIndex = original.indexOf("filters:");
if (filtersIndex < 0) {
  throw new Error("filters introuvable dans " + rel);
}

const arrayStart = original.indexOf("[", filtersIndex);
if (arrayStart < 0) {
  throw new Error("Début tableau filters introuvable");
}

let depth = 0;
let arrayEnd = -1;

for (let i = arrayStart; i < original.length; i += 1) {
  const char = original[i];

  if (char === "[") depth += 1;
  if (char === "]") depth -= 1;

  if (depth === 0) {
    arrayEnd = i;
    break;
  }
}

if (arrayEnd < 0) {
  throw new Error("Fin tableau filters introuvable");
}

const clientFilter = `        {
          key: "clientId",
          label: "Client",
          field: "clientId",
          type: "relation",
        },
`;

const next =
  original.slice(0, arrayEnd) +
  clientFilter +
  original.slice(arrayEnd);

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-H-A1 filtre clientId ajouté à rendezvous operational.filters.");
console.log("[WRITTEN]", rel);
