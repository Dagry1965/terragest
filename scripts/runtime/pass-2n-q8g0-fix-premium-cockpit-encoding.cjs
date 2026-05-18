const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = [
  "src/components/amarkhys/dashboard/AmarkhysPremiumCockpit.tsx",
  "src/components/amarkhys/public/AmarkhysAppointmentCalendar.tsx",
];

function file(filePath) {
  return path.join(root, filePath);
}

for (const target of files) {
  const absolute = file(target);

  if (!fs.existsSync(absolute)) {
    console.log("SKIP", target);
    continue;
  }

  let content = fs.readFileSync(absolute, "utf8");

  content = content
    .replaceAll("â‚£", "₣")
    .replaceAll("â–°", "▰")
    .replaceAll("â—‡", "◇")
    .replaceAll("â—ˆ", "◈")
    .replaceAll("â‹®", "⋮")
    .replaceAll("âœ“", "✓")
    .replaceAll("Â·", "·")
    .replaceAll("Ã©", "é")
    .replaceAll("Ã¨", "è")
    .replaceAll("Ãª", "ê")
    .replaceAll("Ã«", "ë")
    .replaceAll("Ã ", "à")
    .replaceAll("Ã¢", "â")
    .replaceAll("Ã´", "ô")
    .replaceAll("Ã®", "î")
    .replaceAll("Ã§", "ç")
    .replaceAll("VÃ©hicules", "Véhicules")
    .replaceAll("Interventions facturÃ©es", "Interventions facturées")
    .replaceAll("ContrÃ´le vÃ©hicule", "Contrôle véhicule")
    .replaceAll("rÃ©approvisionner", "réapprovisionner")
    .replaceAll("rÃ¨glement", "règlement")
    .replaceAll("programmÃ©e", "programmée")
    .replaceAll("VÃ©hicule", "Véhicule")
    .replaceAll("demandÃ©s", "demandés")
    .replaceAll("SÃ©lectionnez", "Sélectionnez")
    .replaceAll("crÃ©neaux", "créneaux")
    .replaceAll("disponibilitÃ©s", "disponibilités")
    .replaceAll("prÃ©cÃ©dent", "précédent")
    .replaceAll("suivant", "suivant");

  fs.writeFileSync(absolute, content, "utf8");
  console.log("UPDATED", target);
}

console.log("PASS 2N-Q8G0 OK: cockpit/public encoding fixed.");
