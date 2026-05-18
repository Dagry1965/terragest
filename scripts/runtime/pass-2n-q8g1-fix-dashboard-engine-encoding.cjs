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
    .replaceAll("Â·", "·")
    .replaceAll("Ã‰", "É")
    .replaceAll("Ã©", "é")
    .replaceAll("Ã¨", "è")
    .replaceAll("Ãª", "ê")
    .replaceAll("Ã ", "à")
    .replaceAll("Ã´", "ô")
    .replaceAll("Ã§", "ç")
    .replaceAll("VÃ©hicule", "Véhicule")
    .replaceAll("Ã‰lÃ©ment", "Élément")
    .replaceAll("rÃ©glÃ©es", "réglées")
    .replaceAll("confirmÃ©s", "confirmés")
    .replaceAll("planifiÃ©s", "planifiés");

  fs.writeFileSync(target, content, "utf8");
  console.log("UPDATED", filePath);
}

console.log("PASS 2N-Q8G1 OK: dashboard engine encoding fixed.");