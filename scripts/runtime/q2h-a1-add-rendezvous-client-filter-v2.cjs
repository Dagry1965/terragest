const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + rel);
}

const original = fs.readFileSync(file, "utf8");
fs.writeFileSync(file + ".bak-q2h-a1-add-client-filter-v2", original, "utf8");

const operationalIndex = original.indexOf("operational:");
if (operationalIndex < 0) {
  throw new Error("operational introuvable dans " + rel);
}

const filtersIndex = original.indexOf("filters:", operationalIndex);
if (filtersIndex < 0) {
  throw new Error("operational.filters introuvable dans " + rel);
}

const tableIndex = original.indexOf("table:", filtersIndex);
if (tableIndex < 0) {
  throw new Error("operational.table introuvable après filters dans " + rel);
}

const filtersBlock = original.slice(filtersIndex, tableIndex);

if (filtersBlock.includes('key: "clientId"')) {
  console.log("[SKIP] clientId existe déjà dans operational.filters.");
  process.exit(0);
}

const arrayStart = original.indexOf("[", filtersIndex);
if (arrayStart < 0 || arrayStart > tableIndex) {
  throw new Error("Début tableau filters introuvable");
}

let depth = 0;
let arrayEnd = -1;

for (let i = arrayStart; i < tableIndex; i += 1) {
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

const nextOperational = next.slice(
  next.indexOf("operational:"),
  next.indexOf("table:", next.indexOf("filters:", next.indexOf("operational:")))
);

if (!nextOperational.includes('key: "clientId"')) {
  throw new Error("clientId non ajouté dans operational.filters");
}

fs.writeFileSync(file, next, "utf8");

console.log("[DONE] Q2-H-A1 filtre clientId ajouté à rendezvous operational.filters.");
console.log("[WRITTEN]", rel);
