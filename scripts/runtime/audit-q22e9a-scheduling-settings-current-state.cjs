const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  schedulingTypes: path.join(
    root,
    "src",
    "runtime",
    "scheduling",
    "RuntimeSchedulingTypes.ts"
  ),
  schedulingEngine: path.join(
    root,
    "src",
    "runtime",
    "scheduling",
    "RuntimeSchedulingEngine.ts"
  ),
  openingHours: path.join(
    root,
    "src",
    "runtime",
    "scheduling",
    "RuntimeOpeningHours.ts"
  ),
  rendezvousModule: path.join(
    root,
    "src",
    "runtime",
    "modules",
    "generated",
    "rendezvous",
    "rendezvous.module.ts"
  ),
  guards: path.join(
    root,
    "src",
    "runtime",
    "guards",
    "processRuntimeBeforeMutationGuards.ts"
  ),
  planningView: path.join(
    root,
    "src",
    "components",
    "erp",
    "scheduling",
    "ERPSchedulingPlanningView.tsx"
  ),
  formField: path.join(
    root,
    "src",
    "components",
    "erp",
    "forms",
    "enterprise",
    "ERPFormField.tsx"
  ),
};

const checks = [
  {
    file: "schedulingTypes",
    label: "Types scheduling existants",
    patterns: [
      "RuntimeAvailabilitySlot",
      "RuntimeDateTimeRange",
      "RuntimeBooking",
      "RuntimeCalendarException",
      "RuntimeOpeningHoursProfile",
    ],
  },
  {
    file: "schedulingEngine",
    label: "Paramètres utilisés par RuntimeSchedulingEngine",
    patterns: [
      "defaultDurationMinutes",
      "buildDateTimeRange",
      "getAvailableSlotsForDate",
      "getAvailableSlotsWithBookings",
      "bufferMinutes",
      "calendarExceptions",
      "capacity",
      "assertWithinOpeningHours",
      "assertNoAppointmentConflict",
    ],
  },
  {
    file: "openingHours",
    label: "Horaires d'ouverture runtime",
    patterns: [
      "DEFAULT_WORKSPACE_OPENING_HOURS",
      "defaultSlotDurationMinutes",
      "periods",
      "isOpen",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
  },
  {
    file: "rendezvousModule",
    label: "Metadata scheduling du module rendezvous",
    patterns: [
      "scheduling:",
      "enabled: true",
      'dateField: "dateRendezVous"',
      'timeField: "heureRendezVous"',
      'durationField: "durationMinutes"',
      'startField: "startAt"',
      'endField: "endAt"',
      'statusField: "statut"',
      'resourceField: "vehiculeId"',
      "blockingStatuses",
      "bufferMinutes",
      "capacity",
      "calendarExceptions",
    ],
  },
  {
    file: "guards",
    label: "Guards mutation scheduling",
    patterns: [
      "RuntimeSchedulingEngine",
      "scheduling",
      "bufferMinutes",
      "capacity",
      "calendarExceptions",
      "blockingStatuses",
      "assertWithinOpeningHours",
      "getAvailableSlotsWithBookings",
    ],
  },
  {
    file: "planningView",
    label: "Planning UI scheduling",
    patterns: [
      "RuntimeSchedulingEngine",
      "module.scheduling",
      "getAvailableSlotsWithBookings",
      "buildPlanningCreateHref",
      "bufferMinutes",
      "capacity",
      "calendarExceptions",
    ],
  },
  {
    file: "formField",
    label: "Form field scheduling / créneaux assistés",
    patterns: [
      "scheduling",
      "timeField",
      "getAvailableSlotsWithBookings",
      "available",
      "remainingCapacity",
      "bufferMinutes",
      "capacity",
    ],
  },
];

const classification = [
  {
    parameter: "enabled",
    currentSource: "module.scheduling",
    futureSource: "settings tenant/workspace/module",
    criticity: "Haute",
    adminEditable: "Oui, avec prudence",
    notes: "Active ou désactive la planification pour un module.",
  },
  {
    parameter: "dateField",
    currentSource: "module.scheduling",
    futureSource: "metadata module uniquement",
    criticity: "Critique",
    adminEditable: "Non",
    notes: "Champ structurel. Ne doit pas être modifié par interface simple.",
  },
  {
    parameter: "timeField",
    currentSource: "module.scheduling",
    futureSource: "metadata module uniquement",
    criticity: "Critique",
    adminEditable: "Non",
    notes: "Champ structurel. Une erreur casse la planification.",
  },
  {
    parameter: "durationField",
    currentSource: "module.scheduling",
    futureSource: "metadata module + settings pour durée par défaut",
    criticity: "Haute",
    adminEditable: "Partiel",
    notes: "Le champ reste metadata ; la durée par défaut devient configurable.",
  },
  {
    parameter: "startField",
    currentSource: "module.scheduling",
    futureSource: "metadata module uniquement",
    criticity: "Critique",
    adminEditable: "Non",
    notes: "Champ technique calculé/persisté.",
  },
  {
    parameter: "endField",
    currentSource: "module.scheduling",
    futureSource: "metadata module uniquement",
    criticity: "Critique",
    adminEditable: "Non",
    notes: "Champ technique calculé/persisté.",
  },
  {
    parameter: "statusField",
    currentSource: "module.scheduling",
    futureSource: "metadata module uniquement",
    criticity: "Haute",
    adminEditable: "Non",
    notes: "Le champ statut reste structurel.",
  },
  {
    parameter: "blockingStatuses",
    currentSource: "module.scheduling",
    futureSource: "settings module",
    criticity: "Haute",
    adminEditable: "Oui admin",
    notes: "Détermine quels statuts bloquent un créneau.",
  },
  {
    parameter: "resourceField",
    currentSource: "module.scheduling",
    futureSource: "metadata ou settings avancé",
    criticity: "Critique",
    adminEditable: "Plus tard",
    notes: "Détermine la ressource de conflit : véhicule, technicien, box, équipe.",
  },
  {
    parameter: "bufferMinutes",
    currentSource: "module.scheduling",
    futureSource: "settings module",
    criticity: "Moyenne/Haute",
    adminEditable: "Oui",
    notes: "Marge invisible entre deux créneaux.",
  },
  {
    parameter: "capacity",
    currentSource: "module.scheduling",
    futureSource: "settings module",
    criticity: "Haute",
    adminEditable: "Oui admin",
    notes: "Nombre de réservations possibles par créneau.",
  },
  {
    parameter: "calendarExceptions",
    currentSource: "module.scheduling",
    futureSource: "settings calendrier",
    criticity: "Haute",
    adminEditable: "Oui",
    notes: "Jours fermés, périodes spéciales, exceptions.",
  },
  {
    parameter: "openingHours",
    currentSource: "DEFAULT_WORKSPACE_OPENING_HOURS",
    futureSource: "settings tenant/workspace",
    criticity: "Critique",
    adminEditable: "Oui admin",
    notes: "Horaires d’ouverture du planning.",
  },
  {
    parameter: "defaultDurationMinutes",
    currentSource: "RuntimeSchedulingEngine / opening hours / planning fallback",
    futureSource: "settings module",
    criticity: "Haute",
    adminEditable: "Oui",
    notes: "Durée visible par défaut d’un rendez-vous.",
  },
];

function read(fileKey) {
  const filePath = files[fileKey];

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function findLine(content, pattern) {
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].includes(pattern)) {
      return {
        line: index + 1,
        text: lines[index].trim(),
      };
    }
  }

  return null;
}

