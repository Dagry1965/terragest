const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts",
];

function abs(filePath) {
  return path.join(root, filePath);
}

for (const filePath of files) {
  const target = abs(filePath);

  if (!fs.existsSync(target)) {
    console.log("SKIP", filePath);
    continue;
  }

  let content = fs.readFileSync(target, "utf8");

  content = content
    .replaceAll("·", "·")
    .replaceAll("É", "É")
    .replaceAll("é", "é")
    .replaceAll("è", "è")
    .replaceAll("ê", "ê")
    .replaceAll("à", "à")
    .replaceAll("ô", "ô")
    .replaceAll("ç", "ç")
    .replaceAll("Véhicule", "Véhicule")
    .replaceAll("Élément", "Élément")
    .replaceAll("réglées", "réglées")
    .replaceAll("confirmés", "confirmés")
    .replaceAll("planifiés", "planifiés");

  fs.writeFileSync(target, content, "utf8");
  console.log("UPDATED", filePath);
}

console.log("PASS 2N-Q8G1 OK: dashboard engine encoding fixed.");