const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const TARGET =
  "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts";

const targetPath = path.join(ROOT, TARGET);

if (!fs.existsSync(targetPath)) {
  throw new Error(`Fichier introuvable: ${TARGET}`);
}

const backupPath = `${targetPath}.bak-q22e9n-d2b-export-name-collision`;
fs.copyFileSync(targetPath, backupPath);

let content = fs.readFileSync(targetPath, "utf8");

const replacements = [
  [
    "export interface RuntimeSchedulingSettingsReadInput",
    "export interface RuntimeSchedulingSettingsServiceReadInput",
  ],
  [
    "export interface RuntimeSchedulingSettingsSaveInput",
    "export interface RuntimeSchedulingSettingsServiceSaveInput",
  ],
  [
    "export interface RuntimeSchedulingSettingsReadResult",
    "export interface RuntimeSchedulingSettingsServiceReadResult",
  ],
  [
    "export interface RuntimeSchedulingSettingsSaveResult",
    "export interface RuntimeSchedulingSettingsServiceSaveResult",
  ],
  [
    "input: RuntimeSchedulingSettingsReadInput",
    "input: RuntimeSchedulingSettingsServiceReadInput",
  ],
  [
    "Promise<RuntimeSchedulingSettingsReadResult>",
    "Promise<RuntimeSchedulingSettingsServiceReadResult>",
  ],
  [
    "input: RuntimeSchedulingSettingsSaveInput",
    "input: RuntimeSchedulingSettingsServiceSaveInput",
  ],
  [
    "Promise<RuntimeSchedulingSettingsSaveResult>",
    "Promise<RuntimeSchedulingSettingsServiceSaveResult>",
  ],
];

for (const [from, to] of replacements) {
  if (!content.includes(from)) {
    console.log(`[WARN] Non trouvé: ${from}`);
  }
  content = content.replaceAll(from, to);
}

if (content.includes("export interface RuntimeSchedulingSettingsSaveInput")) {
  throw new Error("Collision RuntimeSchedulingSettingsSaveInput encore présente.");
}

fs.writeFileSync(targetPath, content, "utf8");

console.log("");
console.log("[Q22E-9N-D2-B] DONE");
console.log(`[BACKUP] ${path.relative(ROOT, backupPath).replace(/\\/g, "/")}`);
console.log(`[UPDATED] ${TARGET}`);
console.log("");
console.log("Next:");
console.log("pnpm build");