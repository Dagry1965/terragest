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
    .replaceAll("·", "·")
    .replaceAll("é", "é")
    .replaceAll("è", "è")
    .replaceAll("ê", "ê")
    .replaceAll("ë", "ë")
    .replaceAll("à", "à")
    .replaceAll("â", "â")
    .replaceAll("ô", "ô")
    .replaceAll("Ã®", "î")
    .replaceAll("ç", "ç")
    .replaceAll("Véhicules", "Véhicules")
    .replaceAll("Interventions facturées", "Interventions facturées")
    .replaceAll("Contrôle véhicule", "Contrôle véhicule")
    .replaceAll("réapprovisionner", "réapprovisionner")
    .replaceAll("règlement", "règlement")
    .replaceAll("programmée", "programmée")
    .replaceAll("Véhicule", "Véhicule")
    .replaceAll("demandés", "demandés")
    .replaceAll("Sélectionnez", "Sélectionnez")
    .replaceAll("créneaux", "créneaux")
    .replaceAll("disponibilités", "disponibilités")
    .replaceAll("précédent", "précédent")
    .replaceAll("suivant", "suivant");

  fs.writeFileSync(absolute, content, "utf8");
  console.log("UPDATED", target);
}

console.log("PASS 2N-Q8G0 OK: cockpit/public encoding fixed.");
