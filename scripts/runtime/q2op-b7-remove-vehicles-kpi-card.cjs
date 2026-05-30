const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-b7-remove-vehicles-kpi`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let content = fs.readFileSync(fullPath, "utf8");

const patterns = [
  `{
                    icon: "🚗",
                    label: "Véhicules",
                    value: text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0"),
                    hint: "Parc client",
                  },
                  `,
  `["Véhicules", text(rootRecord, ["vehiclesCount", "vehiculesCount", "nombreVehicules"], "0")],
                  `,
];

let applied = 0;

for (const pattern of patterns) {
  if (content.includes(pattern)) {
    content = content.replace(pattern, "");
    applied++;
  }
}

if (applied === 0) {
  console.error("[PATCH_FAILED] Vehicles KPI card not found.");
  process.exit(1);
}

fs.writeFileSync(fullPath, content, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[APPLIED]", applied);
console.log("[Q2-OP-B7] Vehicles KPI card removed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");