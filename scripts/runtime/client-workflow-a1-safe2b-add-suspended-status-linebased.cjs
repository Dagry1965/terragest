const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const fullPath = path.join(root, file);

const content = fs.readFileSync(fullPath, "utf8");
const before = content;

if (content.includes('value:"suspendu"') || content.includes('value: "suspendu"')) {
  console.log("[UNCHANGED] suspendu already present");
  console.log("[CLIENT-WORKFLOW-A1-SAFE-2B] Done");
  process.exit(0);
}

const lines = content.split(/\r?\n/);

const statutIndex = lines.findIndex((line) =>
  line.includes('key:"statut"') || line.includes('key: "statut"')
);

if (statutIndex === -1) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-2B] statut field not found");
}

let optionsStart = -1;
for (let i = statutIndex; i < Math.min(statutIndex + 40, lines.length); i++) {
  if (lines[i].includes("options")) {
    optionsStart = i;
    break;
  }
}

if (optionsStart === -1) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-2B] statut options not found");
}

let actifValueLine = -1;
for (let i = optionsStart; i < Math.min(optionsStart + 30, lines.length); i++) {
  if (lines[i].includes('value:"actif"') || lines[i].includes('value: "actif"')) {
    actifValueLine = i;
    break;
  }
}

if (actifValueLine === -1) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-2B] actif option not found");
}

// Find the closing brace of the Actif option after value:"actif".
let actifOptionEnd = -1;
for (let i = actifValueLine + 1; i < Math.min(actifValueLine + 8, lines.length); i++) {
  if (lines[i].trim() === "}," || lines[i].trim() === "}") {
    actifOptionEnd = i;
    break;
  }
}

if (actifOptionEnd === -1) {
  throw new Error("[CLIENT-WORKFLOW-A1-SAFE-2B] actif option end not found");
}

const insertLines = [
  '            {',
  '              label:"Suspendu",',
  '              value:"suspendu"',
  '            },',
];

lines.splice(actifOptionEnd + 1, 0, ...insertLines);

const after = lines.join("\n");

if (after !== before) {
  fs.writeFileSync(fullPath, after, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[CLIENT-WORKFLOW-A1-SAFE-2B] Done");