function printFileHeader(fileKey) {
  console.log(`\n### ${fileKey}`);
  console.log(path.relative(root, files[fileKey]));
}

console.log("\n[Q22E-9A] Audit paramètres scheduling actuels\n");

let hasError = false;

for (const check of checks) {
  const content = read(check.file);

  printFileHeader(check.file);
  console.log(`Section: ${check.label}`);

  if (!content) {
    console.log("[FAIL] fichier introuvable");
    hasError = true;
    continue;
  }

  for (const pattern of check.patterns) {
    const found = findLine(content, pattern);

    if (found) {
      console.log(`[OK] ${pattern} -> L${found.line}: ${found.text}`);
    } else {
      console.log(`[MISS] ${pattern}`);
    }
  }
}

console.log("\n[CLASSIFICATION PARAMÈTRES]\n");

for (const item of classification) {
  console.log(`- ${item.parameter}`);
  console.log(`  Source actuelle : ${item.currentSource}`);
  console.log(`  Source future   : ${item.futureSource}`);
  console.log(`  Criticité       : ${item.criticity}`);
  console.log(`  Modifiable UI   : ${item.adminEditable}`);
  console.log(`  Note            : ${item.notes}`);
}

console.log("\n[ORDRE D'APPLICATION RECOMMANDÉ]\n");
console.log("1. Defaults moteur RuntimeSchedulingEngine");
console.log("2. Metadata module.scheduling");
console.log("3. Settings tenant/workspace");
console.log("4. Settings module");
console.log("5. Calendar exceptions");
console.log("6. RuntimeSchedulingEngine applique la configuration effective");
console.log("7. Planning UI affiche les créneaux autorisés");
console.log("8. Guards runtime bloquent toute mutation invalide");

console.log("\n[RECOMMANDATION Q22E-9]\n");
console.log("1. Ne pas modifier RuntimeSchedulingEngine directement pour les settings.");
console.log("2. Garder module.scheduling comme configuration par défaut.");
console.log("3. Créer RuntimeSchedulingSettingsEngine pour résoudre la configuration effective.");
console.log("4. Brancher planning et guards sur la même configuration effective.");
console.log("5. Exposer seulement les paramètres non structurels dans l’interface admin.");
console.log("6. Ne jamais modifier rendezvous.module.ts depuis l’UI.");
console.log("7. Commencer par les settings simples : durée, buffer, capacité, horaires, jours ouverts.");

if (hasError) {
  console.error("\n[Q22E9A_AUDIT_WITH_WARNINGS]");
  process.exit(1);
}

console.log("\n[Q22E9A_AUDIT_OK]");