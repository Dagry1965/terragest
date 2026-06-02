const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const PAGE = path.join(ROOT, "src/app/(private)/clientsauto/hub/page.tsx");
const CLIENT = path.join(ROOT, "src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx");
const SHEET = path.join(ROOT, "src/components/erp/hub/ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs/audits/AMARKHYS-HUB-CONTEXT-RETURN-FIX-B.md");

function fail(message) {
  console.error("[FAIL] " + message);
  process.exit(1);
}

function ok(message) {
  console.log("[OK] " + message);
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

for (const file of [PAGE, CLIENT, SHEET]) {
  if (!fs.existsSync(file)) {
    fail("Missing file: " + file);
  }

  write(file + ".bak-context-return-fix-b", read(file));
}

let page = read(PAGE);
let client = read(CLIENT);
let sheet = read(SHEET);

/**
 * 1. Page route: read all return context params.
 */
page = page.replace(
  `    selectedVehicleId?: string;
  }>;`,
  `    selectedVehicleId?: string;
    selectedRendezvousId?: string;
    selectedInterventionId?: string;
    selectedFactureId?: string;
  }>;`
);

page = page.replace(
  `  const selectedVehicleId = params.selectedVehicleId ?? null;`,
  `  const selectedVehicleId = params.selectedVehicleId ?? null;
  const selectedRendezvousId = params.selectedRendezvousId ?? null;
  const selectedInterventionId = params.selectedInterventionId ?? null;
  const selectedFactureId = params.selectedFactureId ?? null;`
);

page = page.replace(
  `      selectedVehicleId={selectedVehicleId}
    />`,
  `      selectedVehicleId={selectedVehicleId}
      selectedRendezvousId={selectedRendezvousId}
      selectedInterventionId={selectedInterventionId}
      selectedFactureId={selectedFactureId}
    />`
);

/**
 * 2. Client wrapper: accept and pass all params.
 */
client = client.replace(
  `  selectedVehicleId?: string | null;
};`,
  `  selectedVehicleId?: string | null;
  selectedRendezvousId?: string | null;
  selectedInterventionId?: string | null;
  selectedFactureId?: string | null;
};`
);

client = client.replace(
  `  selectedVehicleId = null,
}: ClientOperationalSheetClientProps) {`,
  `  selectedVehicleId = null,
  selectedRendezvousId = null,
  selectedInterventionId = null,
  selectedFactureId = null,
}: ClientOperationalSheetClientProps) {`
);

client = client.replace(
  `      selectedVehicleId={selectedVehicleId}
    />`,
  `      selectedVehicleId={selectedVehicleId}
      selectedRendezvousId={selectedRendezvousId}
      selectedInterventionId={selectedInterventionId}
      selectedFactureId={selectedFactureId}
    />`
);

/**
 * 3. Sheet props: accept all initial ids.
 */
sheet = sheet.replace(
  `  selectedVehicleId?: string | null;
};`,
  `  selectedVehicleId?: string | null;
  selectedRendezvousId?: string | null;
  selectedInterventionId?: string | null;
  selectedFactureId?: string | null;
};`
);

sheet = sheet.replace(
  `  selectedVehicleId = null,
}: ERPClientOperationalSheetProps) {`,
  `  selectedVehicleId = null,
  selectedRendezvousId: initialSelectedRendezvousId = null,
  selectedInterventionId: initialSelectedInterventionId = null,
  selectedFactureId: initialSelectedFactureId = null,
}: ERPClientOperationalSheetProps) {`
);

/**
 * 4. Initialize local state from return context.
 */
sheet = sheet.replace(
  `  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(null);`,
  `  const [selectedRendezvousId, setSelectedRendezvousId] = useState<string | null>(
    initialSelectedRendezvousId
  );`
);

sheet = sheet.replace(
  `  const [expandedFactureId, setExpandedFactureId] = useState<string | null>(null);`,
  `  const [expandedFactureId, setExpandedFactureId] = useState<string | null>(
    initialSelectedFactureId
  );`
);

sheet = sheet.replace(
  `  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(null);`,
  `  const [selectedInterventionId, setSelectedInterventionId] = useState<string | null>(
    initialSelectedInterventionId
  );`
);

/**
 * 5. Make selectedInvoice prefer selectedFactureId / expandedFactureId.
 */
sheet = sheet.replace(
  `  const selectedInvoice = facturesForSelectedIntervention[0] ?? null;`,
  `  const selectedInvoice =
    facturesForSelectedIntervention.find((facture) => {
      const factureId = recordId(facture);
      return (
        factureId === expandedFactureId ||
        factureId === initialSelectedFactureId
      );
    }) ??
    facturesForSelectedIntervention[0] ??
    null;`
);

/**
 * 6. Checks.
 */
const checks = [
  ["page reads selectedRendezvousId", page.includes("selectedRendezvousId = params.selectedRendezvousId")],
  ["page reads selectedInterventionId", page.includes("selectedInterventionId = params.selectedInterventionId")],
  ["page reads selectedFactureId", page.includes("selectedFactureId = params.selectedFactureId")],
  ["client prop selectedRendezvousId", client.includes("selectedRendezvousId?: string | null")],
  ["client passes selectedFactureId", client.includes("selectedFactureId={selectedFactureId}")],
  ["sheet prop selectedRendezvousId", sheet.includes("selectedRendezvousId?: string | null")],
  ["sheet initializes rendezvous", sheet.includes("initialSelectedRendezvousId")],
  ["sheet initializes intervention", sheet.includes("initialSelectedInterventionId")],
  ["sheet initializes facture", sheet.includes("initialSelectedFactureId")],
  ["selected invoice restored", sheet.includes("factureId === expandedFactureId")],
];

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  fail("Checks failed: " + failed.map(([name]) => name).join(", "));
}

write(PAGE, page);
write(CLIENT, client);
write(SHEET, sheet);

write(REPORT, [
  "# AMARKHYS-HUB-CONTEXT-RETURN-FIX-B",
  "",
  "## Objectif",
  "",
  "Restaurer le contexte complet au retour vers la fiche client opérationnelle.",
  "",
  "## Corrigé",
  "",
  "- La page /clientsauto/hub lit selectedRendezvousId.",
  "- La page /clientsauto/hub lit selectedInterventionId.",
  "- La page /clientsauto/hub lit selectedFactureId.",
  "- ClientOperationalSheetClient transmet ces valeurs.",
  "- ERPClientOperationalSheet initialise ses états depuis ces valeurs.",
  "- La facture sélectionnée est restaurée quand selectedFactureId est présent.",
  "",
  "## Checks",
  "",
  ...checks.map(([name, passed]) => "- " + (passed ? "OK" : "FAIL") + " — " + name),
  "",
].join("\\n"));

ok("Written page/client/sheet");
ok("Report written");
console.log("[AMARKHYS-HUB-CONTEXT-RETURN-FIX-B] DONE");